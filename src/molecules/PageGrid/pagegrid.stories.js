/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PageGrid from './index';

const page = (_, i) => ({
  id: `${i}`,
  name: `00${i + 1}`,
  path: '',
  url: '/',
  // prettier-ignore
  preview: {
    '32':'https://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/getty/article/165/76/87490163.jpg',
    '64':'https://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/getty/article/165/76/87490163.jpg',
    '128':'https://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/getty/article/165/76/87490163.jpg',
    '256':'https://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/getty/article/165/76/87490163.jpg',
    '480':'https://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/getty/article/165/76/87490163.jpg',
    '640':'https://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/getty/article/165/76/87490163.jpg',
    '960':'https://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/getty/article/165/76/87490163.jpg',
    '1024':'https://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/getty/article/165/76/87490163.jpg',
    '2048':'https://img-aws.ehowcdn.com/600x600p/photos.demandstudios.com/getty/article/165/76/87490163.jpg',
  }
});
const pages = Array.from({ length: 15 }, page);

storiesOf('molecules/PageGrid', module)
  .add('standard', () => <PageGrid pages={pages} />)
  .add('with first page pushed', () => <PageGrid pages={pages} push />)
  .add('with refreshButton', () => (
    <PageGrid pages={pages} onRefreshClick={action('refresh')} />
  ));
