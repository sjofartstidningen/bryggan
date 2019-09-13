import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useLockBodyScroll } from '@fransvilhelm/hooks';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
`;

interface PopUpOverlayProps {
  zIndex?: number;
  preventScroll?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const PopUpOverlay: React.FC<PopUpOverlayProps> = ({
  zIndex = 1,
  preventScroll = true,
  className,
  onClick,
  children,
}) => {
  const container = useRef<Element>();
  useLockBodyScroll(preventScroll);

  const getRootElement = () => {
    if (container.current) return container.current;
    container.current = document.createElement('popup-portal');
    return container.current;
  };

  useEffect(() => {
    document.body.appendChild(getRootElement());

    return () => {
      if (container.current) {
        container.current.remove();
        container.current = undefined;
      }
    };
  }, []);

  return createPortal(
    <Overlay className={className} style={{ zIndex }} onClick={onClick}>
      {children}
    </Overlay>,
    getRootElement(),
  );
};
