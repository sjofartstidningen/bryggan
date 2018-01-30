import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { modularScale, lighten } from 'polished';
import IsHovering from '../IsHovering';
import LazyImage from '../LazyImage';
import Loader from '../Loader';
import { Eye } from '../Icon';

const IssuesListWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: ${modularScale(1)};
`;

const IssueListItem = styled.button`
  width: calc(100% / 4 - ${p => (p.keepPairs ? 0.5 : 1)}rem);
  margin: 0 0.5rem 1rem;
  border: 1px solid ${lighten(0.8, '#1a1a1a')};
  padding: 0.5rem;
  font-size: 1em;
  background-color: transparent;
  transition: border-color 0.2s ease-in-out;

  ${p =>
    p.keepPairs &&
    css`
      &:nth-child(even) {
        margin-right: 0;
        margin-left: 0.5rem;
      }

      &:nth-child(odd) {
        margin-right: 0.5rem;
        margin-left: 0;
        border-left-color: transparent;
      }

      &:first-child {
        margin-left: calc(100% / 4);
        border-left-color: ${lighten(0.8, '#1a1a1a')};
      }
    `};

  &:hover {
    border-color: #0599e4;
  }
`;

const IssueCover = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const IssueDesc = styled.p`
  margin: 0;
  margin-top: 0.5rem;
  font-size: ${modularScale(-1)};
  text-align: center;
  color: ${p => (p.isHovering ? '#0599e4' : lighten(0.5, '#1a1a1a'))};
  transition: color 0.2s ease-in-out;
`;

const IssueShowIcon = styled(Eye)`
  position: absolute;
  margin-left: 5px;
  transform: translateY(100%);
  opacity: 0;
  transition transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  ${p =>
    p.isHovering &&
    css`
      transform: translateY(0);
      opacity: 1;
    `}  
`;

class IssueList extends Component {
  static propTypes = {
    issues: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        coverSrc: PropTypes.string,
      }),
    ).isRequired,
    onIssueClick: PropTypes.func.isRequired,
    caption: PropTypes.func,
    keepPairs: PropTypes.bool,
  };

  static defaultProps = {
    caption: n => n,
    keepPairs: false,
  };

  handleIssueClick = issue => e => {
    this.props.onIssueClick({
      ...e,
      issue,
    });
  };

  render() {
    return (
      <IssuesListWrapper>
        {this.props.issues.map(issue => (
          <IsHovering
            id={`page-${issue.name}`}
            el={IssueListItem}
            key={issue.id}
            keepPairs={this.props.keepPairs}
            onClick={this.handleIssueClick(issue)}
            render={({ isHovering }) => (
              <Fragment>
                <LazyImage
                  src={issue.coverSrc}
                  render={({ loaded, src }) => (
                    <Fragment>
                      {loaded ? (
                        <IssueCover
                          src={src}
                          alt={`Omslag till nummer ${issue.name}`}
                        />
                      ) : (
                        <Loader ratio={480 / 372} />
                      )}
                    </Fragment>
                  )}
                />
                <IssueDesc isHovering={isHovering}>
                  {this.props.caption(issue.name)}{' '}
                  <IssueShowIcon isHovering={isHovering} />
                </IssueDesc>
              </Fragment>
            )}
          />
        ))}
      </IssuesListWrapper>
    );
  }
}

export default IssueList;
