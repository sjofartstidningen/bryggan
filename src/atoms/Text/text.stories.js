/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { Paragraph, Strong, Heading1 } from './index';
import lorem from './_lorem';

storiesOf('atoms/Text', module).add('all', () => (
  <Fragment>
    <Heading1>Hello world</Heading1>
    {lorem.slice(0, 1).map(p => (
      <Paragraph key={p.slice(0, 5)}>{p}</Paragraph>
    ))}
    {lorem.slice(1, 2).map(p => (
      <Paragraph key={p.slice(0, 5)}>
        <Strong>{p}</Strong>
      </Paragraph>
    ))}
    {lorem.slice(2).map(p => (
      <Paragraph key={p.slice(0, 5)}>{p}</Paragraph>
    ))}
  </Fragment>
));
