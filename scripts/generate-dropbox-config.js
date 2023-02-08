/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const inquirer = require('inquirer');
const crypto = require('crypto');

const APP_KEY = process.env.DROPBOX_APP_KEY;
const API_URL = new URL('https://api.dropbox.com/');

(async () => {
  const { challenge, verifier } = generateCodeChallange();
  const auth = generateAuthUrl(challenge);

  console.log('Visit', auth);
  const { code } = await inquirer.prompt([
    { type: 'input', name: 'code', message: 'Paste given code' },
  ]);

  const token = await fetchAccessToken(code, verifier);
  const memberId = await selectTeamMember(token);
  const rootNamespaceId = await findRootNamespaceId(token, memberId);

  console.log('access token', token);
  console.log('member id', memberId);
  console.log('root namespace id', rootNamespaceId);
})();

function generateCodeChallange() {
  const verifier = base64Encode(crypto.randomBytes(32));
  const challenge = base64Encode(sha256(verifier));
  return { verifier, challenge };
}

function generateAuthUrl(challenge) {
  const url = new URL('/oauth2/authorize', 'https://www.dropbox.com/');
  url.searchParams.set('client_id', APP_KEY);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('code_challenge', challenge);
  url.searchParams.set('code_challenge_method', 'S256');

  return url;
}

async function fetchAccessToken(code, verifier) {
  const tokenUrl = new URL('/oauth2/token', API_URL);
  const body = new FormData();
  body.set('client_id', APP_KEY);
  body.set('code', code);
  body.set('grant_type', 'authorization_code');
  body.set('code_verifier', verifier);

  const response = await fetch(tokenUrl, { method: 'POST', body });
  if (response.ok) {
    const { access_token: token } = await response.json();
    return token;
  }

  console.log(await response.text());
  throw new Error('Could not get access token');
}

async function selectTeamMember(token) {
  const url = new URL('/2/team/members/list_v2', API_URL);
  const headers = new Headers([
    ['Authorization', `Bearer ${token}`],
    ['Content-Type', 'application/json'],
  ]);

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ include_removed: false, limit: 100 }),
    headers,
  });

  if (res.ok) {
    const { members } = await res.json();
    const { memberId } = await inquirer.prompt([
      {
        type: 'list',
        message: 'select user',
        name: 'memberId',
        choices: members.map(member => ({
          name: member.profile.email,
          value: member.profile.team_member_id,
          short: member.profile.email,
        })),
      },
    ]);

    return memberId;
  }

  console.error(await res.text());
  throw new Error('Could not fetch member id');
}

async function findRootNamespaceId(token, memberId) {
  const url = new URL('/2/team/members/list_v2', API_URL);
  const headers = new Headers([
    ['Authorization', `Bearer ${token}`],
    ['Content-Type', 'application/json'],
    ['Dropbox-API-Select-User', memberId],
  ]);

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(null),
    headers,
  });

  if (res.ok) {
    const { root_info: info } = await res.json();
    return info.root_namespace_id;
  }

  console.log(await res.text());
  throw new Error('Could not fetch namespace id');
}

function base64Encode(str) {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function sha256(buffer) {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest();
}
