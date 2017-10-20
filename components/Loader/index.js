// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid ${props => props.theme.color.grey};
  border-radius: 100%;
  padding: 0.5em;
`;

const LoaderPadding = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  overflow: hidden;
`;

const LoaderSvg = styled.svg`
  position: absolute;
  display: block;
  top: 50%;
  width: auto;
  transform: translateY(-50%);
`;

const waveAnimation = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(50%); }
`;

const LoaderPath = styled.path`
  stroke: ${props => props.theme.color.grey};
  stroke-width: 1px;
  fill: none;
  animation-name: ${waveAnimation};
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

export default function Loader(props: mixed) {
  return (
    <LoaderContainer {...props}>
      <LoaderPadding>
        <LoaderSvg viewBox="0 0 150 16">
          <LoaderPath
            d="M-150,13c9.38,0,9.38-10,18.75-10s9.38,10,18.75,10,9.38-10,18.75-10S-84.37,13-75,13-65.62,3-56.25,3s9.38,10,18.75,10S-28.12,3-18.75,3-9.37,13,0,13,9.38,3,18.75,3,28.13,13,37.5,13,46.88,3,56.25,3,65.63,13,75,13,84.38,3,93.75,3s9.38,10,18.75,10,9.38-10,18.75-10S140.63,13,150,13"
            vectorEffect="non-scaling-stroke"
          />
        </LoaderSvg>
      </LoaderPadding>
    </LoaderContainer>
  );
}
