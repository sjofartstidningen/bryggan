/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorMessage from './index';

const Wrapper = ({ children }) => (
  <div
    style={{
      position: 'relative',
      width: 400,
      height: 400,
      margin: '5rem auto',
      border: '1px solid black',
    }}
  >
    {children}
  </div>
);

storiesOf('atoms/ErrorMessage', module)
  .add('standard', () => (
    <Wrapper>
      <ErrorMessage message="An error occured" />
    </Wrapper>
  ))
  .add('without message', () => (
    <Wrapper>
      <ErrorMessage />
    </Wrapper>
  ));
