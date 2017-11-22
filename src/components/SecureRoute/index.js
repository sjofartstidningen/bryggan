import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkAuthentication } from '../../store/auth/actions';
import {
  AUTHENTICATED,
  AWAIT_AUTHENTICATION,
  UNAUTHENTICATED,
} from '../../store/auth/constants';

class SecureRoute extends Component {
  componentDidMount() {
    if (this.props.secure && this.props.authenticated !== AUTHENTICATED) {
      this.props.checkAuthentication();
    }
  }

  render() {
    const { Component, authenticated, secure, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (!secure) return <Component {...props} />;
          if (authenticated === AWAIT_AUTHENTICATION) return <h1>Await</h1>;
          if (authenticated === UNAUTHENTICATED) return <h1>Unauth</h1>;
          return <Component {...props} />;
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ checkAuthentication }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SecureRoute);
