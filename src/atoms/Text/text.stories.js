/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { Paragraph, Strong } from './index';
import lorem from './_lorem';

storiesOf('atoms/Text', module).add('all', () => (
  <Fragment>
    {lorem.slice(0, 1).map(p => <Paragraph key={p.slice(0, 5)}>{p}</Paragraph>)}
    {lorem.slice(1, 2).map(p => (
      <Paragraph key={p.slice(0, 5)}>
        <Strong>{p}</Strong>
      </Paragraph>
    ))}
    {lorem.slice(2).map(p => <Paragraph key={p.slice(0, 5)}>{p}</Paragraph>)}
  </Fragment>
));
