// @flow
import React, { PureComponent } from 'react';
import { setOptions } from 'react-pdf';
import type { MagazinePage } from '../../types/magazine';
import PreviewControls from '../PreviewControls';
import { Wrapper, Preview, Document, Page } from './components';
import ProgressBar from '../../atoms/ProgressBar';
import ErrorMessage from '../../atoms/ErrorMessage';
import { clamp } from '../../utils';

type Props = {
  page: MagazinePage,
  total: number,
  onNext: () => void,
  onPrev: () => void,
};

type State = {
  zoom: number,
  state: 'loading' | 'success' | 'error',
  message: ?string,
};

class PdfPreview extends PureComponent<Props, State> {
  state = {
    zoom: 1,
    state: 'loading',
    message: null,
  };

  componentDidMount() {
    setOptions({
      workerSrc: 'https://unpkg.com/pdfjs-dist@2.0.303/build/pdf.worker.min.js',
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.page.src !== this.props.page.src) {
      this.setState(() => ({ state: 'loading', zoom: 1 })); // eslint-disable-line
    }
  }

  handleZoom = (val: number) => () => {
    const currentZoom = this.state.zoom;
    const nextZoom = clamp(0.1, 2, currentZoom + val);
    if (nextZoom !== currentZoom) this.setState(() => ({ zoom: nextZoom }));
  };

  handleResetZoom = () => this.setState(() => ({ zoom: 1 }));

  handleRenderSuccess = () => {
    const { state } = this.state;
    if (state !== 'success') this.setState(() => ({ state: 'success' }));
  };

  handleError = (type: ?('load' | 'render' | 'source')) => () => {
    let message;

    switch (type) {
      case 'load':
        message = 'Kunde inte ladda PDFen';
        break;
      case 'render':
        message = 'Något är fel med PDFen och den kan inte visas';
        break;
      case 'source':
        message = 'Kunde inte ladda PDFen';
        break;
      default:
        message = null;
    }

    this.setState(() => ({ state: 'error', message }));
  };

  render() {
    const { page, total, onNext, onPrev } = this.props;
    const { zoom, state, message } = this.state;

    const { src } = page;

    const current = Number.parseInt(page.name, 10);

    return (
      <Wrapper>
        <PreviewControls
          current={current}
          total={total}
          onNext={onNext}
          onPrev={onPrev}
          onZoomInc={this.handleZoom(0.1)}
          onZoomDec={this.handleZoom(-0.1)}
          onZoomReset={this.handleResetZoom}
        />

        <Preview state={state}>
          <Document
            file={src}
            loading={() => null}
            error={() => null}
            onLoadError={this.handleError('load')}
            onSourceError={this.handleError('source')}
          >
            <Page
              pageIndex={0}
              scale={zoom}
              renderTextLayer={false}
              onRenderSuccess={this.handleRenderSuccess}
              onRenderError={this.handleError('render')}
            />
          </Document>
        </Preview>

        {state === 'loading' && <ProgressBar width="25%" background="white" />}
        {state === 'error' && <ErrorMessage message={message} />}
      </Wrapper>
    );
  }
}

export { PdfPreview as default };
