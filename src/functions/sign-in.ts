import qs from 'qs';
import { createResponse } from '../utils/create-response';
import { trailingSlash, unleadingSlash } from '../utils';
import { safeEnv } from '../env';

export async function handler(
  event: AWSLambda.APIGatewayProxyEvent,
): Promise<AWSLambda.APIGatewayProxyResult> {
  return createResponse(body(), {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
  });
}

function body() {
  return `<!doctype html>
<html>
  <head>
  </head>
  <body>
    <h1>Sign in</h1>
    <p>
      <a href="${loginUrl()}">Sign in</a>
    </p>

    <h2>Variables</h2>
    <pre>${JSON.stringify(process.env, null, 2)}</pre>
  </body>
</html>
`;
}

function loginUrl(state?: string) {
  const REACT_APP_DROPBOX_CLIENT_ID = safeEnv('REACT_APP_DROPBOX_CLIENT_ID');
  const CONTEXT = safeEnv('CONTEXT', 'production');

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

  const APP_AUTH_HANDLER =
    trailingSlash(APP_URL) + unleadingSlash('/.netlify/functions/token');

  return `https://www.dropbox.com/oauth2/authorize?${qs.stringify({
    response_type: 'code',
    redirect_uri: APP_AUTH_HANDLER,
    client_id: REACT_APP_DROPBOX_CLIENT_ID,
    state,
  })}`;
}
