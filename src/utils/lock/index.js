import Auth0Lock from 'auth0-lock';
import config from '../../config';
import logo from './logo-auth0.png';

class Lock {
  constructor({ clientId, clientDomain, opts = {} }) {
    this.authParams = {
      scope: 'openid profile email',
    };

    this.lock = new Auth0Lock(clientId, clientDomain, {
      closable: false,
      allowAutocomplete: true,
      allowShowPassword: true,
      language: 'sv',
      allowSignUp: false,
      ...opts,
      auth: {
        responseType: 'token',
        redirectUrl: `${config.baseUrl}/signed-in`,
        params: this.authParams,
        ...opts.auth,
      },
      theme: {
        primaryColor: 'rgba(0, 0, 0, 1)',
        logo,
      },
      languageDictionary: { title: config.name },
    });
  }

  on(event, fn) {
    this.lock.on(event, fn);
  }

  showLock = (params = {}) => {
    this.lock.show({
      auth: {
        params: {
          ...this.authParams,
          ...params,
        },
      },
    });
  };

  getUser = idToken =>
    new Promise((resolve, reject) => {
      this.lock.getProfile(idToken, (err, profile) => {
        console.log('hello', err, profile);
        if (err) {
          reject(err);
        } else {
          resolve(profile);
        }
      });
    });
}

export { Lock }; // eslint-disable-line import/prefer-default-export
