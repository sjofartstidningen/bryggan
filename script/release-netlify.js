'use strict'; // eslint-disable-line

const cp = require('child_process');
const { promisify } = require('util');

const exec = promisify(cp.exec);

async function publish(
  pluginConfig,
  { logger, draft, nextRelease: { gitTag } },
) {
  const netlifyToken = process.env.NETLIFY_TOKEN;

  if (!netlifyToken) {
    logger.error('Environment variable NETLIFY_TOKEN must be defined');
    return;
  }

  logger.log('Will publish site to Netlify');

  const message = !draft
    ? `semantic-release deployment ${gitTag}`
    : `semantic-release draft ${gitTag}`;

  const cmd = [
    'netlifyctl',
    'deploy',
    `--message '${message}'`,
    `--access-token ${netlifyToken}`,
    draft && '--draft',
  ].filter(Boolean);

  logger.log('Site published to Netlify');

  await exec(cmd.join(' '));
}

module.exports = { publish };
