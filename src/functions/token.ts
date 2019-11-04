import { HttpError, BadRequest, Forbidden } from 'http-errors';
import qs from 'qs';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Cookies from 'universal-cookie';
import { createResponse } from '../utils/create-response';
import { Oauth2TokenResponse } from '../types/dropbox';
import { OAUTH_STATE_COOKIE, PATH_AUTH_HANDLER } from '../constants';
import { safeEnv } from '../env';
import { trailingSlash, unleadingSlash } from '../utils';

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
  const CONTEXT = safeEnv('CONTEXT', 'production');
  const REDIRECT_URL = safeEnv('REACT_APP_REDIRECT_URL');
  const CLIENT_ID = safeEnv('REACT_APP_DROPBOX_CLIENT_ID');
  const CLIENT_SECRET = safeEnv('DROPBOX_CLIENT_SECRET');

  let APP_URL: string;
  switch (CONTEXT) {
    case 'deploy-preview':
    case 'branch-deploy':
      APP_URL = safeEnv('DEPLOY_PRIME_URL');
      break;
    case 'production':
    default:
      APP_URL = safeEnv('URL');
  }

  try {
    const cookie = new Cookies(event.headers.cookie);

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
      return createResponse(errorBody(query.error, query), {
        statusCode: 500,
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
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
    const redirectUri =
      trailingSlash(APP_URL) + unleadingSlash('/.netlify/functions/token');

    const { data }: AxiosResponse<Oauth2TokenResponse> = await axios({
      url: 'https://api.dropboxapi.com/oauth2/token',
      method: 'POST',
      data: qs.stringify({
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
      auth: { username: CLIENT_ID, password: CLIENT_SECRET },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const body = successBody(data.access_token);

    return createResponse(body, {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
      },
    });
  } catch (error) {
    /**
     * There might have happend something while fetching the access_token and we
     * will treat that as a failed authorization.
     */
    const err = error as AxiosError;
    if (err.response) {
      return createResponse(errorBody(err.message, err.response.data), {
        statusCode: err.response.status,
        cache: false,
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
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
    return createResponse(errorBody(message), {
      statusCode,
      cache: false,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
      },
    });
  }
}

function successBody(token: string) {
  return `<!doctype html>
<html>
  <head>
  </head>
  <body>
    <h1>Your token is: ${token}</h1>
  </body>
</html>
`;
}

function errorBody(message: string, errorData: any = {}) {
  return `<!doctype html>
<html>
  <head>
  </head>
  <body>
    <h1>Message</h1>
    <pre>${message}</pre>

    <h2>Error Data</h2>
    <pre>${JSON.stringify(errorData, null, 2)}</pre>

    <h2>Variables</h2>
    <pre>${JSON.stringify(process.env, null, 2)}</pre>
  </body>
</html>
`;
}
