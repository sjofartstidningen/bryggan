import '@reach/tooltip/styles.css';
import React, { cloneElement } from 'react';
import { useTooltip, TooltipPopup, TooltipProps } from '@reach/tooltip';
import Portal from '@reach/portal';
import styled from 'styled-components';
import { color } from 'styles/theme';
import { useTheme } from 'hooks/use-theme';

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid ${color('black')};
`;

export const Tooltip = ({ children, ...rest }: Props & TooltipProps) => {
  const theme = useTheme();

  const [trigger, tooltip] = useTooltip();
  const { isVisible, triggerRect } = tooltip;
  return (
    <>
      {cloneElement(children, trigger)}
      {isVisible && (
        <Portal>
          <Triangle
            style={{
              left:
                triggerRect && triggerRect.left - 10 + triggerRect.width / 2,
              top: triggerRect && triggerRect.bottom + window.scrollY,
            }}
          />
        </Portal>
      )}
      <TooltipPopup
        {...tooltip}
        {...rest}
        position={centered}
        style={{
          background: theme.color.black,
          color: theme.color.white,
          border: 'none',
          borderRadius: '3px',
          padding: `${theme.spacing['2']} ${theme.spacing['4']}`,
        }}
      />
    </>
  );
};

interface Props {
  children: React.ReactElement;
}

const centered = (triggerRect: DOMRect, tooltipRect: DOMRect) => {
  const triggerCenter = triggerRect.left + triggerRect.width / 2;
  const left = triggerCenter - tooltipRect.width / 2;
  const maxLeft = window.innerWidth - tooltipRect.width - 2;
  return {
    left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
    top: triggerRect.bottom + 8 + window.scrollY,
  } as DOMRect;
};
