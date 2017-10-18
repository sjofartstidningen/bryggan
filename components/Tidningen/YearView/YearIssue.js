// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import raf from 'raf-schd';
import Loader from '../../Loader';
import type { Issue } from '../../../store/tidningen/types';

const IssueContainer = styled.div`
  display: inline-block;
  width: calc((100% - ${props => props.theme.size(0) * 3}em) / 4);
  margin-right: ${props => props.theme.size(0)}em;
  margin-bottom: ${props => props.theme.size(0)}em;
  z-index: 1;

  &:nth-child(4n) {
    margin-right: 0;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  border: 1px solid ${props => props.theme.color.grey};
  padding-top: calc(100% * ${props => props.theme.pageAspectRatio});
`;

const Img = styled.img`
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

const Desc = styled.p`
  margin: 0;
  margin-top: ${props => props.theme.size(-1)}em;
  font-family: ${props => props.theme.font.serif};
  font-size: ${props => props.theme.size(-1)}em;
  text-align: center;
  color: ${props => props.theme.color.grey};
`;

type Props = { issue?: Issue };

type State = { loading: boolean };

export default class YearIssue extends Component<Props, State> {
  state = { loading: true };
  handleImgLoaded = raf(() => this.setState(() => ({ loading: false })));

  render() {
    const { issue } = this.props;
    const { loading } = this.state;

    return (
      <IssueContainer>
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
        <Desc>{issue && !loading ? `Nummer ${issue.name}` : 'Laddar'}</Desc>
      </IssueContainer>
    );
  }
}
