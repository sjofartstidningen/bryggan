import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Hidden from '../../Typography/Hidden';
import ArrowRight from '../../Icons/ArrowRight';
import ArrowLeft from '../../Icons/ArrowLeft';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${props => props.theme.size(0)}em;
  border-bottom: 1px solid ${props => props.theme.color.white};
  padding: ${props => props.theme.size(-2)}em ${props => props.theme.size(-1)}em;
  font-family: ${props => props.theme.font.serif};
  color: ${props => props.theme.color.white};
`;

const Button = styled.button`
  position: relative;
  display: block;
  width: ${props => props.theme.size(0)}em;
  height: ${props => props.theme.size(0)}em;
  font-size: ${props => props.theme.size(1)}em;
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
      transition: transform 0.3s ease-in-out;
      will-change: transform;

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
  margin: 0 ${props => props.theme.size(0)}em;
`;

const CloseBtn = styled(Button)`
  margin-left: auto;

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
    className: PropTypes.string,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
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
    const { onPrev, onNext, onClose } = this.props;
    const { isFirst, isLast } = this.state;

    const { keyCode } = e;

    switch (keyCode) {
      case 37:
        return !isFirst && onPrev();
      case 39:
        return !isLast && onNext();
      case 27:
        return onClose();
      default:
        return null;
    }
  };

  render() {
    const { page, total, onPrev, onNext, onClose, className } = this.props;
    const { isFirst, isLast } = this.state;

    return (
      <Container className={className}>
        <Button disabled={isFirst} left onClick={onPrev}>
          <ArrowLeft />
        </Button>
        <Info>
          {page} av {total}
        </Info>
        <Button disabled={isLast} right onClick={onNext}>
          <ArrowRight />
        </Button>
        <CloseBtn onClick={onClose}>
          <Hidden>Stäng</Hidden>
        </CloseBtn>
      </Container>
    );
  }
}
