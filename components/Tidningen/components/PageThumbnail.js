import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale } from 'polished';
import raf from 'raf-schd';
import transition from '../../../styles/transitions';
import Loader from '../../Loader';
import LazyImage from '../../LazyImage';

const IssueContainer = styled.button`
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  padding: 0;
  font-size: 1em;
  background-color: transparent;
  cursor: pointer;
  z-index: ${props => props.theme.zIndex.zero};

  &:hover,
  &:focus {
    z-index: ${props => props.theme.zIndex.middle};
    outline: none;
  }

  &:hover p,
  &:focus p {
    color: transparent;
  }

  &:hover p::after,
  &:focus p::after {
    transform: translateY(0);
  }

  &:hover > div,
  &:focus > div {
    border-color: ${props => props.theme.color.brand};
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  border: 1px solid ${props => props.theme.color.grey};
  border-radius: 0;
  padding-top: calc(100% * ${props => props.aspectRatio});
  overflow: hidden;
  ${transition('border')};
`;

ImgContainer.propTypes = {
  aspectRatio: PropTypes.number.isRequired,
};

const Img = styled(LazyImage)`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  ${transition('opacity', 'visibility')};
`;

Img.propTypes = {
  show: PropTypes.bool,
};

const Desc = styled.p`
  position: relative;
  margin: 0;
  margin-top: ${modularScale(-1)};
  font-family: ${props => props.theme.font.serif};
  font-size: ${modularScale(-1)};
  text-align: center;
  color: ${props => props.theme.color.grey};
  overflow: hidden;
  ${transition('color')};

  &::after {
    content: 'Visa';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: ${props => props.theme.color.brand};
    transform: translateY(100%);
    ${transition('transform')};
  }
`;

export default class PageThumbnail extends Component {
  state = {
    loading: true,
    aspectRatio: 211 / 164,
    blob: null,
  };

  static propTypes = {
    src: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    alt: PropTypes.string,
    handleClick: PropTypes.func,
  };

  static defaultProps = {
    alt: '',
    handleClick: () => undefined,
  };

  handleImgLoaded = raf(() => this.setState(() => ({ loading: false })));

  handleRef = ref => {
    const { width, height } = ref.getBoundingClientRect();
    this.setState(() => ({ aspectRatio: height / width }));
  };

  render() {
    const { src, description, alt, handleClick } = this.props;
    const { loading, aspectRatio } = this.state;

    return (
      <IssueContainer onClick={handleClick} disable={loading}>
        <ImgContainer aspectRatio={aspectRatio}>
          {src && (
            <Img
              src={src}
              alt={alt || ''}
              show={!loading}
              onLoad={this.handleImgLoaded}
              getRef={this.handleRef}
            />
          )}
          {loading && <Loader width="50%" />}
        </ImgContainer>
        <Desc>{description}</Desc>
      </IssueContainer>
    );
  }
}
