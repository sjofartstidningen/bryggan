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
import { adjust, compareByDesc } from './utils';
import SecureRoute from './components/SecureRoute';
import InitialLoadingScreen from './components/InitialLoadingScreen';
import { Grid, AreaSidebar } from './components/MainGrid';
import Sidebar from './components/Sidebar';
import SignIn from './views/SignIn';
import Magazine from './views/Magazine';
import { Book } from './components/Icon';
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

  fetchSublinks = async () => {
    const { data } = await dropbox.filesListFolder({ folder: '/' });
    const { entries } = data;
    const years: Array<LinkItem> = entries
      .map(entry => ({
        to: `/tidningen/${entry.name}`,
        title: entry.name,
      }))
      .sort(compareByDesc('title'));

    const newLinks = adjust(
      0,
      l => ({
        ...l,
        links: years,
      }),
      this.state.links,
    );

    this.setState(() => ({ links: newLinks }));
  };

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
    this.fetchSublinks();
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
                      render={({ match, location }) => (
                        <Magazine match={match} location={location} />
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
