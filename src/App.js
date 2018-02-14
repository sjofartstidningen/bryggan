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
import { Grid } from './components/MainGrid';
import Header from './components/Header';
import SignIn from './views/SignIn';
import Tidningen from './views/Tidningen';
import Settings from './views/Settings';


class App extends Component {
  state = {
    loading: true,
    authenticated: false,
    user: null,
  };

  componentDidMount() {
    this.unsubscribe = awaitInitialAuthCheckEvent(async user => {
      const appData = user ? await getAppData() : {};
      dropbox.updateAccessToken(appData.dropbox_token);
      dropbox.updateRootFolder(appData.dropbox_root);

      this.setState(() => ({
        loading: false,
        authenticated: !!user,
        user,
      }));

      this.unsubscribe();
    });
  }

  componentWillUnmount() {
    if (typeof this.unsubscribe === 'function') this.unsubscribe();
  }

  handleSignIn = async values => {
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

  handleSignOut = async () => {
    this.setState(() => ({ authenticated: false, user: null }));
    await signOut();
  };

  handleUserUpdated = user => {
    this.setState(() => ({ user }));
  };

  render() {
    const { user, authenticated, loading } = this.state;

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
                    <Header user={user} onSignOut={this.handleSignOut} />

                    <SecureRoute
                      authenticated={authenticated}
                      path="/"
                      exact
                      render={() => <Redirect to="/tidningen" />}
                    />

                    <SecureRoute
                      authenticated={authenticated}
                      path="/tidningen"
                      render={props => <Tidningen {...props} />}
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
