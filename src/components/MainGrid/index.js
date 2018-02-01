import styled from 'styled-components';
import { modularScale, lighten, stripUnit } from 'polished';
import { ax } from '../../styles';

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
  color: ${ax('color.black')};
  font-family: ${ax('font.sansSerif')};
`;

const Header = styled.header`
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

export { Grid, Main, Header };
