/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { Paragraph } from '../Text';
import { Link, ExternalLink } from './index';

storiesOf('atoms/Link', module).add('all', () => (
  <Fragment>
    <Paragraph>
      The <code>{'<Link />'}</code>-component represents a normal{' '}
      <Link to="/">internal link</Link> to be used for internal routing.
    </Paragraph>

    <Paragraph>
      The <code>{'<ExternalLink />'}</code>-component represents a normal{' '}
      <ExternalLink to="/">external link</ExternalLink> to be used to redirect a
      user to another location. By default the target is set to {'"blank"'}.
    </Paragraph>
  </Fragment>
));
