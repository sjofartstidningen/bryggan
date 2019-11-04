import { createResponse } from '../utils/create-response';

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
      <a href="https://deploy-preview-52--sst-bryggan.netlify.com/.netlify/functions/token">Sign in</a>
    </p>
  </body>
</html>
`;
}
