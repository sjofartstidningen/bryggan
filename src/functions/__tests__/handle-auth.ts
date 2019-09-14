import nock from 'nock';
import { handler } from '../handle-auth';
import { OAUTH_STATE_COOKIE, PATH_AUTH_HANDLER } from '../../constants';
import { safeEnv } from 'env';

const dropbox = nock('https://api.dropboxapi.com');

it('should handle successful auth and retrieve a token', async () => {
  const code = 'abc123';
  const accessToken = 'def456';
  const state = 'oauth_state_key';

  dropbox
    .post('/oauth2/token', body => {
      return (
        body.code === code &&
        body.redirect_uri.includes(safeEnv('REACT_APP_REDIRECT_URL'))
      );
    })
    .reply(200, {
      access_token: accessToken,
      token_type: 'bearer',
      account_id: '123',
      state,
    });

  const event = ({
    queryStringParameters: { code, state },
    headers: { cookie: `${OAUTH_STATE_COOKIE}=${state}` },
  } as unknown) as AWSLambda.APIGatewayProxyEvent;
  const response = await handler(event);
  const location = response.headers ? response.headers.Location || '' : '';

  expect(location).toContain(process.env.URL);
  expect(location).toContain(PATH_AUTH_HANDLER);
  expect(location).toContain(accessToken);
  expect(response.statusCode).toBe(301);
});

it('should handle an errored auth process', async () => {
  const error = 'access_denied';
  const state = 'oauth_state_key';
  const event = ({
    queryStringParameters: {
      state,
      error,
      error_description:
        'The resource owner or authorization server denied the request',
    },
    headers: { cookie: `${OAUTH_STATE_COOKIE}=${state}` },
  } as unknown) as AWSLambda.APIGatewayProxyEvent;
  const response = await handler(event);
  const location = response.headers ? response.headers.Location || '' : '';

  expect(location).toContain(PATH_AUTH_HANDLER);
  expect(location).toContain(error);
});

it('should handle an error retrieving access token', async () => {
  const code = 'abc123';
  const state = 'oauth_state_key';
  dropbox
    .post('/oauth2/token', body => body.code === code)
    .reply(401, {
      error_summary: 'invalid_access_token/...',
      error: { '.tag': 'invalid_access_token' },
    });

  const event = ({
    queryStringParameters: { code, state },
    headers: { cookie: `${OAUTH_STATE_COOKIE}=${state}` },
  } as unknown) as AWSLambda.APIGatewayProxyEvent;
  const response = await handler(event);
  const location = response.headers ? response.headers.Location || '' : '';

  expect(location).toContain('invalid_access_token');
});
