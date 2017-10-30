import React from 'react';
import styled from 'styled-components';
import Loader from '../../Loader';

const Container = styled.div`
  width: 100%;
  height: 0px;
  border: 1px solid ${props => props.theme.color.white};
  padding: 0;
  padding-top: calc(100% * ${props => props.theme.pageAspectRatio});
`;

export default () => (
  <Container>
    <Loader width="10%" />
  </Container>
);
