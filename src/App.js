// @flow
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import dropbox from './api/dropbox';
import {
  awaitInitialAuthCheckEvent,
  signIn,
  signOut,
  getAppData,
} from './utils/firebase';
import { theme } from './styles';
import SecureRoute from './components/SecureRoute';
import InitialLoadingScreen from './components/InitialLoadingScreen';
import { Grid, AreaSidebar } from './components/MainGrid';
import Sidebar from './components/Sidebar';
import SignIn from './views/SignIn';
import Tidningen from './views/Tidningen';
import Settings from './views/Settings';
import { Book, Sliders } from './components/Icon';
import type { User, LinkItem, SignInCredentials } from './types';

type State = {
  loading: boolean,
  authenticated: boolean,
  user: ?User,
  links: Array<LinkItem>,
};

class App extends Component<*, State> {
  unsubscribe: () => void;

  state = {
    loading: true,
    authenticated: false,
    user: null,
    links: [
      {
        to: '/tidningen',
        title: 'Tidningen',
        icon: Book,
        links: [],
      },
      { to: '/installningar', title: 'Inställningar', icon: Sliders },
    ],
  };

  componentDidMount() {
    this.unsubscribe = awaitInitialAuthCheckEvent(user => {
      this.handleInitialAuthCheck(user);
    });
  }

  componentWillUnmount() {
    if (typeof this.unsubscribe === 'function') this.unsubscribe();
  }

  handleInitialAuthCheck = async (user: ?User) => {
    const appData = user ? await getAppData() : {};
    dropbox.updateAccessToken(appData.dropbox_token);
    dropbox.updateRootFolder(appData.dropbox_root);

    this.setState(() => ({
      loading: false,
      authenticated: !!user,
      user,
    }));

    this.unsubscribe();
  };

  handleSignIn = async (values: SignInCredentials) => {
    try {
      const user = await signIn(values);
      const appData = await getAppData();
      dropbox.updateAccessToken(appData.dropbox_token);
      dropbox.updateRootFolder(appData.dropbox_root);

      this.setState(() => ({
        user,
        authenticated: true,
      }));
    } catch (err) {
      throw err;
    }
  };

  handleSignOut = () => {
    this.setState(() => ({ authenticated: false, user: null }));
    signOut();
  };

  handleUserUpdated = (user: User) => {
    this.setState(() => ({ user }));
  };

  render() {
    const { user, authenticated, loading, links } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Router>
          {loading ? (
            <InitialLoadingScreen />
          ) : (
            <Switch>
              <Route
                path="/sign-in"
                render={props =>
                  authenticated ? (
                    <Redirect to="/" />
                  ) : (
                    <SignIn {...props} onSubmit={this.handleSignIn} />
                  )
                }
              />

              <Route
                render={() => (
                  <Grid>
                    <AreaSidebar>
                      <Sidebar
                        links={links}
                        user={user}
                        onSignOut={this.handleSignOut}
                      />
                    </AreaSidebar>

                    <SecureRoute
                      authenticated={authenticated}
                      path="/"
                      exact
                      render={() => <Redirect to="/tidningen" />}
                    />

                    <SecureRoute
                      authenticated={authenticated}
                      path="/tidningen"
                      render={({ match }) => <Tidningen match={match} />}
                    />

                    <SecureRoute
                      authenticated={authenticated}
                      path="/installningar"
                      render={props => (
                        <Settings
                          {...props}
                          user={user}
                          onUserUpdated={this.handleUserUpdated}
                        />
                      )}
                    />
                  </Grid>
                )}
              />
            </Switch>
          )}
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
