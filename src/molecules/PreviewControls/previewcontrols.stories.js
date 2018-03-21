/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PreviewControls from './index';

storiesOf('molecules/PreviewControls', module).add('standard', () => (
  <PreviewControls
    current={3}
    total={10}
    onNext={action('next')}
    onPrev={action('prev')}
    onZoomInc={action('zoom +')}
    onZoomDec={action('zoom -')}
    onZoomReset={action('zoom reset')}
  />
));
