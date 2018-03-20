import React from 'react';
import styled, { css } from 'styled-components';
import { hideVisually } from 'polished';
import { Img as _Img } from '../../atoms/Image';
import { Close } from '../../atoms/Icon';
import { fadeIn } from '../../theme/animations';

const Container = styled.div.attrs({
  ratio: p => p.ratio || null,
})`
  position: relative;
  width: 100%;
  height: auto;

  ${p =>
    p.ratio &&
    css`
      height: 0;
      padding-bottom: calc(100% * ${p.ratio});
    `};
`;

const Img = _Img.extend`
  ${fadeIn};
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

export { Container, Img, HiddenImage, DefaultError };
