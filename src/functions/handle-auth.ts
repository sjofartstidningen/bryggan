import {
  HttpError,
  BadRequest,
  InternalServerError,
  Forbidden,
} from 'http-errors';
import qs from 'qs';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Cookies from 'universal-cookie';
import { createResponse } from '../utils/create-response';
import { Oauth2TokenResponse } from '../types/dropbox';
import { OAUTH_STATE_COOKIE } from '../constants';

const APP_URL = process.env.URL;
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;
const CLIENT_ID = process.env.REACT_APP_DROPBOX_CLIENT_ID;
const CLIENT_SECRET = process.env.DROPBOX_CLIENT_SECRET;

const APP_AUTH_HANDLER = `${APP_URL}/dropbox-auth-handler`;

/**
 * Handler to take care of authentication against Dropbox' Oauth2 interface.
 * This handler will kick in after the user has choosen to authorize our
 * application. Dropbox will the redirect the user here and we will deal with
 * whats necessary to finally retrieve an access_token.
 *
 * @export
 * @param {AWSLambda.APIGatewayProxyEvent} event
 * @returns {Promise<AWSLambda.APIGatewayProxyResult>}
 */
export async function handler(
  event: AWSLambda.APIGatewayProxyEvent,
): Promise<AWSLambda.APIGatewayProxyResult> {
  const cookie = new Cookies(event.headers.cookie);

  try {
    if (
      APP_URL == null ||
      REDIRECT_URL == null ||
      CLIENT_ID == null ||
      CLIENT_SECRET == null
    ) {
      throw new InternalServerError(
        'Environment variables not properly defined',
      );
    }

    if (
      event.queryStringParameters == null ||
      (event.queryStringParameters.code == null &&
        event.queryStringParameters.error == null)
    ) {
      throw new BadRequest(
        'Necessary query string parameters was not provided',
      );
    }

    const query = event.queryStringParameters;

    if (query.state && query.state !== cookie.get(OAUTH_STATE_COOKIE)) {
      throw new Forbidden(
        'State from Oauth service does not match the expected state',
      );
    }

    /**
     * For some reasoun the authorization migth have failes – the user might
     * have declined access or anything like that. In that case we will recieve
     * an error query parameter.
     *
     * In that case we will redirect back to `/auth/handle-token` and deal with it
     * properly there.
     */
    if (query.error) {
      return createResponse('', {
        statusCode: 301,
        headers: {
          Location: `${APP_AUTH_HANDLER}?${qs.stringify(query)}`,
        },
      });
    }

    /**
     * By this point we know that the user has successfully signed in to Dropbox
     * and also authorized the application to work on the users behalf.
     *
     * We are now ready to retrieve an access_token based on the code retrieved
     * from the initial step.
     */
    const { code } = query;
    const { data }: AxiosResponse<Oauth2TokenResponse> = await axios({
      url: 'https://api.dropboxapi.com/oauth2/token',
      method: 'POST',
      data: qs.stringify({
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URL,
      }),
      auth: { username: CLIENT_ID, password: CLIENT_SECRET },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const location = `${APP_AUTH_HANDLER}?${qs.stringify({
      ...data,
      state: query.state,
    })}`;

    const body = `
      <!doctype html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0; URL='${location}'" />
        </head>
        <body>
          Redirecting...
        </body>
      </html>
    `;

    return createResponse(body, {
      statusCode: 301,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        Location: location,
      },
    });
  } catch (error) {
    /**
     * There might have happend something while fetching the access_token and we
     * will treat that as a failed authorization.
     */
    const err = error as AxiosError;
    if (err.response) {
      return createResponse('', {
        statusCode: 301,
        headers: {
          Location: `${APP_AUTH_HANDLER}?${qs.stringify(err.response.data)}`,
        },
      });
    }

    let statusCode: number;
    let message: string;

    if (error instanceof HttpError && error.expose) {
      statusCode = error.statusCode;
      message = error.message;
    } else {
      statusCode = 500;
      message = 'Internal server error';
      if (process.env.NODE_ENV !== 'production') {
        message += `: ${error.message}`;
      }
    }

    if (process.env.NODE_ENV === 'test') throw error;
    return createResponse(message, { statusCode, cache: false });
  }
}
