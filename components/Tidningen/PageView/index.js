import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { Document, Page } from 'react-pdf';
import raf from 'raf-schd';
import { slideInDown, slideOutUp } from '../../../styles/animations';
import transitions from '../../../styles/transitions';
import Logotype from '../../Logotype';
import PdfControls from './Controls';
import Loader from '../../Loader';
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
  ${slideInDown};

  ${props => props.exit && slideOutUp()};
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LogotypeContainer = styled.div`
  width: 40px;
`;

const PdfContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${modularScale(3)} auto 0;
  opacity: ${props => (props.show ? 1 : 0)};
  transform: translateY(${props => (props.show ? 0 : '5%')});
  ${transitions('opacity', 'transform')};
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
    zoom: 1,
    exit: false,
    rendered: false,
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

  handleZoom = raf(step =>
    this.setState(({ zoom }) => ({
      zoom: step == null ? 1 : clamp(0.1, 2.5, zoom + step * 0.15),
    })),
  );

  handleClose = raf(() => {
    this.container.addEventListener('transitionend', this.props.onClose, {
      once: true,
    });
    this.setState(() => ({ exit: true }));
  });

  handleRenderSuccess = raf(() => {
    this.setState(() => ({ rendered: true }));
  });

  handleNext = raf(() => {
    this.pdfContainer.addEventListener('transitionend', this.props.onNext, {
      once: true,
    });
    this.setState(() => ({ rendered: false }));
  });

  handlePrev = raf(() => {
    this.pdfContainer.addEventListener('transitionend', this.props.onPrev, {
      once: true,
    });
    this.setState(() => ({ rendered: false }));
  });

  render() {
    const { pdfUrl, page, total } = this.props;
    const { zoom, exit, rendered } = this.state;

    return createPortal(
      <PreviewContainer
        exit={exit}
        innerRef={ref => {
          this.container = ref;
        }}
      >
        <Header>
          <LogotypeContainer>
            <Logotype invert />
          </LogotypeContainer>

          <PdfControls
            className="pdf-controls"
            page={page}
            total={total}
            zoom={zoom}
            onPrev={this.handlePrev}
            onNext={this.handleNext}
            onClose={this.handleClose}
            onZoom={this.handleZoom}
          />
        </Header>

        <Loader
          width="10%"
          style={{
            opacity: rendered ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />

        <PdfContainer
          show={rendered}
          innerRef={ref => {
            this.pdfContainer = ref;
          }}
        >
          <Document file={pdfUrl}>
            <Page
              scale={1 * zoom}
              pageIndex={0}
              renderAnnotations={false}
              renderTextLayer={false}
              onRenderSuccess={this.handleRenderSuccess}
            />
          </Document>
        </PdfContainer>
      </PreviewContainer>,
      this.el,
    );
  }
}
