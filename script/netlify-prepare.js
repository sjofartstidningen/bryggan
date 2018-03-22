'use strict'; // eslint-disable-line

const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const axios = require('axios');
const pkg = require('../package.json');

const writeFile = promisify(fs.writeFile);

(async () => {
  try {
    const [, owner, repo] = /\/(\w+)\/((?:\d|\w|-)+)\.git$/.exec(
      pkg.repository.url,
    );

    const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

    const { data } = await axios.get(githubApiUrl);
    const version = data.name.replace('v', '');

    const newPkg = Object.assign({}, pkg, { version });

    await writeFile(
      path.join(__dirname, '..', 'package.json'),
      JSON.stringify(newPkg, null, 2),
      'utf8',
    );

    console.log('Updated version in package.json', newPkg); // eslint-disable-line
  } catch (err) {
    console.error('Could not update package.json version.'); // eslint-disable-line
  }
})();
