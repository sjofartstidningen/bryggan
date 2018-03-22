module.exports = {
  verifyConditions: ['@semantic-release/github'],
  publish: [
    '@semantic-release/github',
    {
      path: '@semantic-release/exec',
      cmd: `curl -X POST -d '' ${process.env.NETLIFY_WEBHOOK}`,
    },
  ],
  success: ['@semantic-release/github'],
  fail: ['@semantic-release/github'],
};
