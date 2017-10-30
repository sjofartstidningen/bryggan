import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import raf from 'raf-schd';
import Logotype from '../../Logotype';
import PdfControls from './Controls';
import Loader from './Loader';

const PreviewContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  padding: ${props => props.theme.size(0)}em;
  background-color: ${props => props.theme.color.black};
  z-index: ${props => props.theme.zIndex.top};
  overflow-x: scroll;
`;

const LogotypeContainer = styled.div`
  position: absolute;
  top: ${props => props.theme.size(0)}em;
  left: ${props => props.theme.size(0)}em;
  width: 40px;
`;

const PdfContainer = styled.div`
  width: ${props =>
    props.containerWidth ? `${props.containerWidth}px` : 'auto'};
  margin: 0 auto;
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
    zoom: 0,
  };

  // eslint-disable-next-line
  componentDidMount() {
    // eslint-disable-next-line
    window.PDFJS.workerSrc = `https://unpkg.com/pdfjs-dist@${PDFJS.version}/build/pdf.worker.min.js`;
  }

  handleZoom = step => this.setState(({ zoom }) => ({ zoom: zoom + step }));

  getContainerWidth = raf(ref => {
    if (ref != null) {
      const { width, height, top } = ref.getBoundingClientRect();
      const containerMaxHeight = window.innerHeight - top;

      const aspectRatio = width / height;
      const containerWidth = containerMaxHeight * aspectRatio;
      this.setState(() => ({ containerWidth }));
    }
  });

  render() {
    const { pdfUrl, page, total, onPrev, onNext, onClose } = this.props;
    const { containerWidth, zoom } = this.state;

    const width = containerWidth * (1 + 0.15 * zoom);

    return (
      <PreviewContainer>
        <LogotypeContainer>
          <Logotype invert />
        </LogotypeContainer>

        <PdfControls
          className="pdf-controls"
          page={page}
          total={total}
          zoom={1 + 0.15 * zoom}
          onPrev={onPrev}
          onNext={onNext}
          onClose={onClose}
          onZoom={this.handleZoom}
        />

        <PdfContainer innerRef={this.getContainerWidth} containerWidth={width}>
          <Document className="pdf-document" file={pdfUrl} loading={<Loader />}>
            <Page
              width={width}
              pageIndex={0}
              renderAnnotations={false}
              renderTextLayer={false}
            />
          </Document>
        </PdfContainer>
      </PreviewContainer>
    );
  }
}
