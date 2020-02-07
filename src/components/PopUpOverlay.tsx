import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { useLockBodyScroll } from '@fransvilhelm/hooks';
import Portal from '@reach/portal';
import { useTheme } from '../hooks/use-theme';

const Overlay = styled.div<{ passThroughPointer?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  pointer-events: ${p => (p.passThroughPointer ? 'none' : 'auto')};
`;

interface PopUpOverlayProps {
  layer?: keyof DefaultTheme['layer'];
  preventScroll?: boolean;
  passThroughPointer?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const PopUpOverlay: React.FC<PopUpOverlayProps> = ({
  layer = 'popup',
  preventScroll = true,
  passThroughPointer = false,
  className,
  onClick,
  children,
}) => {
  const theme = useTheme();
  useLockBodyScroll(preventScroll);

  return (
    <Portal>
      <Overlay
        className={className}
        style={{ zIndex: theme.layer[layer] }}
        onClick={onClick}
        passThroughPointer={passThroughPointer}
      >
        {children}
      </Overlay>
    </Portal>
  );
};
