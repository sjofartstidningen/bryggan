module.exports = {
  verifyConditions: ['@semantic-release/github'],
  prepare: [require.resolve('./scripts/release-prepare.js')],
  publish: ['@semantic-release/github'],
  success: ['@semantic-release/github'],
  fail: ['@semantic-release/github'],
};
