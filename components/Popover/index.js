import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { modularScale, triangle } from 'polished';
import transition from '../../styles/transitions';

const Label = styled.span`
  position: absolute;
  top: calc(-1.5em - 2px - (2 * ${modularScale(-4)}));
  left: 50%;
  border: 1px solid ${props => props.theme.color.white};
  border-radius: 4px;
  padding: ${modularScale(-4)};
  font-size: 0.625rem;
  font-family: ${props => props.theme.font.serif};
  color: ${props => props.theme.color.white};
  background-color: ${props => props.theme.color.black};
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -50%);
  ${transition('opacity', 'visibility', 'transform')};

  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: calc(50% - 4px);
    color: ${props => props.theme.color.white};

    ${triangle({
      pointingDirection: 'bottom',
      height: '4px',
      width: '8px',
      foregroundColor: 'currentColor',
    })};
  }

  &::after {
    top: calc(100% - 1px);
    color: ${props => props.theme.color.black};
  }

  ${props =>
    props.show &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
    `};
`;

export default class Popover extends Component {
  static propTypes = {
    popover: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    showPopover: false,
  };

  renderLabel = () => {
    const { showPopover } = this.state;
    return <Label show={showPopover}>{this.props.popover()}</Label>;
  };

  renderChildren = () => {
    const { children } = this.props;
    const {
      style,
      onMouseEnter,
      onMouseLeave,
      children: grandChildren,
    } = children.props;

    React.Children.only(children);

    return cloneElement(
      children,
      {
        key: 'popover-child',
        style: {
          ...(style || {}),
          position: 'relative',
        },
        onMouseEnter: this.handleMouseEnter(onMouseEnter),
        onMouseLeave: this.handleMouseLeave(onMouseLeave),
      },
      grandChildren,
      this.renderLabel(),
    );
  };

  handleMouseEnter = fn => e => {
    this.setState(() => ({ showPopover: true }));
    if (fn) fn(e);
  };

  handleMouseLeave = fn => e => {
    this.setState(() => ({ showPopover: false }));
    if (fn) fn(e);
  };

  render() {
    return this.renderChildren();
  }
}
