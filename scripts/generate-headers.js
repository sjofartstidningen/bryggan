'use strict'; // eslint-disable-line
const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');
const headers = require('./headers');

const writeFile = promisify(fs.writeFile);

const generateStatements = h =>
  Object.entries(h).reduce(
    (acc, [key, value]) =>
      `${acc}  ${key}: ${Array.isArray(value) ? value.join('; ') : value}\n`,
    '',
  );

const generateString = h =>
  Object.entries(h).reduce(
    (acc, [path, value]) => `${acc}${path}\n${generateStatements(value)}\n\n`,
    '',
  );

(async () => {
  const h = { '/*': headers };

  const content = generateString(h);
  await writeFile(
    join(__dirname, '../build/_headers'),
    content.trim().concat('\n'),
  );
})();
