// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import raf from 'raf-schd';
import Router from 'next/router';
import Loader from '../../Loader';
import LazyImage from '../../LazyImage';
import type { Issue } from '../../../store/tidningen/types';

const IssueContainer = styled.button`
  display: inline-block;
  width: calc((100% - ${props => props.theme.size(0) * 3}em) / 4);
  margin-right: ${props => props.theme.size(0)}em;
  margin-bottom: ${props => props.theme.size(0)}em;
  border: none;
  border-radius: 0;
  padding: 0;
  font-size: 1em;
  background-color: transparent;
  cursor: pointer;
  z-index: 1;

  &:nth-child(4n) {
    margin-right: 0;
  }

  &:focus {
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
  padding-top: calc(100% * ${props => props.theme.pageAspectRatio});
  transition: border 0.3s ease-in-out;
`;

const Img = styled(LazyImage)`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  max-width: 100%;
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: all 0.3s ease-in-out;
`;

const ImgLoader = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5em;
  height: 5em;
  opacity: ${props => (props.show ? 1 : 0)};
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease-in-out;
`;

const IssueLink = styled.p`
  position: relative;
  margin: 0;
  margin-top: ${props => props.theme.size(-1)}em;
  font-family: ${props => props.theme.font.serif};
  font-size: ${props => props.theme.size(-1)}em;
  text-align: center;
  color: ${props => props.theme.color.grey};
  overflow: hidden;
  will-change: color;
  transition: color 0.3s ease-in-out;

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
    will-change: transform;
    transition: transform 0.3s ease-in-out;
  }
`;

type Props = { issue?: Issue };

type State = { loading: boolean };

export default class YearIssue extends Component<Props, State> {
  state = { loading: true };
  handleImgLoaded = raf(() => this.setState(() => ({ loading: false })));

  handleClick = () => {
    if (this.props.issue) {
      const { name, year } = this.props.issue;
      Router.push(
        {
          pathname: '/tidningen/issue',
          query: { year, issue: name },
        },
        `/tidningen/${year}/${name}`,
      );
    }
  };

  render() {
    const { issue } = this.props;
    const { loading } = this.state;

    return (
      <IssueContainer onClick={this.handleClick} disable={loading}>
        <ImgContainer>
          {issue && (
            <Img
              src={issue.coverSrc}
              alt={`Cover for issue #${issue.name}`}
              show={!loading}
              onLoad={this.handleImgLoaded}
            />
          )}
          <ImgLoader show={loading} />
        </ImgContainer>
        <IssueLink>
          {issue && !loading ? `Nummer ${issue.name}` : 'Laddar'}
        </IssueLink>
      </IssueContainer>
    );
  }
}
