import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { auth, signIn, signOut } from './utils/firebase';

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
    authMessage: null,
  };

  componentDidMount() {
    this.unsub = auth.onAuthStateChanged(user => {
      this.setState(
        () => ({
          loading: false,
          authenticated: user != null,
          user,
        }),
        () => this.unsub(),
      );
    });
  }

  componentWillUnmount() {
    if (this.unsub != null) this.unsub();
  }

  handleSignIn = async (email, password) => {
    try {
      const user = await signIn(email, password);
      this.setState(() => ({ user, authenticated: true }));
    } catch (err) {
      const authMessage = (() => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found':
            return 'Felaktig e-postadress';
          case 'auth/wrong-password':
            return 'Felaktigt lösenord';
          case 'auth/user-disabled':
            return 'Användaren har deaktiverats';
          default:
            return null;
        }
      })();

      this.setState(() => ({ authenticated: false, user: null, authMessage }));
    }
  };

  handleSignOut = async () => {
    this.setState(() => ({ authenticated: false, user: null }));
    await signOut();
  };

  render() {
    const { user, authMessage, authenticated, loading } = this.state;

    return (
      <Router>
        <Grid>
          {loading && <InitialLoadingScreent />}
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
            render={props => <Tidningen {...props} />}
          />

          <Route
            path="/sign-in"
            render={props =>
              authenticated ? (
                <Redirect to="/" />
              ) : (
                <SignIn
                  {...props}
                  message={authMessage}
                  onSubmit={this.handleSignIn}
                />
              )
            }
          />
        </Grid>
      </Router>
    );
  }
}

export default App;
