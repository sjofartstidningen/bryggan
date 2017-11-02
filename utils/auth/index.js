import Auth0Lock from 'auth0-lock';
import Cookie from 'js-cookie';
import decode from 'jwt-decode';

const getLocalCookie = (cookie, asJson) => {
  if (asJson) return Cookie.getJSON(cookie);
  return Cookie.get(cookie);
};

const getReqCookie = (cookie, req) => {
  if (!req || !req.headers.cookie) return undefined;
  const reqCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${cookie}=`));

  if (!reqCookie) return undefined;
  return reqCookie.split('=')[1];
};

export default class AuthService {
  constructor(clientId, domain, opts = {}) {
    this.clientId = clientId;
    this.domain = domain;

    this.authParams = {
      scope: 'openid profile email',
    };

    if (process.browser) {
      this.lock = new Auth0Lock(clientId, domain, {
        closable: false,
        allowAutocomplete: true,
        allowShowPassword: true,
        language: 'sv',
        allowSignUp: false,
        ...opts,
        auth: {
          responseType: 'token',
          redirectUrl: 'http://localhost:3000/auth/signed-in',
          params: this.authParams,
          ...opts.auth,
        },
      });

      this.on = this.lock.on.bind(this.lock);
      this.on('authenticated', this.doAuthentication);
    }
  }

  doAuthentication = result => this.setCookies(result);

  login = (params = {}) => {
    if (!process.browser) return;

    this.lock.show({
      auth: {
        params: {
          ...this.authParams,
          ...params,
        },
      },
    });
  };

  logout = () => this.removeToken();

  loggedIn = req => !!this.getCookie('accessToken', req);

  getUser = req => {
    if (process.browser) {
      return this.getCookie('user', req, true);
    }

    const jwt = this.getCookie('jwt', req);
    return decode(jwt);
  };

  getAccessToken = req => this.getCookie('accessToken', req);

  setCookies = ({ idTokenPayload, idToken, accessToken }) => {
    if (!process.browser) return;
    Cookie.set('user', idTokenPayload);
    Cookie.set('jwt', idToken);
    Cookie.set('accessToken', accessToken);
  };

  getCookie = (cookie, req = null, asJson) => {
    if (req == null) return getLocalCookie(cookie, asJson);
    return getReqCookie(cookie, req);
  };

  removeToken = () => {
    Cookie.remove('user');
    Cookie.remove('jwt');
    Cookie.remove('accessToken');
  };
}
