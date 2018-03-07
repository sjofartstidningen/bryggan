/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Form,
  FormFieldset,
  FormLegend,
  FormGroup,
  FormInputLabel,
  FormInput,
  FormInputDetail,
} from './index';
import { Button } from '../Button';

storiesOf('atoms/Form', module).add('all', () => (
  <Form>
    <FormFieldset>
      <FormLegend>Sign in data</FormLegend>

      <FormGroup>
        <FormInputLabel htmlFor="email">Email</FormInputLabel>
        <FormInput id="email" name="email" type="email" />
        <FormInputDetail>
          Your email address wont be shared with anybody
        </FormInputDetail>
      </FormGroup>

      <FormGroup>
        <FormInputLabel htmlFor="password">Password</FormInputLabel>
        <FormInput id="password" name="password" type="password" />
      </FormGroup>

      <FormGroup>
        <FormInputLabel htmlFor="error">Error label</FormInputLabel>
        <FormInput id="error" name="error" type="text" modifiers={['error']} />
        <FormInputDetail modifiers={['error']}>
          There is an error here!
        </FormInputDetail>
      </FormGroup>
    </FormFieldset>

    <FormGroup>
      <Button modifiers={['brand']}>Sign in</Button>
      <Button>Clear</Button>
    </FormGroup>
  </Form>
));
