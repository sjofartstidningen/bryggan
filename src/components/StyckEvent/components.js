import styled from 'styled-components';

export const TopSentinel = styled.div`
  position: absolute;
  left: 0;
  top: -${props => props.height}px;
  right: 0;
  height: ${props => props.height}px;
  visibility: hidden;
`;

export const StickyEl = styled.div`
  position: sticky;
  top: -1px; // 0 creates a minor gap in top
`;
