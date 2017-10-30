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
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  padding: ${props => props.theme.size(0)}em;
  background-color: ${props => props.theme.color.black};
  z-index: ${props => props.theme.zIndex.top};
`;

const LogotypeContainer = styled.div`
  position: absolute;
  top: ${props => props.theme.size(0)}em;
  left: ${props => props.theme.size(0)}em;
  width: 40px;
`;

const PdfContainer = styled.div`
  width: ${props =>
    props.containerWidth ? `${props.containerWidth}px` : '100%'};
  max-width: 50rem;
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
  };

  // eslint-disable-next-line
  componentDidMount() {
    // eslint-disable-next-line
    window.PDFJS.workerSrc = `https://unpkg.com/pdfjs-dist@${PDFJS.version}/build/pdf.worker.min.js`;
  }

  getContainerWidth = raf(ref => {
    if (ref != null) {
      const { width, height, top } = ref.getBoundingClientRect();
      const controls = ref.querySelector('.pdf-controls');
      const controlsHeight = controls.getBoundingClientRect().height;
      const containerMaxHeight = window.innerHeight - top - controlsHeight;

      const aspectRatio = width / height;
      const containerWidth = containerMaxHeight * aspectRatio;
      this.setState(() => ({ containerWidth }));
    }
  });

  render() {
    const { pdfUrl, page, total, onPrev, onNext, onClose } = this.props;
    const { containerWidth } = this.state;

    return (
      <PreviewContainer>
        <LogotypeContainer>
          <Logotype invert />
        </LogotypeContainer>
        <PdfContainer
          innerRef={this.getContainerWidth}
          containerWidth={containerWidth}
        >
          <PdfControls
            className="pdf-controls"
            page={page}
            total={total}
            onPrev={onPrev}
            onNext={onNext}
            onClose={onClose}
          />
          <Document className="pdf-document" file={pdfUrl} loading={<Loader />}>
            <Page
              width={containerWidth}
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
