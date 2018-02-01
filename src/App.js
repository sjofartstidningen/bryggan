import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { auth, signIn, signOut, getAppData } from './utils/firebase';

import InitialLoadingScreent from './components/InitialLoadingScreen';
import { Grid } from './components/MainGrid';
import Header from './components/Header';
import Tidningen from './views/Tidningen';
import SignIn from './views/SignIn';

function SecureRoute({ authenticated, redirect, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? render(props) : <Redirect to={redirect} />
      }
    />
  );
}

SecureRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  redirect: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

class App extends Component {
  state = {
    loading: true,
    authenticated: false,
    user: null,
    appData: {},
  };

  componentDidMount() {
    this.unsub = auth.onAuthStateChanged(async user => {
      const appData = user ? await getAppData() : {};

      window.setTimeout(() => {
        this.setState(
          () => ({
            loading: false,
            authenticated: user != null,
            user,
            appData,
          }),
          () => this.unsub(),
        );
      }, 2000);
    });
  }

  componentWillUnmount() {
    if (this.unsub != null) this.unsub();
  }

  handleSignIn = async values => {
    try {
      const user = await signIn(values);
      const appData = await getAppData();

      this.setState(() => ({
        user,
        authenticated: true,
        appData,
      }));
    } catch (err) {
      throw err;
    }
  };

  handleSignOut = async () => {
    this.setState(() => ({ authenticated: false, user: null }));
    await signOut();
  };

  render() {
    const { user, authenticated, loading, appData } = this.state;

    return (
      <Router>
        <Fragment>
          {loading ? (
            <InitialLoadingScreent />
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
                      redirect="/sign-in"
                      path="/"
                      exact
                      render={() => <Redirect to="/tidningen" />}
                    />

                    <SecureRoute
                      authenticated={authenticated}
                      redirect="/sign-in"
                      path="/tidningen"
                      render={props => (
                        <Tidningen {...props} appData={appData} />
                      )}
                    />
                  </Grid>
                )}
              />
            </Switch>
          )}
        </Fragment>
      </Router>
    );
  }
}

export default App;
