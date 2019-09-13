import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

const IconWrapper = styled.span<JSX.IntrinsicElements['span']>`
  position: relative;
  display: inline-flex;
  align-self: center;
  width: 1em;
  height: 1em;
`;

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  baseline?: boolean;
  useFill?: boolean;
}

const IconSvg = styled.svg<IconProps>`
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

IconSvg.defaultProps = { baseline: true, useFill: false };

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ baseline, useFill, children, ...props }, ref) => {
    return (
      <IconWrapper ref={ref} {...props}>
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
  },
);

export const createIcon = (node: React.ReactNode, useFill: boolean = false) => {
  return forwardRef<HTMLSpanElement, IconProps>((props, ref) => (
    <Icon ref={ref} useFill={useFill} {...props}>
      {node}
    </Icon>
  ));
};

export const Dropbox = createIcon(
  <path d="M12 6.17L6.51 9.68 12 13.19 6.51 16.7 1 13.17l5.51-3.51L1 6.17l5.51-3.52zM6.48 17.83L12 14.32l5.5 3.51-5.5 3.52zM12 13.17l5.51-3.51L12 6.17l5.48-3.52L23 6.17l-5.51 3.51L23 13.19l-5.51 3.51z" />,
  true,
);

export const ArrowRightCircle = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 16 16 12 12 8" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </>,
);

export const ChevronRight = createIcon(<polyline points="9 18 15 12 9 6" />);

export const AlertCircle = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12" y2="16" />
  </>,
);
