import styled from 'styled-components';
import { modularScale } from 'polished';

const Wrapper = styled.div`
  position: relative;
  z-index: ${props => props.theme.zIndex.zero};
`;

const Container = styled.div`
  position: relative;
  width: 100vw;
  max-width: 44rem;
  margin: 0 auto;
  padding: ${modularScale(0)};
  font-size: ${modularScale(0)};
  z-index: ${props => props.theme.zIndex.middle};
`;

export { Container, Wrapper };
