/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { injectGlobal } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import LazyImage from './index';

// eslint-disable-next-line
injectGlobal`
  .lazy-image__wrapper > div {
    border: 1px solid black;
  }
`;

const Wrapper = ({ children }: { children: any }) => (
  <div className="lazy-image__wrapper" style={{ width: 300, margin: 'auto' }}>
    {children}
  </div>
);

const Separator = () => <div style={{ marginTop: '100vh' }} />;

storiesOf('molecules/LazyImage', module)
  .add('standard', () => (
    <Wrapper>
      <LazyImage
        src="https://www.pets4homes.co.uk/images/articles/771/large/cat-lifespan-the-life-expectancy-of-cats-568e40723c336.jpg"
        alt="Image"
        onLoad={action('loaded')}
      />
      <Separator />
      <LazyImage
        src="http://www.prestigeanimalhospital.com/sites/default/files/08-cat-cancer-4.jpeg"
        alt="Image"
        onLoad={action('loaded')}
      />
    </Wrapper>
  ))
  .add('with default error', () => (
    <Wrapper>
      <LazyImage
        src="/this/is/no/image.png"
        alt="Error"
        onError={action('error')}
      />
    </Wrapper>
  ));
