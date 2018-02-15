// @flow
import React, { Component } from 'react';
import padStart from 'lodash.padstart';
import { ChevronLeft, ChevronRight, ZoomOut, ZoomIn } from '../Icon';
import { Wrapper, PageIndicator, Button, Hide } from './components';

type Props = {
  currentPage: string,
  totalPages: number,
  onNextPage: () => void,
  onPrevPage: () => void,
  onZoomDecrease: () => void,
  onZoomIncrease: () => void,
  onZoomReset: () => void,
};

class PageController extends Component<Props, *> {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = ({ keyCode }: KeyboardEvent) => {
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
    
    const curr = padStart(
      Number.parseInt(currentPage, 10),
      String(totalPages).length,
      '0',
    );

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
