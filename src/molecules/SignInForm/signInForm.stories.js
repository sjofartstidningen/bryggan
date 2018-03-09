/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SignInForm from './index';

const handleSignIn = (values: any) =>
  new Promise(resolve => {
    setTimeout(() => {
      action('sign in')(values);
      resolve();
    }, 1000);
  });

const handleSignInError = () => ({
  email: 'Invalid email',
});

storiesOf('molecules/SignInForm', module).add('standard', () => (
  <SignInForm onSignIn={handleSignIn} onSignInError={handleSignInError} />
));
