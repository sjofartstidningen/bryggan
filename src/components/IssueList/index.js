/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IsHovering from '../IsHovering';
import LazyImage from '../LazyImage';
import Loader from '../Loader';
import { Refresh } from '../Icon';
import {
  IssuesListWrapper,
  IssueListItem,
  IssueCover,
  IssueDesc,
  IssueShowIcon,
  IssueReloadButton,
} from './components';

class IssueList extends Component {
  static propTypes = {
    issues: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        coverSrc: PropTypes.string,
      }),
    ).isRequired,
    getIssueLink: PropTypes.func.isRequired,
    caption: PropTypes.func,
    keepPairs: PropTypes.bool,
  };

  static defaultProps = {
    caption: n => n,
    keepPairs: false,
  };

  render() {
    const { getIssueLink } = this.props;

    return (
      <IssuesListWrapper>
        {this.props.issues.map(issue => (
          <IsHovering
            id={`page-${issue.name}`}
            el={IssueListItem}
            key={issue.id}
            keepPairs={this.props.keepPairs}
            render={({ isHovering }) => (
              <Fragment>
                <LazyImage
                  src={issue.coverSrc}
                  render={({ loaded, src, revokeObjectURL, reload }) =>
                    loaded ? (
                      <div style={{ position: 'relative' }}>
                        <Link to={getIssueLink(issue)}>
                          <IssueCover
                            src={src}
                            alt={`Omslag till nummer ${issue.name}`}
                            onLoad={revokeObjectURL}
                          />
                        </Link>
                        <IssueReloadButton
                          isHovering={isHovering}
                          onClick={reload}
                        >
                          <Refresh />
                        </IssueReloadButton>
                      </div>
                    ) : (
                      <Loader ratio={480 / 372} />
                    )
                  }
                />
                <IssueDesc isHovering={isHovering} to={getIssueLink(issue)}>
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
