/* eslint-disable no-underscore-dangle */
// @flow
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import { Link as _Link } from 'react-router-dom';
import { darken, timingFunctions } from 'polished';
import { ExternalLink as ExternalIcon } from '../Icon';

const Link = styled(_Link)`
  border-bottom: 1px solid currentColor;
  color: ${({ theme }) => theme.color.brand};
  text-decoration: none;
  transition: color 0.2s ${timingFunctions('easeInOutCubic')};

  &:hover {
    color: ${({ theme }) => darken(0.05, theme.color.brand)};
  }
`;

type Props = {
  to: string,
  target?: '_self' | '_blank' | '_parent' | '_top',
  className: string,
  children: Node,
};

const _ExternalLink = ({ to, target, className, children }: Props) => (
  <a href={to} className={className} target={target} rel="noopener">
    {children} <ExternalIcon />
  </a>
);

_ExternalLink.defaultProps = {
  target: '_blank',
};

const ExternalLink = Link.withComponent(_ExternalLink);

export { Link, ExternalLink };
