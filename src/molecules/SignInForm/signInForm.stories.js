/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SignInForm from './index';

const handleSignIn = throwError => values =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      action(`sign in (${throwError ? 'fail' : 'success'})`)(values);
      if (!throwError) return resolve();
      return reject();
    }, 1000);
  });

const handleSignInError = () => ({
  email: 'Invalid email',
});

storiesOf('molecules/SignInForm', module)
  .add('standard', () => (
    <SignInForm
      onSignIn={handleSignIn(false)}
      onSignInError={handleSignInError}
    />
  ))
  .add('with error result', () => (
    <SignInForm
      onSignIn={handleSignIn(true)}
      onSignInError={handleSignInError}
    />
  ));
