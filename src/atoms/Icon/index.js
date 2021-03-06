import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import LogotypePaths from './Logotype';

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

  ${p =>
    p.useFill &&
    css`
      fill: currentColor;
      stroke: none;
    `};
`;

const IconProps = {
  baseline: PropTypes.bool,
  className: PropTypes.string,
};

const BaseIconProps = {
  ...IconProps,
  useFill: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const defaultProps = { baseline: true, className: '' };

function Icon({ baseline = true, useFill, className, children }) {
  return (
    <IconWrapper className={className}>
      <IconSvg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        baseline={baseline}
        useFill={useFill}
      >
        {children}
      </IconSvg>
    </IconWrapper>
  );
}

Icon.propTypes = BaseIconProps;

function SignOut(props) {
  return (
    <Icon {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </Icon>
  );
}

SignOut.propTypes = IconProps;
SignOut.defaultProps = defaultProps;

function Eye(props) {
  return (
    <Icon {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  );
}

Eye.propTypes = IconProps;
Eye.defaultProps = defaultProps;

function CloudRain(props) {
  return (
    <Icon {...props}>
      {' '}
      <line x1="16" y1="13" x2="16" y2="21" />
      <line x1="8" y1="13" x2="8" y2="21" />
      <line x1="12" y1="15" x2="12" y2="23" />
      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
    </Icon>
  );
}

CloudRain.propTypes = IconProps;
CloudRain.defaultProps = defaultProps;

function ChevronsRight(props) {
  return (
    <Icon {...props}>
      <polyline points="13 17 18 12 13 7" />
      <polyline points="6 17 11 12 6 7" />
    </Icon>
  );
}

ChevronsRight.propTypes = IconProps;
ChevronsRight.defaultProps = defaultProps;

function ChevronLeft(props) {
  return (
    <Icon {...props}>
      {' '}
      <polyline points="15 18 9 12 15 6" />
    </Icon>
  );
}

ChevronLeft.propTypes = IconProps;
ChevronLeft.defaultProps = defaultProps;

function ChevronRight(props) {
  return (
    <Icon {...props}>
      <polyline points="9 18 15 12 9 6" />
    </Icon>
  );
}

ChevronRight.propTypes = IconProps;
ChevronRight.defaultProps = defaultProps;

function ChevronDown(props) {
  return (
    <Icon {...props}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  );
}

ChevronDown.propTypes = IconProps;
ChevronDown.defaultProps = defaultProps;

function ArrowLeft(props) {
  return (
    <Icon {...props}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </Icon>
  );
}

ArrowLeft.propTypes = IconProps;
ArrowLeft.defaultProps = defaultProps;

function ArrowRight(props) {
  return (
    <Icon {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </Icon>
  );
}

ArrowRight.propTypes = IconProps;
ArrowRight.defaultProps = defaultProps;

function ZoomIn(props) {
  return (
    <Icon {...props}>
      {' '}
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </Icon>
  );
}

ZoomIn.propTypes = IconProps;
ZoomIn.defaultProps = defaultProps;

function ZoomOut(props) {
  return (
    <Icon {...props}>
      {' '}
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </Icon>
  );
}

ZoomOut.propTypes = IconProps;
ZoomOut.defaultProps = defaultProps;

function Refresh(props) {
  return (
    <Icon {...props}>
      {' '}
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </Icon>
  );
}

Refresh.propTypes = IconProps;
Refresh.defaultProps = defaultProps;

function Book(props) {
  return (
    <Icon {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </Icon>
  );
}

Book.propTypes = IconProps;
Book.defaultProps = defaultProps;

function Sliders(props) {
  return (
    <Icon {...props}>
      {' '}
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </Icon>
  );
}

Sliders.propTypes = IconProps;
Sliders.defaultProps = defaultProps;

function Close(props) {
  return (
    <Icon {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  );
}

Close.propTypes = IconProps;
Close.defaultProps = defaultProps;

function ExternalLink(props) {
  return (
    <Icon {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </Icon>
  );
}

ExternalLink.propTypes = IconProps;
ExternalLink.defaultProps = defaultProps;

function Download(props) {
  return (
    <Icon {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </Icon>
  );
}

Download.propTypes = IconProps;
Download.defaultProps = defaultProps;

function Plus(props) {
  return (
    <Icon {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  );
}

Plus.propTypes = IconProps;
Plus.defaultProps = defaultProps;

function Minus(props) {
  return (
    <Icon {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  );
}

Minus.propTypes = IconProps;
Minus.defaultProps = defaultProps;

function Logotype(props) {
  return (
    <Icon useFill {...props}>
      <LogotypePaths />
    </Icon>
  );
}

Logotype.propTypes = IconProps;
Logotype.defaultProps = defaultProps;

export {
  SignOut,
  Eye,
  CloudRain,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Refresh,
  Book,
  Sliders,
  Close,
  ExternalLink,
  Download,
  Plus,
  Minus,
  Logotype,
};
