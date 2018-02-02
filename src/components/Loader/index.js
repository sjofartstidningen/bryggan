import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';
import { CloudRain } from '../Icon';
import { ax } from '../../styles';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: calc(100% * ${p => p.ratio});
  font-size: 2em;
  color: ${p => lighten(0.5, ax('color.black')(p))};
`;

const raindrops = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1
  }

  50% {
    transform: translateY(100%);
    opacity: 0;
  }

  75% {
    transform: translateY(0);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Icon = styled(CloudRain)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & svg {
    overflow: visible;
  }

  & line {
    animation: ${raindrops} 1s ease-in-out infinite;
    animation-delay: 0;
  }

  & line:nth-child(2) {
    animation-delay: 0.66s;
  }

  & line:nth-child(3) {
    animation-delay: 0.33s;
  }
`;

function Loader({ ratio }) {
  return (
    <Wrapper ratio={ratio}>
      <Icon />
    </Wrapper>
  );
}

Loader.propTypes = {
  ratio: PropTypes.number,
};

Loader.defaultProps = {
  ratio: 1,
};

export default Loader;
