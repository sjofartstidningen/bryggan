import styled from 'styled-components';

export const Container = styled.div`
  pointer-events: none;
`;

export const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 2px;
  background: ${props => props.theme.color.black};
  opacity: 0;
  z-index: 3;
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
  transform-origin: 0% 0%;
  will-change: opacity, transition;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #000, 0 0 5px #000;
    transform: rotate(3deg) translate(0px, -4px);
  }
`;
