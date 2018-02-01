import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale, lighten } from 'polished';
import padStart from 'lodash.padstart'
import { ChevronLeft, ChevronRight, ZoomOut, ZoomIn } from '../Icon';
import { ax } from '../../styles';

const Wrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  border: 1px solid ${p => lighten(0.8, ax('color.black')(p))};
  border-radius: 4px;
  padding: 0.5em;
  color: ${ax('color.black')};
  background-color: ${ax('color.white')};
  transform: translateX(-50%);
  user-select: none;
`;

const PageIndicator = styled.p`
  order: ${p => p.order || 0};
  margin: 0 1em;
  font-size: ${modularScale(0)};
  line-height: 1;
`;

const Button = styled.button`
  order: ${p => p.order || 0};
  margin: 0 1em;
  border: none;
  padding: 0.5em;
  font-size: ${modularScale(0)};
  line-height: 1em;
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  cursor: pointer;
`;

const Hide = styled.span`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

class PageController extends Component {
  static propTypes = {
    currentPage: PropTypes.string.isRequired,
    totalPages: PropTypes.number.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPrevPage: PropTypes.func.isRequired,
    onZoomDecrease: PropTypes.func.isRequired,
    onZoomIncrease: PropTypes.func.isRequired,
    onZoomReset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = ({ keyCode }) => {
    switch (keyCode) {
      case 37:
        this.props.onPrevPage();
        break;
      case 39:
        this.props.onNextPage();
        break;
      case 48:
        this.props.onZoomReset();
        break;
      case 187:
        this.props.onZoomIncrease();
        break;
      case 189:
        this.props.onZoomDecrease();
        break;
      default:
    }
  };

  render() {
    const {
      currentPage,
      totalPages,
      onNextPage,
      onPrevPage,
      onZoomDecrease,
      onZoomIncrease,
    } = this.props;
    const curr = padStart(Number.parseInt(currentPage, 10), String(totalPages).length, '0');

    return (
      <Wrapper>
        <PageIndicator order={3}>
          {curr} / {totalPages}
        </PageIndicator>

        <Button order={2} onClick={onPrevPage}>
          <ChevronLeft baseline /> <Hide>Previous page</Hide>
        </Button>

        <Button order={4} onClick={onNextPage}>
          <ChevronRight baseline /> <Hide>Next page</Hide>
        </Button>

        <Button order={1} onClick={onZoomDecrease}>
          <ZoomOut baseline /> <Hide>Decrease zoom</Hide>
        </Button>

        <Button order={5} onClick={onZoomIncrease}>
          <ZoomIn baseline /> <Hide>Increase zoom</Hide>
        </Button>
      </Wrapper>
    );
  }
}

export default PageController;
