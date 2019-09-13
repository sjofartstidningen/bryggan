import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { color, spacing, font } from 'styles/theme';
import rafSchd from 'raf-schd';
import { animated, fadeIn } from 'styles/animations';
import { PopUpOverlay } from './PopUpOverlay';

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

const LoaderText = styled.p`
  font-family: ${font('display')};
`;

const Svg = styled.svg`
  width: 100%;
  max-width: ${spacing('64')};
  height: auto;
`;

const Path = styled.path`
  stroke: ${color('black')};
  stroke-width: 10;
  stroke-linecap: round;
  fill: none;
`;

const xs = Array.from({ length: 580 }, (_, i) => i + 10);

export const Loader: React.FC = () => {
  const [path, setPath] = useState('');

  useEffect(() => {
    let postCleanUp = false;
    const animate = rafSchd((frame: number = 1) => {
      const points = xs.map(x => {
        const y = 25 + 20 * Math.sin((x + frame) / 20);
        return [x, y];
      });

      const path = 'M' + points.map(([x, y]) => `${x},${y}`).join(' L');
      !postCleanUp && setPath(path);

      animate(frame + 5);
    });

    animate();

    return () => {
      postCleanUp = true;
      animate.cancel();
    };
  }, []);

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 50">
      <Path d={path} />
    </Svg>
  );
};

export const LoaderOverlay: React.FC = () => {
  return (
    <Overlay>
      <Wrapper>
        <LoaderText>loading...</LoaderText>
        <Loader />
      </Wrapper>
    </Overlay>
  );
};
