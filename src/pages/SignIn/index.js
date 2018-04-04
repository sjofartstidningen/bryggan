// @flow
import React from 'react';
import SignInForm from '../../molecules/SignInForm';
import type { SignInCredentials } from '../../types';

type Props = {
  onSignIn: (cred: SignInCredentials) => void | Promise<void>,
  onSignInError: (err: Error) => { email?: string, password?: string },
};

function SignIn({ onSignIn, onSignInError }: Props) {
  return <SignInForm onSignIn={onSignIn} onSignInError={onSignInError} />;
}

export { SignIn as default };
