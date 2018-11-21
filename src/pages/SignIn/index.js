import React from 'react';
import PropTypes from 'prop-types';
import SignInForm from '../../molecules/SignInForm';

function SignIn({ onSignIn, onSignInError }) {
  return <SignInForm onSignIn={onSignIn} onSignInError={onSignInError} />;
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onSignInError: PropTypes.func.isRequired,
};

export { SignIn as default };
