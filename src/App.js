// @flow
import 'intersection-observer';
import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import * as theme from './theme';

import routes from './routes';
import SecureRoute from './components/SecureRoute';
import ProgressBar from './atoms/ProgressBar';
import Sidebar from './molecules/Sidebar';
import SignIn from './pages/SignIn';
import { Grid, AreaSidebar, AreaMain } from './molecules/Grid';
import { UserProvider, UserConsumer } from './contexts/User';
import { validateAuthError } from './utils/firebase';

class App extends Component<*, *> {
  render() {
    return (
      <UserProvider>
        <ThemeProvider theme={theme}>
          <UserConsumer>
            {({ state, signIn, signOut, user }) => (
              <Fragment>
                {state === 'loading' && <ProgressBar />}
                {state !== 'loading' && (
                  <Fragment>
                    <Router>
                      <Grid>
                        <AreaSidebar>
                          <Sidebar
                            links={routes}
                            onSignOut={signOut}
                            user={user}
                          />
                        </AreaSidebar>

                        <Switch>
                          <Route
                            path="/sign-in"
                            render={({ location }) =>
                              state === 'authenticated' ? (
                                <Redirect
                                  to={
                                    (location.state &&
                                      location.state.referrer) ||
                                    '/'
                                  }
                                />
                              ) : (
                                <SignIn
                                  onSignIn={signIn}
                                  onSignInError={validateAuthError}
                                />
                              )
                            }
                          />

                          <AreaMain>
                            {routes.map(route => (
                              <SecureRoute
                                key={route.to}
                                authenticated={state === 'authenticated'}
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
              </Fragment>
            )}
          </UserConsumer>
        </ThemeProvider>
      </UserProvider>
    );
  }
}

export default App;
