import pkg from './package.json';
import capFirst from './utils/capitalize-first';

const isProd = process.env.NODE_ENV === 'production';

export default {
  name: capFirst(pkg.name),
  version: pkg.version,
  company: 'Sjöfartstidningen',
  baseUrl: isProd
    ? 'https://bryggan.sjofartstidningen.se'
    : 'http://localhost:3000',
  auth0id: process.env.AUTH0_CLIENT_ID,
  auth0domain: process.env.AUTH0_CLIENT_DOMAIN,
  dropboxRoot: '/bryggan',
  repoUrl: 'https://github.com/sjofartstidningen/bryggan',
  topLinks: [
    { title: 'Dashboard', href: '/' },
    { title: 'Tidningen', href: '/tidningen' },
    { title: 'Nyhetsbrevet', href: '/nyhetsbrevet' },
  ],
};
