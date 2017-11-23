import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { modularScale } from 'polished';
import raf from 'raf-schd';
import { Link } from 'react-router-dom';
import transition from '../../../styles/transitions';
import Loader from '../../../components/Loader';
import LazyImage from '../../../components/LazyImage';
import Eye from '../../../components/Icons/Eye';
import IsHovering from '../../../components/IsHovering';

const IssueContainer = styled(Link)`
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  padding: 0;
  font-size: 1em;
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
  z-index: ${props => props.theme.zIndex.zero};

  ${props =>
    props.hover &&
    css`
      z-index: ${props.theme.zIndex.middle};
      outline: none;
    `};
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

  ${props =>
    props.hover &&
    css`
      border-color: ${props.theme.color.brand};
    `};
`;

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

const Desc = styled.div`
  position: relative;
  margin: 0;
  margin-top: ${modularScale(-1)};
  font-family: ${props => props.theme.font.serif};
  font-size: ${modularScale(-1)};
  text-align: center;
  color: ${props => props.theme.color.grey};
  ${transition('color')};

  ${props =>
    props.hover &&
    css`
      color: ${props.theme.color.brand};
    `};
`;

const Icon = styled(Eye)`
  position: absolute;
  margin-left: ${modularScale(-2)};
  opacity: 0;
  transform: translate(100%, 0);
  ${transition('transform', 'opacity')};

  ${props =>
    props.hover &&
    css`
      opacity: 1;
      transform: translate(0, 0);
    `};
`;

export default class PageThumbnail extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    alt: PropTypes.string,
    dropboxAccessToken: PropTypes.string, // eslint-disable-line
  };

  static defaultProps = {
    alt: '',
  };

  state = {
    loading: true,
    aspectRatio: 211 / 164,
    focus: false,
  };

  handleImgLoaded = raf(() => this.setState(() => ({ loading: false })));

  handleRef = ref => {
    const { width, height } = ref.getBoundingClientRect();
    this.setState(() => ({ aspectRatio: height / width }));
  };

  handleFocus = focus => this.setState(() => ({ focus }));

  render() {
    const { to, src, description, alt, dropboxAccessToken } = this.props;
    const { loading, aspectRatio, focus } = this.state;

    return (
      <IsHovering>
        {({ hovering }) => (
          <IssueContainer
            to={to}
            onFocus={() => this.handleFocus(true)}
            onBlur={() => this.handleFocus(false)}
            disable={loading.toString()}
            hover={hovering || focus}
          >
            <ImgContainer aspectRatio={aspectRatio} hover={hovering || focus}>
              {src && (
                <Img
                  src={src}
                  alt={alt || ''}
                  show={!loading}
                  onLoad={this.handleImgLoaded}
                  getRef={this.handleRef}
                  dropboxAccessToken={dropboxAccessToken}
                />
              )}
              {loading && <Loader width="50%" />}
            </ImgContainer>
            <Desc hover={hovering || focus}>
              {description}
              <Icon baseline hover={hovering || focus} />
            </Desc>
          </IssueContainer>
        )}
      </IsHovering>
    );
  }
}
