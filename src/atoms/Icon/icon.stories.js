/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Icon from './index';

storiesOf('atoms/Icon', module)
  .add('all', () => (
    <div>
      {Object.keys(Icon).map(key => {
        const Comp = Icon[key];
        return (
          <div style={{ margin: '1rem', fontFamily: 'Roboto' }}>
            <Comp key={key} /> – {key}
          </div>
        );
      }, [])}
    </div>
  ))
  .add('without basline alignment', () => (
    <div>
      {Object.keys(Icon).map(key => {
        const Comp = Icon[key];
        return (
          <div style={{ margin: '1rem', fontFamily: 'Roboto' }}>
            <Comp baseline={false} key={key} /> – {key}
          </div>
        );
      }, [])}
    </div>
  ));
