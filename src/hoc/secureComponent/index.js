import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkAuthentication } from '../../store/auth/actions';
import {
  AWAIT_AUTHENTICATION,
  UNAUTHENTICATED,
} from '../../store/auth/constants';

function secureComponent(Comp) {
  class SecureCompnent extends Component {
    componentDidMount() {
      this.props.checkAuthentication();
    }

    render() {
      const { authenticated, ...rest } = this.props;

      if (authenticated === AWAIT_AUTHENTICATION)
        return <h1>AWAIT_AUTHENTICATION</h1>;
      if (authenticated === UNAUTHENTICATED) return <h1>UNAUTHENTICATED</h1>;
      return <Comp authenticated={authenticated} {...rest} />;
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators({ checkAuthentication }, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(SecureCompnent);
}

export { secureComponent as default };
