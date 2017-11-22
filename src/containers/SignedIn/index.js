import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { doAuthentication } from '../../store/auth/actions';
import {
  AWAIT_AUTHENTICATION,
  UNAUTHENTICATED,
} from '../../store/auth/constants';

class SignedIn extends Component {
  componentDidMount() {
    this.props.doAuthentication();
  }

  render() {
    const { authenticated } = this.props;

    if (authenticated === AWAIT_AUTHENTICATION) return <h1>Signing in</h1>;
    if (authenticated === UNAUTHENTICATED) return <h1>Unauthenticated</h1>;
    return <h1>Signed in!</h1>;
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ doAuthentication }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignedIn);
