// @flow
import styled from 'styled-components';

const Grid = styled.div`
  position: relative;
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
  position: relative;
  grid-area: main;
`;

const AreaHeader = styled.header`
  position: relative;
  grid-area: header;
`;

const AreaSidebar = styled.div`
  position: relative;
  grid-area: sidebar;
`;

export { Grid, AreaMain, AreaHeader, AreaSidebar };
