// @flow
import React from 'react';
import SignInForm from '../../molecules/SignInForm';
import type { SignInCredentials } from '../../types';

type Props = {
  onSignIn: (cred: SignInCredentials) => void | Promise<void>,
  onSignInError: (err: Error) => { [x: 'email' | 'password']: string },
};

function SignIn({ onSignIn, onSignInError }: Props) {
  return <SignInForm onSignIn={onSignIn} onSignInError={onSignInError} />;
}

export { SignIn as default };
