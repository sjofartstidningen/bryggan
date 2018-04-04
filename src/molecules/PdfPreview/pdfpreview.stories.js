/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import qs from 'qs';
import PdfPreview from './index';

const pages = Array.from({ length: 10 }, (_, i) => ({
  name: `00${i + 1}`,
  src: `https://content.dropboxapi.com/2/files/download?${qs.stringify({
    arg: JSON.stringify({ path: `/bryggan/2018/01/2018-01-00${i + 1}.pdf` }),
    authorization: `Bearer ${process.env.STORYBOOK_DROPBOX_TOKEN || ''}`,
  })}`,
}));

class Wrapper extends Component<*, *> {
  state = { index: 0 };

  handleTransition = (val) => () =>
    this.setState(({ index }) => ({ index: index + val }));

  render() {
    const { index } = this.state;
    const page = this.props.pages[index];

    return (
      <PdfPreview
        page={page}
        total={this.props.pages.length}
        onNext={this.handleTransition(1)}
        onPrev={this.handleTransition(-1)}
        onClose={action('close')}
      />
    );
  }
}

storiesOf('molecules/PdfPreview', module)
  .add('standard', () => (
    <PdfPreview
      page={pages[0]}
      total={1}
      onNext={action('next')}
      onPrev={action('prev')}
      onClose={action('close')}
    />
  ))
  .add('with multiple pages', () => <Wrapper pages={pages} />)
  .add('with error page', () => (
    <Wrapper
      pages={pages.slice(0, 2).concat({
        name: `003`,
        src: `https://content.dropboxapi.com/2/files/download?${qs.stringify({
          arg: JSON.stringify({
            path: `/bryggan/2018/01/2018-01-no-num.pdf`,
          }),
          authorization: `Bearer ${process.env.STORYBOOK_DROPBOX_TOKEN || ''}`,
        })}`,
      })}
    />
  ));
