/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from './index';
import { SignOut, Eye, Refresh } from '../Icon';

storiesOf('atoms/Button', module)
  .add('standard', () => (
    <Fragment>
      <Button>Standard</Button>
      <Button modifiers={['brand']}>Brand</Button>
      <Button modifiers={['error']}>Error</Button>
    </Fragment>
  ))
  .add('with icon', () => (
    <Fragment>
      <Button><Refresh /> Refresh</Button>
      <Button modifiers={['brand']}><Eye /> Preview</Button>
      <Button modifiers={['error']}>Sign out <SignOut /></Button>
    </Fragment>
  ));
