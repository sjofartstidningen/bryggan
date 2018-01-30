import styled from 'styled-components';
import { modularScale, lighten, stripUnit } from 'polished';

const modularScaleRem = x => `${stripUnit(modularScale(x))}rem`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    'header header header header'
    'main main main main'
    'footer footer footer footer';
  width: 100vw;
  height: auto;
`;

const Main = styled.main`
  grid-area: main;
  padding: ${modularScale(1)};
  color: #1a1a1a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid ${lighten(0, '#c5c5c5')};
  padding: ${modularScale(-1)};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  color: #1a1a1a;
  background-color: ${lighten(0.15, '#c5c5c5')};

  & > * {
    margin-right: ${modularScaleRem(2)};
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

export { Grid, Main, Header };
