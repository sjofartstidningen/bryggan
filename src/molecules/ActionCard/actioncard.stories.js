/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Download, Logotype } from '../../atoms/Icon';
import ActionCard from './index';

const onClick = action('click');

storiesOf('molecules/ActionCard', module).add('standard', () => (
  <div>
    <ActionCard
      title="A special file"
      label="Download"
      icon={Download}
      onClick={onClick}
    />
    <ActionCard
      title="A special file indeed"
      label="Hello world"
      icon={Logotype}
      onClick={onClick}
    />
    <ActionCard
      title="A very much special file"
      label="Get over it!"
      onClick={onClick}
    />
  </div>
));
