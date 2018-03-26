/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import ListFolder from './Dropbox';

storiesOf('components/Dropbox.ListFolder', module).add('standard', () => (
  <ListFolder
    path="2018/01"
    accessToken={process.env.STORYBOOK_DROPBOX_TOKEN}
    baseFolder="/bryggan"
    responseReducer={x => x.entries}
  >
    {({ response }) => <pre>{JSON.stringify(response, null, 2)}</pre>}
  </ListFolder>
));
