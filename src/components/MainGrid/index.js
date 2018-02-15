// @flow
import styled from 'styled-components';
import { modularScale, lighten, stripUnit } from 'polished';
import { ax } from '../../styles';

const modularScaleRem = (x: number): string =>
  `${stripUnit(modularScale(x))}rem`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 16rem repeat(3, 1fr);
  grid-template-areas:
    'sidebar header header header'
    'sidebar main main main'
    'sidebar footer footer footer';
  width: 100vw;
  height: auto;
`;

const AreaMain = styled.main`
  grid-area: main;
  padding: ${modularScale(1)};
  color: ${ax('color.black')};
  font-family: ${ax('font.sansSerif')};
`;

const AreaHeader = styled.header`
  grid-area: header;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid ${p => lighten(0, ax('color.grey')(p))};
  padding: ${modularScale(-1)};
  font-family: ${ax('font.sansSerif')};
  color: ${ax('color.black')};
  background-color: ${p => lighten(0.15, ax('color.grey')(p))};

  & > * {
    margin-right: ${modularScaleRem(2)};
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const AreaSidebar = styled.div`
  position: relative;
  grid-area: sidebar;
`;

export { Grid, AreaMain, AreaHeader, AreaSidebar };
