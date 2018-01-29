import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    'header header header header'
    'main main main sidebar'
    'footer footer footer footer';
  width: 100vw;
  height: auto;
`;

export { Grid };
