import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { authSignOut } from '../../store/user/actions';
import { AUTH_UNAUTHENTICATED } from '../../store/user/constants';

class SignOut extends Component {
  static propTypes = {
    signedOut: PropTypes.bool.isRequired,
    authSignOut: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.authSignOut();
  }

  render() {
    const { signedOut } = this.props;
    return signedOut && <Redirect to="/auth/sign-in" />;
  }
}

const mapStateToProps = state => ({
  signedOut: state.user.authState === AUTH_UNAUTHENTICATED,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ authSignOut }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
