// @flow
import React from 'react';
import type { Node } from 'react';
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

  ${p =>
    p.useFill &&
    css`
      fill: currentColor;
      stroke: none;
    `};
`;

type IconProps = {
  baseline: boolean,
  className: string,
};

type BaseIconProps = IconProps & {
  useFill?: boolean,
  children: Node,
};

const defaultProps = { baseline: true, className: '' };

function Icon({
  baseline = true,
  useFill,
  className,
  children,
}: BaseIconProps) {
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

function SignOut(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </Icon>
  );
}

SignOut.defaultProps = defaultProps;

function Eye(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  );
}

Eye.defaultProps = defaultProps;

function CloudRain(props: IconProps) {
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

CloudRain.defaultProps = defaultProps;

function ChevronsRight({
  baseline = true,
  className,
}: IconProps = defaultProps) {
  return (
    <Icon baseline={baseline} className={className}>
      <polyline points="13 17 18 12 13 7" />
      <polyline points="6 17 11 12 6 7" />
    </Icon>
  );
}

ChevronsRight.defaultProps = defaultProps;

function ChevronLeft(props: IconProps) {
  return (
    <Icon {...props}>
      {' '}
      <polyline points="15 18 9 12 15 6" />
    </Icon>
  );
}

ChevronLeft.defaultProps = defaultProps;

function ChevronRight({
  baseline = true,
  className,
}: IconProps = defaultProps) {
  return (
    <Icon baseline={baseline} className={className}>
      <polyline points="9 18 15 12 9 6" />
    </Icon>
  );
}

ChevronRight.defaultProps = defaultProps;

function ChevronDown({ baseline = true, className }: IconProps = defaultProps) {
  return (
    <Icon baseline={baseline} className={className}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  );
}

ChevronDown.defaultProps = defaultProps;

function ZoomIn(props: IconProps) {
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

ZoomIn.defaultProps = defaultProps;

function ZoomOut(props: IconProps) {
  return (
    <Icon {...props}>
      {' '}
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </Icon>
  );
}

ZoomOut.defaultProps = defaultProps;

function Refresh(props: IconProps) {
  return (
    <Icon {...props}>
      {' '}
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </Icon>
  );
}

Refresh.defaultProps = defaultProps;

function Book(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </Icon>
  );
}

Book.defaultProps = defaultProps;

function Sliders(props: IconProps) {
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

Sliders.defaultProps = defaultProps;

function Close(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  );
}

Close.defaultProps = defaultProps;

function ExternalLink(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </Icon>
  );
}

ExternalLink.defaultProps = defaultProps;

function Logotype(props: IconProps) {
  return (
    <Icon useFill {...props}>
      <path d="M12.88,22.57a2.24,2.24,0,0,1-1.52-.49l0,0-.07,0a2.32,2.32,0,0,1-1.69.55,5.31,5.31,0,0,1-1.29-.17l0,.16A4,4,0,0,0,9.78,23a2,2,0,0,0,1.51-.6,2.3,2.3,0,0,0,1.34.47,1.33,1.33,0,0,0,.68-.17l-.05-.15A2.42,2.42,0,0,1,12.88,22.57Zm-3.1.28a3.15,3.15,0,0,1-.52-.05l.31,0a3.07,3.07,0,0,0,1.28-.25A2.12,2.12,0,0,1,9.78,22.85Z" />
      <path d="M7.68,16.06c.06,0,.26,0,.33-.14a.25.25,0,0,0,0-.26l-.15-.31v0h0a.33.33,0,0,1,.15,0l.11-.12L8,15l-.5,0-.12.12,0,.18.19.39H7.57a.46.46,0,0,1-.13,0,.41.41,0,0,1-.25-.07l-.05,0-.13.1v0S7.11,16.06,7.68,16.06Zm0-.76,0-.06v-.07h.08l0,0A.38.38,0,0,0,7.68,15.3Zm0,.57c.11,0,.18,0,.21-.1l0,0a.15.15,0,0,1,0,.08.26.26,0,0,1-.2.07.44.44,0,0,1-.17,0A.24.24,0,0,0,7.63,15.87Z" />
      <path d="M8.5,16.16a1.86,1.86,0,0,0,.26,0,1,1,0,0,0,.22,0h.1L9,16l-.34-.13-.05,0s0,0,0,0l.23-.23a.29.29,0,0,0,0-.25c0-.15-.22-.22-.23-.24h0l-.34,0h0q-.11.08-.09.15a.13.13,0,0,0,.14.1v0l.14,0-.17.2c-.13.12-.2.24-.18.34a.15.15,0,0,0,.06.11A.5.5,0,0,0,8.5,16.16Zm0-.49.18-.2a.15.15,0,0,0,.05-.18.15.15,0,0,0-.06-.09h0a.28.28,0,0,1,.12.12.1.1,0,0,1,0,.1l-.2.2a.27.27,0,0,0-.13.2c0,.07.07.14.17.17l.06,0H8.53a.26.26,0,0,1-.17-.1l0,0v0S8.33,15.81,8.48,15.67Z" />
      <path d="M19.77,17.19a2.6,2.6,0,0,0,0-.4l1.33-1.12a.09.09,0,0,0,0-.11.08.08,0,0,0-.11,0l-1.21,1a5.34,5.34,0,0,0-.22-1.51l.2,0,0-.17-.43-.05.28-.67c.08-.15,2-3.33.22-5.77l-.1.09h0l0,0a0,0,0,0,0,0,0v5.11l-.18.36a3.11,3.11,0,0,0-2.21-1,4.74,4.74,0,0,0,.95-4.63l1.81,0V8.24l-1.86,0v0a4.13,4.13,0,0,0-.22-.62h0l.12-1.5h.7l.1.22.19.13.13,0,.18,0,0,0a.38.38,0,0,1,.37-.18,1,1,0,0,1,.35.06h.57l-.75-.63H19.8l-.33.2-.07-.1-.1-.24h0a2.64,2.64,0,0,0-1.07-.19h-.09v0h-.05l-.15,1.89a7.2,7.2,0,0,0-1-1.67l.27-.07,0-.16-1.62.38L16,4.86h-.38l.48-2.77L16.16,2a.34.34,0,0,1,.1-.06.44.44,0,0,1,.17,0,1.7,1.7,0,0,1,.81.28l.52.26.19,0,.08,0,.2-.32c.07,0,.3-.1.44.17,0,.08.18.24.58.24a1.06,1.06,0,0,0,.24,0l.3,0-.05,0-1.57-.72-.12,0,0,0a.83.83,0,0,1-.41.14.15.15,0,0,1-.09,0,.53.53,0,0,1-.23-.2v0h0l-.08,0h0a2.18,2.18,0,0,0-.82-.17h-.17l0-.35H16l-.92,3.91L14.74,5l.1.8,0,.17-1.75.41,0,.17.4-.1a5.59,5.59,0,0,1,0,5.09l-.22.06,0,.22a5.73,5.73,0,0,1-.86.94l.1.13a.15.15,0,0,0,.07-.07v0c.29-.15.54-.27.79-.37v0l-.61.82-.8-.12-.8-3,1.76.29,0-.17-1.82-.28h0l0-.05.65-2.59,1.22.08,0-.16-1.19-.07.64-2.51,0,.19,0,0a1,1,0,0,0,.68.33.65.65,0,0,0,.45-.18,1.89,1.89,0,0,1,.39-.05.62.62,0,0,1,.48.17l.16-.07A.71.71,0,0,0,14,4.63a.68.68,0,0,0-.17,0h-.27c-.56,0-.75-.28-.75-.3l-.1-.15.08-.3-.16,0-.87,3.39-.92-.06,0,.16.9,0-.57,2.3-.71-2.66c0-.15-.09-.3-.12-.44l-.17,0,.12.44A11.4,11.4,0,0,1,10.5,10l-.87-.16,0,.16.9.17,0,0c0,.25,0,.52,0,.75l-.07,0L9.15,14.42c-.4-.24-.44-.37-.44-.39v0c0-.18.09-.7.34-.8l.11,0-.08-.09a2.66,2.66,0,0,1-.4-.68l-.12-.29-.05.3s0,.25-.5.49l-.08,0L8,13a2.2,2.2,0,0,1,.18.9l0,.09h0a.09.09,0,0,1,0,.06c-.05.07-.22.19-.74.24H7.26v.08a3,3,0,0,1-2,2.19v0h0a1.07,1.07,0,0,1,0,.87.75.75,0,0,0-.39.62.83.83,0,0,0,.4.58l.59.37a2.35,2.35,0,0,0,.95,1.47,1,1,0,0,1-.82.37,2.22,2.22,0,0,1-1-.33l-.11-.09v.15a.62.62,0,0,1-.44.62,1.24,1.24,0,0,1-.45.09A3.77,3.77,0,0,1,3,21.11L2.74,21l.15.21a1.06,1.06,0,0,0,.87.44,1.6,1.6,0,0,0,.37-.05A1.32,1.32,0,0,0,5.07,21a2.83,2.83,0,0,0,1,.24.83.83,0,0,0,.77-.39v.39a7.53,7.53,0,0,0-1.34.67,3.1,3.1,0,0,1-.63.05c-.37,0-.74,0-.74,0h0l0,0a.24.24,0,0,0,0,.2c0,.06.12.15.51.15H5c.62,0,.8-.2.85-.28a4.36,4.36,0,0,1,1.29-.55,2.68,2.68,0,0,0,.77.06,14,14,0,0,0,1.45-.08,1.75,1.75,0,0,0,.62.1A5.8,5.8,0,0,0,12.08,21a2.62,2.62,0,0,0,1.33.32,4.84,4.84,0,0,0,1.28-.2c.35.12,1.12.33,1.13.33h0c1,0,1.6-.18,1.75-.48a.21.21,0,0,0,0-.15c.08,0,.21.08.23.15s0,.08-.05.13l0,0s-.2.51-1.84.63v.17a3.71,3.71,0,0,0,.39,0,2.64,2.64,0,0,0,1.6-.39s.41-.38.32-.68-.2-.27-.47-.32h0l-.22.1,0-.07a1,1,0,0,0-.39-.7h0l.37-.8h0l-.07-.61.42-.33a1.05,1.05,0,0,1,.35.22,1,1,0,0,1,.42.6,3.26,3.26,0,0,1-1.25.72.07.07,0,0,0-.05.1.09.09,0,0,0,.08.05h.05v0l2.46-.3,0,.13.22-.16A4.62,4.62,0,0,0,21,17.71l.18.05.05-.16ZM19.9,8.8a4.92,4.92,0,0,1,0,4.5Zm-.71-3.08.08.18.17.24.41-.27H20l.35.3h-.09a1.25,1.25,0,0,0-.4-.07.52.52,0,0,0-.5.25l-.07,0-.05,0-.15-.1L19,6l-.23,0h-.43l0-.4A2.09,2.09,0,0,1,19.19,5.72ZM16.44,1.49a2.91,2.91,0,0,1,.79.15.54.54,0,0,0,.47.25,1.05,1.05,0,0,0,.48-.14l1.26.59h-.1c-.39,0-.46-.19-.47-.2v0h0a1.94,1.94,0,0,0-.5-.2H18.3a.21.21,0,0,0-.15.05.45.45,0,0,1,0,.08L18,2.29H17.9a.31.31,0,0,0-.17-.06A2.11,2.11,0,0,1,17.24,2a1.26,1.26,0,0,0-.66-.2.82.82,0,0,0-.41.1l.09-.39ZM13,12.49c.13-.13.25-.28.37-.41l0,.25Zm-.29-7.91a1.36,1.36,0,0,0,1.08.22.46.46,0,0,1,.13,0A.53.53,0,0,1,14.4,5a1.33,1.33,0,0,0-.8,0h0l0,0a.52.52,0,0,1-.35.15.82.82,0,0,1-.54-.26ZM4.11,21.44h0a1.07,1.07,0,0,1-.84-.1,2.65,2.65,0,0,0,.67.09,1.2,1.2,0,0,0,.48-.09.45.45,0,0,0,.19-.08A.86.86,0,0,1,4.11,21.44Zm1-.65-.07,0,0,.07a2.45,2.45,0,0,1-.19.25.78.78,0,0,0,.15-.37l.17.08S5.08,20.79,5.07,20.79Zm1,.25A2.35,2.35,0,0,1,5.53,21,1.93,1.93,0,0,0,6,21a1.12,1.12,0,0,0,.7-.22A.67.67,0,0,1,6.07,21ZM4.56,22.11H4.5a1,1,0,0,1-.32,0,5.58,5.58,0,0,0,.67,0,2.38,2.38,0,0,0,.6-.05A1.83,1.83,0,0,1,4.56,22.11Zm13.57-1.18c.05.16-.18.43-.27.51a1.31,1.31,0,0,1-.56.25c.5-.18.63-.41.66-.48a.28.28,0,0,0,.07-.28.32.32,0,0,0-.17-.19A.35.35,0,0,1,18.13,20.93Zm1.34-6.75-.27.66.07,0-2.18-.27L17,13.43l0-.17.07.07.15-.15A3,3,0,0,1,19.47,14.18Zm-2.69-.73,0,.05v.05l-.08-.07-.72,1-1-.12a3.09,3.09,0,0,0-.05-.57l-.1,0,.09-.05a5,5,0,0,1,1.9-.55h0l0,0h0ZM14.9,18.62l.27,0,.05.22.17,0,0-.2h.17l0,.13.08,0s0,.05.07.05h0a.11.11,0,0,0,.09-.06l.18-.82c.27,0,.5,0,.72,0l0,1h0a4.71,4.71,0,0,1-1.75.2h0Zm-4,.45s-.16-.1-.1-.6l3.68,1.22-.13.5a13.76,13.76,0,0,1-3.41-.9V19.1Zm-.48-2.33a1.08,1.08,0,0,1-.6-.48l0,0,0,0a3.08,3.08,0,0,1-.26-1.42,24.31,24.31,0,0,0,2.56,1.91l.06.12a2.19,2.19,0,0,0,.57,1.55l-1.77-.53c0-.05,0-.07-.07-.09h0a.77.77,0,0,1-.32-.92l0-.1Zm2-2.49.15-.2.1.07-.12.2Zm.06.22,0,0,0-.09Zm.15.06.19.1-.07.16-.22-.09Zm.05.41-.08.18-.07-.23Zm.77-1.36.2,0L13,16.79,13,16.56l-.32-1.17Zm1.16-1.45a3.1,3.1,0,0,1,1.2-.09l-1,1.61v-.07l-.28,0L14.4,13l.44,0Zm1.3-.07a1.88,1.88,0,0,1,.4.13,1.27,1.27,0,0,1,.66.82,5.89,5.89,0,0,0-1.84.45l.83-1.37Zm1,6V18l.2,0v.15Zm.23.14v.13l-.23.05V18.3Zm-.22-.55v-.1l.17,0,0,.15Zm0-.27v-.24l.14,0v.24Zm0-.42v-.22l.1,0L17,17Zm0-.4v-.3l.07,0v.29Zm0-.47v-.7l0,.7Zm-.67-1.49.3,0-.67,3-.35,0-.32-1.39Zm-.37.24.12-.15-.1.15Zm.45-.39.39-.6-.15.63Zm-.5,3.35-.13.62-.14-.61ZM15.17,16l-.07.1,0-.15Zm0-.18.12-.15.08,0-.1.17Zm0,1.12H15l-.06-.28.08-.13Zm0,.16.07.27-.13,0L15,17.11Zm.1.44.05.2-.15,0,0-.2Zm.09.37,0,.16-.15,0,0-.17Zm.08.32,0,.18-.16,0,0-.17Zm-.05-2.72.13-.18h.07l-.12.22Zm.25-.33.12-.15,0,0-.1.15Zm.05-.35v0l-.64.87-.12-.52a5,5,0,0,0,.1-.67l.84.1Zm-.73,1.29.05.2-.09.13-.05-.22Zm-.31-.91-.08-.41.07,0,.08.38v0Zm0,1-.12.15,0-.06a2.44,2.44,0,0,0,.1-.24Zm-.15-1.55,0-.17h.07l0,.15Zm0,.77.05.28-.1,0-.05-.29Zm0,.47a.11.11,0,0,1,0,.06v-.06Zm0,1.45.07.5-.43.07Zm.05-.75.12-.17.05.25-.13.22Zm.24-2.08c0,.09,0,.17,0,.26l-.06-.27h.08Zm0,1.13h0s0,0,0-.07Zm0,1.27,0,.11-.1,0Zm0,.26.05.26-.2,0,0-.25ZM14.8,16l0-.2.08,0,0,.12Zm-.11-1.69-.14-.57.19,0-.09.16.14-.07a3,3,0,0,1,0,.48Zm-.26-.38.07.26-.05,0,0-.27Zm-.08-.16,0-.06h.05l0,.05Zm0-.23-.08-.4v-.07l.12.49Zm-.08.44,0,.26h0l0-.26Zm.08.43v0h0l0,.22h0l0-.25Zm.1.42.08.42H14.4l-.07-.41Zm0,1.92,0,.24-.15-.09Zm0,.4-.1.15-.25-.08.13-.18Zm-.2.31-.08.13-.29-.08.1-.14Zm-.17.26-.1.17-.32-.07.14-.18Zm-.2.32-.11.19-.34-.11.12-.16Zm-.33.62-.22-.07h0s0,0,0,0l0-.28.31.1-.16.25Zm-.76-2.06.17.6-.18,1a2.08,2.08,0,0,1-.45-1.39v0l-.1-.2,0-.05-.07,0a.47.47,0,0,1-.18-.1l.4-.69A3.45,3.45,0,0,1,12.79,16.59Zm-1-.22c-.1-.06-.2-.15-.32-.23l.23-.3L12,16Zm.28-.46-.27-.19.22-.28.2.2Zm-.18-.57-.22.28-.22-.15-.1.14.22.15-.23.3-.26-.19.57-.7a2,2,0,0,1,.36.28Zm-1.07,3a1.58,1.58,0,0,0,.05-.29h0l3.71,1.14-.1.35Zm3.81,1.4h.5l-.1.53H14.5Zm-1-1,.45-.74,0,.1.48-.08L14.8,19h0Zm1.09-.9,0-.2.21,0,0,.2A.93.93,0,0,0,14.77,17.8Zm.25.13,0,.17-.23,0,0-.17Zm.08.34,0,.16-.25,0,0-.15Zm1.58-.59a4,4,0,0,0-.69,0l.67-3,.07,0Zm0-3.13.05-.2v.22Zm0-.8,0-.05,0,.06Zm.14,4.85.25-.07v.22l-.26.08ZM17.14,13a6.83,6.83,0,0,0,.52-5.84A5,5,0,0,1,17.14,13ZM15.32,6l1.46-.36,0,.07a7.09,7.09,0,0,1,.23,7.08,1.41,1.41,0,0,0-.7-.77,2.23,2.23,0,0,0-1.29-.19l.25-5.72h0Zm-.23,1.42-.2,4.43a2.66,2.66,0,0,0-.37.07l-.1-.4Zm-1.44-1,1.12-.27L14.3,9.1A6.23,6.23,0,0,0,13.65,6.44Zm.53,7.36,0-.12Zm.19,2.42a8.57,8.57,0,0,1-.71,1.29l-.23.3.62-3.69ZM14,10.94l-.07.48-.17.05C13.87,11.29,14,11.12,14,10.94ZM13.66,13h.05l-.08.42-.15,0Zm-.13-.11h0l-.22.49-.06,0Zm-.28.65-.1.21-.09,0,.1-.16Zm-.09-.34-.08.15h0Zm-.23.3H13l-.07.1-.05,0Zm.05.34.1.07-.1.23-.12-.08Zm-.07.47-.07.16-.16-.08.1-.18Zm-.08-.56-.12.21-.08-.07.13-.19Zm-.09-.28-.45.62-.18-.7ZM10.62,8.56l1.54,5.71,0,.05h0l.1.39,0,.07h0l.27,1a2.72,2.72,0,0,0-2.38-1.24H10A19.49,19.49,0,0,0,10.62,8.56Zm-.2,2.83a21.35,21.35,0,0,1-.57,3.28l0,.12.11,0a2.91,2.91,0,0,1,1.61.3l-.55.69L9.52,14.58h0a.7.7,0,0,0-.17-.09ZM8.14,13a1.46,1.46,0,0,0,.46-.39,3.46,3.46,0,0,0,.28.49,1.14,1.14,0,0,0-.33.8l-.22,0A2.61,2.61,0,0,0,8.14,13ZM6.6,15.92v0a3.31,3.31,0,0,0,.82-1.49c.42,0,.7-.15.8-.3a.24.24,0,0,0,0-.12l.27.05c0,.05.08.29.8.66,0,.4.07,1.45.34,1.65l.05.07,0,0a1,1,0,0,0,.12.85l.17.29s0,.1,0,.12-.06.06-.41-.09a7,7,0,0,0-3.4-.68,1.59,1.59,0,0,1,.27-.27A.55.55,0,0,0,6.6,15.92Zm-.83,2.85-.45-.29A.69.69,0,0,1,5,18a.61.61,0,0,1,.32-.48v0a1.11,1.11,0,0,0,.12-.89,2.85,2.85,0,0,0,1-.62.37.37,0,0,1-.15.47c-.35.3-.39.42-.37.5a.18.18,0,0,0,.08.09h0a6.49,6.49,0,0,1,3.43.65,1.1,1.1,0,0,0,.41.12.24.24,0,0,0,.19-.07.28.28,0,0,0,0-.32L10,17.18a1,1,0,0,1-.14-.64,1.3,1.3,0,0,0,.47.34.91.91,0,0,0,.44,1c0,.07,0,.19-.07.34-.12.62,0,.85.12.92a.65.65,0,0,1-.19.5.38.38,0,0,1-.3,0l-.48-.21a1.23,1.23,0,0,0,.2-1.16h0l0,0a7.86,7.86,0,0,0-3.74-.94l-.32.09v0C5.53,17.66,5.68,18.45,5.77,18.77Zm1.59,2.59.35,0A1.68,1.68,0,0,1,7.36,21.36Zm.33-.17H7.34l-.32,0H7v-.92a1.12,1.12,0,0,0,.72-.34ZM7,20.07H6.94l-.12,0v.28A2.18,2.18,0,0,1,6,18.93a8.22,8.22,0,0,1,3.6.61l.08-.15a8.16,8.16,0,0,0-3.71-.62c-.09-.34-.19-1,.07-1.21l.26-.08a7.57,7.57,0,0,1,3.62.9,1.09,1.09,0,0,1-.24,1s-.85,1.44-1.75,1.26h0V19.5l-.15.15A1.08,1.08,0,0,1,7,20.07Zm1.3,1.16a3,3,0,0,1-.43,0v-.35a4.84,4.84,0,0,0,.8.35A2.23,2.23,0,0,1,8.31,21.23Zm1.64.16h0v-.08a7,7,0,0,0,1-.07A3.27,3.27,0,0,1,10,21.39Zm2.29-.5a4,4,0,0,0,.79.24A2.8,2.8,0,0,1,12.24,20.89Zm2.48.05h-.07l-.12,0c.05,0,.1-.05.16-.09s.21.1.41.19A3.06,3.06,0,0,0,14.72,20.94Zm1.14.34-.17-.05.23.05ZM17.31,21l.1-.08S17.36,21,17.31,21Zm.07-.29h0l-.05,0h0a1.41,1.41,0,0,1-1,.39,3.76,3.76,0,0,1-1.6-.44l-.05,0-.05,0a1.64,1.64,0,0,1-1,.3,4,4,0,0,1-1.45-.34h-.07a4.43,4.43,0,0,1-2.17.47H9.35l-.2,0a4.84,4.84,0,0,1-1-.33c.74-.11,1.36-1,1.54-1.26l.5.22a.65.65,0,0,0,.26.06.39.39,0,0,0,.2-.05.61.61,0,0,0,.25-.38c.48.2,4,1.64,6.1.55A1,1,0,0,1,17.38,20.72Zm-1.76-.53a2.36,2.36,0,0,1-.38,0l.1-.54c.11,0,.25,0,.37,0Zm.17,0,.1-.55.33-.05-.08.54A2.14,2.14,0,0,1,15.79,20.17Zm.79-.18a1.62,1.62,0,0,1-.27.08l.08-.53.29-.07ZM17,19.8H17a1.22,1.22,0,0,1-.23.1l.12-.5.42-.15Zm-.3-.51a10.52,10.52,0,0,1-2,.25l.1-.34a2.54,2.54,0,0,0,.52.05,6.2,6.2,0,0,0,2.09-.43l0,.16A1.58,1.58,0,0,1,16.74,19.29Zm.49-1v-.11l.12,0v.12Zm.13.2,0,.12-.14.05v-.2l.08,0Zm-.15-.48v-.14l.1,0,0,.1Zm0-.32v-.2l.06,0,0,.2Zm0-.38,0-.26h.05l0,.25Zm0-.42v-.22h0l0,.22Zm0-.39,0-.27Zm.38,1.73,0-.31c.1,0,.2.05.28.09Zm.91-.05a2.27,2.27,0,0,0-1-.42l-.35-3,2.29.28a4.54,4.54,0,0,1-.1,3.13,2.39,2.39,0,0,1-.45.64A1.23,1.23,0,0,0,18.42,18.22ZM20,19.39,18,19.64a3,3,0,0,0,1.14-.87v0c.57.08.78.25.87.39A.31.31,0,0,1,20,19.39Zm.17-.14a1,1,0,0,0-.07-.15,1.29,1.29,0,0,0-.92-.47,2.4,2.4,0,0,0,.23-.38,3,3,0,0,0,.29-.89l1.14.3A6.35,6.35,0,0,1,20.21,19.25Z" />
    </Icon>
  );
}

Logotype.defaultProps = defaultProps;

export {
  SignOut,
  Eye,
  CloudRain,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  Refresh,
  Book,
  Sliders,
  Close,
  ExternalLink,
  Logotype,
};
