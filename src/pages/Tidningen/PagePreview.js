// @flow
import React, { PureComponent } from 'react';
import type { RouterHistory } from 'react-router-dom';
import padStart from 'lodash.padstart';
import RenderInPreview from '../../components/RenderInPreview';
import PdfPreview from '../../molecules/PdfPreview';
import type { MappedListFolderResponse } from '../../types/dropbox';

type Props = {
  pages: MappedListFolderResponse,
  current: string,
  total: number,
  history: RouterHistory,
};

type State = {};

class PagePreview extends PureComponent<Props, State> {
  handleTransition = (val: number) => () => {
    const { current, history } = this.props;
    const { location: { pathname } } = history;

    const currentPage = Number.parseInt(current, 10);
    if (!Number.isNaN(currentPage)) {
      const next: string = padStart(`${currentPage + val}`, 3, '0');
      const nextPath = pathname.replace(current, next);

      history.replace(nextPath);
    }
  };

  handleClose = () => {
    const { history } = this.props;
    const { location: { pathname } } = history;

    const next = pathname.slice(0, -4);
    history.push(next);
  };

  render() {
    const { pages, current, total } = this.props;
    const page = pages.find(p => p.name === current);

    if (!page) return null;
    return (
      <RenderInPreview>
        <PdfPreview
          page={page}
          total={total}
          onNext={this.handleTransition(1)}
          onPrev={this.handleTransition(-1)}
          onClose={this.handleClose}
        />
      </RenderInPreview>
    );
  }
}

export { PagePreview as default };
