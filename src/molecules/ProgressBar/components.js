import styled, { css } from 'styled-components';
import { transitions } from '../../theme/utils';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
  opacity: 1;
  visibility: visible;

  ${transitions.short('opacity', 'visibility')};
  transition-delay: 0.2s;

  ${p =>
    !p.show &&
    css`
      opacity: 0;
      visibility: hidden;
    `};
`;

const Bar = styled.div`
  position: relative;
  width: 75%;
  height 4px;
  background-color: ${({ theme }) => theme.color.greyLight};
`;

const Progress = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black};
  transform-origin: 0 0;

  ${transitions.short('transform')};
`;

export { Wrapper, Bar, Progress };
