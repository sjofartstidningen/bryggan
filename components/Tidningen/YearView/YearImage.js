// @flow
import React, { Component } from 'react';
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
  z-index: 1;

  &:nth-child(4n) {
    margin-right: 0;
  }
`;

const Loading = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: calc(100% * (275 / 210));
  background-color: ${props => (props.show ? '#999' : 'transparent')};
  transition: background 0.3s ease-in-out;
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  max-width: 100%;
  border: 1px solid #999;
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: all 0.3s ease-in-out;
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

export default class YearImage extends Component<Props, { loading: boolean }> {
  state = { loading: true };

  handleLoad = () => this.setState(() => ({ loading: false }));

  render() {
    const { src, description } = this.props;
    const { loading } = this.state;

    return (
      <ImgContainer>
        <Loading show={loading}>
          <Img src={src} show={!loading} onLoad={this.handleLoad} />
        </Loading>
        <Desc>{description}</Desc>
      </ImgContainer>
    );
  }
}

export function YearImageLoading({ description }: { description: string }) {
  return (
    <ImgContainer>
      <Loading />
      <Desc>{description}</Desc>
    </ImgContainer>
  );
}