import pkg from '../package.json';
import capFirst from './utils/capFirst';

const isProd = process.env.NODE_ENV === 'production';

const config = {
  name: capFirst(pkg.name),
  version: pkg.version,
  company: 'Sjöfartstidningen',
  auth0id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  auth0domain: process.env.REACT_APP_AUTH0_CLIENT_DOMAIN,
  dropboxAccessToken: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN,
  baseUrl: isProd
    ? 'https://bryggan.sjofartstidningen.se'
    : 'http://localhost:3000',
  dropboxRoot: '/bryggan',
  repoUrl: 'https://github.com/sjofartstidningen/bryggan',
  mainLinks: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tidningen', href: '/tidningen' },
    { title: 'Nyhetsbrevet', href: '/nyhetsbrevet' },
  ],
};

export { config as default };
