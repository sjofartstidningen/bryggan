/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Icon from './index';

storiesOf('atoms/Icon', module)
  .add('all', () => (
    <div>
      {Object.entries(Icon).map(
        ([key, Comp]) => (
          <div key={key} style={{ margin: '1rem', fontFamily: 'Roboto' }}>
            <Comp /> – {'<'}
            {key}
            {' />'}
          </div>
        ),
        [],
      )}
    </div>
  ))
  .add('without basline alignment', () => (
    <div>
      {Object.entries(Icon).map(
        ([key, Comp]) => (
          <div key={key} style={{ margin: '1rem', fontFamily: 'Roboto' }}>
            <Comp baseline={false} /> – {'<'}
            {key}
            {' baseline={false} />'}
          </div>
        ),
        [],
      )}
    </div>
  ));
