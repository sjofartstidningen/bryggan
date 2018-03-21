// @flow
import React, { PureComponent } from 'react';
import { setOptions } from 'react-pdf';
import PreviewControls from '../PreviewControls';
import { Wrapper, Preview, Document, Page, CloseButton } from './components';
import { Close } from '../../atoms/Icon';
import ProgressBar from '../../atoms/ProgressBar';
import ErrorMessage from '../../atoms/ErrorMessage';
import { clamp } from '../../utils';
import { create } from '../../utils/cache';
import type { Cache } from '../../utils/cache';

function NoOp() {
  return null;
}

type Props = {
  page: { src: string, name: string },
  total: number,
  onNext: () => void,
  onPrev: () => void,
  onClose: () => void,
};

type State = {
  zoom: number,
  state: 'loading' | 'success' | 'error',
  message: ?string,
  uri: ?string,
};

class PdfPreview extends PureComponent<Props, State> {
  state = {
    zoom: 1,
    state: 'loading',
    message: null,
    uri: null,
  };

  cache: Cache<string, string, string> = create(x => x);

  componentDidMount() {
    setOptions({
      workerSrc: 'https://unpkg.com/pdfjs-dist@2.0.305/build/pdf.worker.min.js',
    });

    window.addEventListener('keydown', this.handleKeydown);
    this.fetchPdf();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
    this.clearCache();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.page.src !== this.props.page.src) {
      this.setState(() => ({ state: 'loading', zoom: 1 })); // eslint-disable-line
      this.fetchPdf();
    }
  }

  clearCache = () => {
    this.cache.clear((_, value) => {
      window.setTimeout(() => {
        URL.revokeObjectURL(value);
      }, 0);
    });
  };

  fetchPdf = async () => {
    const { src } = this.props.page;

    if (this.cache.has(src)) {
      const uri = this.cache.get(src);

      if (uri) {
        this.setState(() => ({ uri }));
        return;
      }
    }

    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const uri = URL.createObjectURL(blob);

      this.cache.set(src, uri);
      this.setState(() => ({ uri }));
    } catch (err) {
      this.setState(() => ({
        state: 'error',
        message: 'Kunde inte hämta PDFen',
      }));
    }
  };

  handleKeydown = (event: KeyboardEvent) => {
    const { keyCode } = event;
    if (keyCode === 27) this.props.onClose();
  };

  handleZoom = (val: number) => () => {
    const currentZoom = this.state.zoom;
    const nextZoom = clamp(0.1, 3, currentZoom * (1 + val));
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
    const { page, total, onNext, onPrev, onClose } = this.props;
    const { zoom, state, message, uri } = this.state;

    const current = Number.parseInt(page.name, 10);

    return (
      <Wrapper>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>

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
            file={uri}
            loading={<NoOp />}
            error={<NoOp />}
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
