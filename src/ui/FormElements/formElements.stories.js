/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import * as button from './buttons';
import * as input from './inputs';

storiesOf('Form Elements', module)
  .addDecorator(story => <div style={{ padding: '1em' }}>{story()}</div>)
  .add('buttons', () => (
    <div>
      <button.ButtonStandard>Standard button</button.ButtonStandard>
      <button.ButtonPrimary>Primary button</button.ButtonPrimary>
      <button.ButtonBrand>Brand button</button.ButtonBrand>
      <button.ButtonWarning>Warning button</button.ButtonWarning>
    </div>
  ))
  .add('input', () => (
    <input.Fieldset>
      <input.Legend>Text inputs</input.Legend>
      <input.Label>Input</input.Label>
      <input.TextInput />
    </input.Fieldset>
  ));
