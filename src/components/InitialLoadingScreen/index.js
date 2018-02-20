// @flow
import React from 'react';
import styled from 'styled-components';
import Loader from '../Loader';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  height: 100%;
  max-height: 100vh;
  background-color: white;
  z-index: 1;
`;

const LoaderContainer = styled.div`
  width: 100%;
  max-width: 100vmin;
  height: 100%;
  max-height: 100vmin;
`;

function InitialLoadingScreen() {
  return (
    <Wrapper>
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    </Wrapper>
  );
}

export default InitialLoadingScreen;
