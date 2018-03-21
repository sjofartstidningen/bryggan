// @flow
import 'intersection-observer';
import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Provider as StateProvider } from 'unstated';
import { ThemeProvider } from 'styled-components';
import dropbox from './api/dropbox';
import {
  awaitInitialAuthCheckEvent,
  signIn,
  signOut,
  getAppData,
} from './utils/firebase';
import * as theme from './theme';
import type { User, SignInCredentials } from './types';

import routes from './routes';
import SecureRoute from './components/SecureRoute';
import ProgressBar from './atoms/ProgressBar';
import Sidebar from './molecules/Sidebar';
import SignIn from './pages/SignIn';
import { Grid, AreaSidebar, AreaMain } from './molecules/Grid';

type State = {
  state: 'loading' | 'authenticated' | 'unauthenticated',
  user: ?User,
};

class App extends Component<*, State> {
  unsubscribe: () => void;

  state = {
    state: 'loading',
    user: null,
  };

  componentDidMount() {
    this.unsubscribe = awaitInitialAuthCheckEvent(user => {
      this.authorize(user);
    });
  }

  componentWillUnmount() {
    if (typeof this.unsubscribe === 'function') this.unsubscribe();
  }

  authorize = async (user: ?User) => {
    if (user == null) {
      this.setState(() => ({ state: 'unauthenticated' }));
    } else {
      const appData = await getAppData();
      dropbox.updateAccessToken(appData.dropbox_token);
      dropbox.updateRootFolder(appData.dropbox_root);

      this.setState(() => ({ state: 'authenticated', user }));
    }

    this.unsubscribe();
  };

  handleSignIn = async (values: SignInCredentials) => {
    try {
      const user = await signIn(values);
      await this.authorize(user);
    } catch (err) {
      throw err;
    }
  };

  handleSignOut = async () => {
    await signOut();
    this.setState(() => ({ state: 'unauthenticated', user: null }));
  };

  handleSignInError = (err: any) => {
    const { code } = err;
    const ret = {};

    switch (code) {
      case 'auth/invalid-email':
        ret.email = 'Emailadressen är felaktig';
        break;
      case 'auth/user-disabled':
        ret.email = 'Det här kontot har stängts ner';
        break;
      case 'auth/user-not-found':
        ret.email = 'Emailadressen finns inte registrerad';
        break;
      case 'auth/wrong-password':
        ret.password = 'Felaktigt lösenord';
        break;
      default:
    }

    return ret;
  };

  render() {
    const { state, user } = this.state;
    const authenticated = state === 'authenticated';

    return (
      <StateProvider>
        <ThemeProvider theme={theme}>
          <div>
            {state === 'loading' && <ProgressBar />}
            {state !== 'loading' && (
              <Fragment>
                <Router>
                  <Grid>
                    <AreaSidebar>
                      <Sidebar
                        links={routes}
                        onSignOut={this.handleSignOut}
                        user={user}
                      />
                    </AreaSidebar>

                    <Switch>
                      <Route
                        path="/sign-in"
                        render={({ location }) =>
                          authenticated ? (
                            <Redirect
                              to={
                                (location.state && location.state.referrer) ||
                                '/'
                              }
                            />
                          ) : (
                            <SignIn
                              onSignIn={this.handleSignIn}
                              onSignInError={this.handleSignInError}
                            />
                          )
                        }
                      />

                      <AreaMain>
                        {routes.map(route => (
                          <SecureRoute
                            key={route.to}
                            authenticated={authenticated}
                            path={route.to}
                            render={route.render}
                          />
                        ))}
                      </AreaMain>
                    </Switch>
                  </Grid>
                </Router>
              </Fragment>
            )}
          </div>
        </ThemeProvider>
      </StateProvider>
    );
  }
}

export default App;
