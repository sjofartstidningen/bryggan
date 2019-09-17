import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { spacing } from 'styles/theme';
import { animated, fadeIn } from 'styles/animations';
import { PopUpOverlay } from './PopUpOverlay';
import { Spinner } from './Spinner';
import { useSize } from 'hooks/use-theme';

const Overlay = styled(PopUpOverlay)`
  backdrop-filter: blur(2px);
  ${animated(fadeIn)};
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: ${spacing('4')};
`;

interface LoaderProps {
  size?: keyof DefaultTheme['size'];
}

export const Loader: React.FC<LoaderProps> = ({ size }) => {
  const sizes = useSize();
  const fontSize = size ? sizes[size] : undefined;
  return (
    <span style={{ fontSize }}>
      <Spinner />
    </span>
  );
};

export const LoaderOverlay: React.FC = () => {
  return (
    <Overlay>
      <Wrapper>
        <Loader size="xl2" />
      </Wrapper>
    </Overlay>
  );
};
