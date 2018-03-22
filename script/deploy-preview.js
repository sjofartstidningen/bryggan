'use strict'; // eslint-disable-line

const releaseNetlify = require('./release-netlify');

(async () => {
  try {
    const { CI, TRAVIS_PULL_REQUEST } = process.env;

    if (CI && TRAVIS_PULL_REQUEST) {
      await releaseNetlify.publish(null, {
        draft: true,
        logger: console,
        nextRelease: { gitTag: `PR #${TRAVIS_PULL_REQUEST}` },
      });
    }
  } catch (err) {
    console.error(err); // eslint-disable-line
  }
})();
