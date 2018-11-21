/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { Img } from './index';

const gravatarSrc =
  'https://www.gravatar.com/avatar/6aa1d8956175f349c878cd1954e21d4c';

storiesOf('atoms/Image', module).add('all', () => (
  <Fragment>
    <Img src={gravatarSrc} alt="" />
    <Img src={gravatarSrc} modifiers={['rounded']} alt="" />
  </Fragment>
));
