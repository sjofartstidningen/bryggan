import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { modularScale } from 'polished';
import transition from '../../../styles/transitions';
import Hidden from '../../Typography/Hidden';
import ArrowRight from '../../Icons/ArrowRight';
import ArrowLeft from '../../Icons/ArrowLeft';
import Plus from '../../Icons/Plus';
import Minus from '../../Icons/Minus';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30rem;
  margin: 0 auto;
  margin-bottom: ${modularScale(0)};
  font-family: ${props => props.theme.font.serif};
  color: ${props => props.theme.color.white};
`;

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  position: relative;
  display: block;
  width: ${modularScale(0)};
  height: ${modularScale(0)};
  font-size: ${modularScale(1)};
  line-height: 1;
  border: none;
  border-radius: 0;
  padding: 0;
  color: ${props => props.theme.color.white};
  background-color: transparent;
  cursor: pointer;

  ${props =>
    (props.left || props.right) &&
    css`
      ${transition('transform')};

      &:hover {
        transform: translateX(${props.left && '-'}10%);
      }
    `};

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }

  &:disabled:hover {
    transform: none;
  }

  &:focus {
    outline: none;
  }
`;

const Info = styled.span`
  margin: 0 ${modularScale(0)};
`;

const CloseBtn = styled(Button)`
  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: currentColor;
    transform: rotate(-45deg) translateY(-50%);
  }

  &::after {
    transform: rotate(45deg) translateY(-50%);
  }
`;

export default class PdfControls extends Component {
  static propTypes = {
    page: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    className: PropTypes.string,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onZoom: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  state = {
    isFirst: false,
    isLast: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    const { page, total } = nextProps;
    const pageNum = Number.parseInt(page, 10);

    const isFirst = pageNum <= 1;
    const isLast = pageNum >= total;

    this.setState(() => ({ isFirst, isLast }));
  }

  handleKeyDown = e => {
    const { onPrev, onNext, onClose, onZoom } = this.props;
    const { isFirst, isLast } = this.state;

    const { keyCode } = e;

    switch (keyCode) {
      case 37:
        return !isFirst && onPrev();
      case 39:
        return !isLast && onNext();
      case 27:
        return onClose();
      case 187:
        return onZoom(1);
      case 189:
        return onZoom(-1);
      case 48:
        return onZoom();
      default:
        return null;
    }
  };

  render() {
    const {
      page,
      total,
      zoom,
      onPrev,
      onNext,
      onClose,
      onZoom,
      className,
    } = this.props;
    const { isFirst, isLast } = this.state;

    return (
      <Container className={className}>
        <Group>
          <Button disabled={isFirst} left onClick={onPrev}>
            <ArrowLeft />
          </Button>
          <Info>
            {page} av {total}
          </Info>
          <Button disabled={isLast} right onClick={onNext}>
            <ArrowRight />
          </Button>
        </Group>

        <Group>
          <Button onClick={() => onZoom(-1)}>
            <Minus />
          </Button>
          <Info onClick={() => onZoom()}>{(100 * zoom).toFixed(0)}%</Info>
          <Button onClick={() => onZoom(1)}>
            <Plus />
          </Button>
        </Group>

        <Group>
          <CloseBtn onClick={onClose}>
            <Hidden>Stäng</Hidden>
          </CloseBtn>
        </Group>
      </Container>
    );
  }
}
