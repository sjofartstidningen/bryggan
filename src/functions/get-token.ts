import qs from 'qs';
import { createResponse } from '../utils/create-response';

export async function handler(): Promise<AWSLambda.APIGatewayProxyResult> {
  return createResponse(body(), {
    statusCode: 200,
    cache: false,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
  });
}

function body() {
  const url = `https://www.dropbox.com/oauth2/authorize?${qs.stringify({
    response_type: 'code',
    redirect_uri:
      'https://deploy-preview-52--sst-bryggan.netlify.com/.netlify/functions/token',
    client_id: process.env.REACT_APP_DROPBOX_CLIENT_ID,
  })}`;
  return `<!doctype html>
<html>
  <head>
  </head>
  <body>
    <h1>Sign in</h1>
    <p>
      <a href="${url}">Sign in</a>
    </p>
  </body>
</html>
`;
}
