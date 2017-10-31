import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { Document, Page } from 'react-pdf';
import raf from 'raf-schd';
import transition from '../../../styles/transitions';
import Logotype from '../../Logotype';
import PdfControls from './Controls';
import Loader from './Loader';
import clamp from '../../../utils/clamp';

const PreviewContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  padding: ${modularScale(0)};
  background-color: ${props => props.theme.color.black};
  z-index: ${props => props.theme.zIndex.top};
  overflow-x: scroll;
`;

const LogotypeContainer = styled.div`
  position: absolute;
  top: ${modularScale(0)};
  left: ${modularScale(0)};
  width: 40px;
`;

const PdfContainer = styled.div`
  width: ${props =>
    props.containerWidth ? `${props.containerWidth}px` : '30rem'};
  margin: 0 auto;
  ${transition('width')};

  & .pdf-page canvas {
    ${transition('width')};
  }
`;

export default class PageView extends Component {
  static propTypes = {
    pdfUrl: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    containerWidth: undefined,
    zoom: 1,
  };

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // eslint-disable-next-line
    window.PDFJS.workerSrc = `https://unpkg.com/pdfjs-dist@${PDFJS.version}/build/pdf.worker.min.js`;

    this.rootEl = document.getElementById('preview-root');
    this.rootEl.appendChild(this.el);
  }

  componentWillUnmount() {
    this.rootEl.removeChild(this.el);
  }

  handleZoom = step =>
    this.setState(({ zoom }) => ({
      zoom: step == null ? 1 : clamp(0.1, 2.5, zoom + step * 0.15),
    }));

  handleLoad = raf(() => {
    if (this.container != null) {
      const pdf = this.container.querySelector('canvas');
      const { width, height } = pdf.getBoundingClientRect();
      const { top } = this.container.getBoundingClientRect();
      const containerMaxHeight = window.innerHeight - top - 16;

      const aspectRatio = width / height;
      const containerWidth = containerMaxHeight * aspectRatio;
      this.setState(() => ({ containerWidth }));
    }
  });

  render() {
    const { pdfUrl, page, total, onPrev, onNext, onClose } = this.props;
    const { containerWidth, zoom } = this.state;
    const width = containerWidth * zoom;

    return createPortal(
      <PreviewContainer>
        <LogotypeContainer>
          <Logotype invert />
        </LogotypeContainer>

        <PdfControls
          className="pdf-controls"
          page={page}
          total={total}
          zoom={zoom}
          onPrev={onPrev}
          onNext={onNext}
          onClose={onClose}
          onZoom={this.handleZoom}
        />

        <PdfContainer
          innerRef={ref => {
            this.container = ref;
          }}
          containerWidth={width}
        >
          <Document className="pdf-document" file={pdfUrl} loading={<Loader />}>
            <Page
              className="pdf-page"
              width={width}
              pageIndex={0}
              renderAnnotations={false}
              renderTextLayer={false}
              onLoadSuccess={this.handleLoad}
            />
          </Document>
        </PdfContainer>
      </PreviewContainer>,
      this.el,
    );
  }
}
