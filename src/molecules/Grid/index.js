// @flow
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: [sidebar] 15rem [main] auto;
  position: relative;
`;

const AreaSidebar = styled.div`
  grid-area: sidebar;
  position: relative;
`;

const AreaMain = styled.div`
  grid-area: main;
  position: relative;
`;

const MainContentWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: ${({ theme }) => theme.padding.double};
`;

export { Grid, AreaSidebar, AreaMain, MainContentWrapper };
