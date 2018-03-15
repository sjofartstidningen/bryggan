import React from 'react';
import styled from 'styled-components';
import { hideVisually } from 'polished';
import { Close } from '../../atoms/Icon';

const Container = styled.div.attrs({
  ratio: p => p.ratio || 1,
})`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: calc(100% * ${p => p.ratio});
`;

const HiddenImage = styled.img`
  ${hideVisually()};
`;

const DefaultErrorWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.error};
`;

function DefaultError() {
  return (
    <DefaultErrorWrapper>
      <Close />
    </DefaultErrorWrapper>
  );
}

export { Container, HiddenImage, DefaultError };
