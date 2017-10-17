// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {
  src: string,
  description: string,
};

const ImgContainer = styled.div`
  display: inline-block;
  width: calc((100% - 3em) / 4);
  margin-right: 1em;
  margin-bottom: 1em;

  &:nth-child(4n) {
    margin-right: 0;
  }
`;

const Img = styled.img`
  display: block;
  max-width: 100%;
  border: 1px solid #999;
`;

const Desc = styled.p`
  margin: 0;
  margin-top: 0.5em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  font-size: 0.74em;
  text-align: center;
  color: #999;
`;

function YearImage({ src, description }: Props) {
  return (
    <ImgContainer>
      <Img src={src} alt={description} />
      <Desc>{description}</Desc>
    </ImgContainer>
  );
}

export default YearImage;

const Loading = styled.div`
  width: 100%;
  height: 0;
  padding-top: calc(100% * (275 / 210));
  background-color: #999;
`;

export function YearImageLoading({ description }: { description: string }) {
  return (
    <ImgContainer>
      <Loading />
      <Desc>{description}</Desc>
    </ImgContainer>
  );
}
