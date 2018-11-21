/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as _Link } from 'react-router-dom';
import { darken } from 'polished';
import { ExternalLink as ExternalIcon } from '../Icon';
import { transitions } from '../../theme/utils';

const Link = styled(_Link)`
  border-bottom: 1px solid currentColor;
  color: ${({ theme }) => theme.color.brand};
  text-decoration: none;

  ${transitions.short('color')};

  &:hover {
    color: ${({ theme }) => darken(0.05, theme.color.brand)};
  }
`;

const _ExternalLink = ({ to, target, className, children }) => (
  <a href={to} className={className} target={target} rel="noopener">
    {children} <ExternalIcon />
  </a>
);

_ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
  target: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

_ExternalLink.defaultProps = {
  target: '_blank',
};

const ExternalLink = Link.withComponent(_ExternalLink);

export { Link, ExternalLink };
