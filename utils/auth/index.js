import Auth0Lock from 'auth0-lock';

export default class AuthService {
  constructor(clientId, domain, opts = {}) {
    this.clientId = clientId;
    this.domain = domain;
    this.lock = new Auth0Lock(clientId, domain, {
      closable: false,
      allowAutocomplete: true,
      allowShowPassword: true,
      language: 'sv',
      allowSignUp: false,
      ...opts,
      auth: {
        params: { param1: 'hello' },
        ...opts.auth,
      },
    });

    this.lock.on('authenticated', this.doAuthentication);
  }

  doAuthentication = result => {
    this.setToken(result.idToken);
  };

  login = () => {
    this.lock.show();
  };

  logout = () => {
    this.removeToken();
  };

  loggedIn = () => !!this.getToken();

  setToken = () => {
    // set token
  };

  getToken = () => {
    // get token
    return false;
  };

  removeToken = () => {
    // removeToken
  };
}
