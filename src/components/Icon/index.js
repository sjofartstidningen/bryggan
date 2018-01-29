import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const IconWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-self: center;
  width: 1em;
  height: 1em;
`;

const IconSvg = styled.svg`
  width: 1em;
  height: 1em;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;

  ${p =>
    p.baseline &&
    css`
      position: absolute;
      bottom: -0.125em;
    `};
`;

const propTypes = { baseline: PropTypes.bool, className: PropTypes.string };
const defaultProps = { baseline: false, className: '' };

function Icon({ baseline, className, children }) {
  return (
    <IconWrapper className={className}>
      <IconSvg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        baseline={baseline}
      >
        {children}
      </IconSvg>
    </IconWrapper>
  );
}

Icon.propTypes = {
  className: PropTypes.string,
  baseline: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Icon.defaultProps = defaultProps;

function SignOut({ baseline, className }) {
  return (
    <Icon baseline={baseline} className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </Icon>
  );
}

SignOut.propTypes = propTypes;
SignOut.defaultProps = defaultProps;

export { Icon as default, SignOut };
