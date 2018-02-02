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
const defaultProps = { baseline: false, className: undefined };

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

function Eye({ baseline, className }) {
  return (
    <Icon baseline={baseline} className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  );
}

Eye.propTypes = propTypes;
Eye.defaultProps = defaultProps;

function CloudRain({ baseline, className }) {
  return (
    <Icon baseline={baseline} className={className}>
      <line x1="16" y1="13" x2="16" y2="21" />
      <line x1="8" y1="13" x2="8" y2="21" />
      <line x1="12" y1="15" x2="12" y2="23" />
      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
    </Icon>
  );
}

CloudRain.propTypes = propTypes;
CloudRain.defaultProps = defaultProps;

function ChevronsRight({ baseline, className }) {
  return (
    <Icon baseline={baseline} className={className}>
      <polyline points="13 17 18 12 13 7" />
      <polyline points="6 17 11 12 6 7" />
    </Icon>
  );
}

ChevronsRight.propTypes = propTypes;
ChevronsRight.defaultProps = defaultProps;

function ChevronLeft({ baseline, className }) {
  return (
    <Icon baseline={baseline} className={className}>
      <polyline points="15 18 9 12 15 6" />
    </Icon>
  );
}

ChevronLeft.propTypes = propTypes;
ChevronLeft.defaultProps = defaultProps;

function ChevronRight({ baseline, className }) {
  return (
    <Icon baseline={baseline} className={className}>
      <polyline points="9 18 15 12 9 6" />
    </Icon>
  );
}

ChevronRight.propTypes = propTypes;
ChevronRight.defaultProps = defaultProps;

function ZoomIn({ baseline, className }) {
  return (
    <Icon baseline={baseline} className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </Icon>
  );
}

ZoomIn.propTypes = propTypes;
ZoomIn.defaultProps = defaultProps;

function ZoomOut({ baseline, className }) {
  return (
    <Icon baseline={baseline} className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </Icon>
  );
}

ZoomOut.propTypes = propTypes;
ZoomOut.defaultProps = defaultProps;

function Refresh({ baseline, className }) {
  return (
    <Icon baseline={baseline} className={className}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </Icon>
  );
}

Refresh.propTypes = propTypes;
Refresh.defaultProps = defaultProps;

export {
  Icon as default,
  IconSvg,
  SignOut,
  Eye,
  CloudRain,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Refresh,
};
