/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from './index';
import ButtonCard from './ButtonCard';
import { SignOut, Eye, Refresh, Download } from '../Icon';

storiesOf('atoms/Button', module)
  .add('standard', () => (
    <Fragment>
      <Button>Standard</Button>
      <Button modifiers={['brand']}>Brand</Button>
      <Button modifiers={['error']}>Error</Button>
    </Fragment>
  ))
  .add('with icon', () => (
    <Fragment>
      <Button>
        <Refresh /> Refresh
      </Button>
      <Button modifiers={['brand']}>
        <Eye /> Preview
      </Button>
      <Button modifiers={['error']}>
        Sign out <SignOut />
      </Button>
    </Fragment>
  ))
  .add('as card', () => (
    <Fragment>
      <ButtonCard
        title="A special file"
        label="Download"
        icon={Download}
        onClick={action('click')}
      />
      <ButtonCard
        title="A very much special file"
        label="Get over it!"
        onClick={action('click')}
      />
    </Fragment>
  ));
