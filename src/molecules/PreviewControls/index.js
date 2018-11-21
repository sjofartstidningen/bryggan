import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import padStart from 'lodash.padstart';
import { ArrowLeft, ArrowRight, Plus, Minus } from '../../atoms/Icon';
import { Wrapper, Control, Indicator } from './components';

class PreviewControls extends PureComponent<Props, *> {
  static propTypes = {
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onZoomInc: PropTypes.func.isRequired,
    onZoomDec: PropTypes.func.isRequired,
    onZoomReset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    const { current, total } = this.props;
    const { keyCode } = event;

    switch (keyCode) {
      case 39:
        if (current < total) this.props.onNext();
        break;
      case 37:
        if (current > 1) this.props.onPrev();
        break;
      case 187:
        this.props.onZoomInc();
        break;
      case 189:
        this.props.onZoomDec();
        break;
      case 48:
        this.props.onZoomReset();
        break;
      default:
    }
  };

  render() {
    const { current, total, onNext, onPrev, onZoomInc, onZoomDec } = this.props;

    const totalLength = `${total}`.length;
    const currentText = padStart(`${current}`, totalLength, '0');

    return (
      <Wrapper>
        <Control onClick={onPrev} disabled={current <= 1}>
          <ArrowLeft />
        </Control>
        <Control onClick={onZoomDec}>
          <Minus />
        </Control>

        <Indicator>
          {currentText}/{total}
        </Indicator>

        <Control onClick={onZoomInc}>
          <Plus />
        </Control>
        <Control onClick={onNext} disabled={current >= total}>
          <ArrowRight />
        </Control>
      </Wrapper>
    );
  }
}

export { PreviewControls as default };
