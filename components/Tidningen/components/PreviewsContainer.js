// @flow
import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: ${props => props.theme.size(0)}em;
  z-index: 1;
`;
