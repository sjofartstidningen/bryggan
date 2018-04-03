'use strict'; // eslint-disable-line
const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

const generateStatements = headers =>
  Object.entries(headers).reduce(
    (acc, [key, value]) =>
      `${acc}  ${key}: ${Array.isArray(value) ? value.join('; ') : value}\n`,
    '',
  );

const generateString = headers =>
  Object.entries(headers).reduce(
    (acc, [path, value]) => `${acc}${path}\n${generateStatements(value)}\n\n`,
    '',
  );

(async () => {
  const headers = {
    '/*': {
      'Content-Security-Policy-Report-Only': [
        `default-src 'self'`,
        `script-src 'self' https://*.firebaseio.com/ https://unpkg.com`,
        `style-src 'self' 'unsafe-inline' blob: https://fonts.googleapis.com/`,
        `font-src 'self' https://fonts.gstatic.com/`,
        `img-src 'self' data blob: https://content.dropboxapi.com/ https://www.gravatar.com/avatar/`,
        `connect-src 'self' blob: wss://*.firebaseio.com/ https://*.googleapis.com/ https://*.dropboxapi.com/`,
        `frame-src 'self' https://*.firebaseio.com/`,
        `object-src 'none'`,
        `worker-src 'self' blob:`,
        `report-uri https://sjofartstidningen.report-uri.com/r/d/csp/reportOnly`,
      ],
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer-when-downgrade',
      'Expect-CT':
        'max-age=0, report-uri="https://sjofartstidningen.report-uri.com/r/d/ct/reportOnly"',
    },
  };

  const content = generateString(headers);
  await writeFile(
    join(__dirname, '../build/_headers'),
    content.trim().concat('\n'),
  );
})();
