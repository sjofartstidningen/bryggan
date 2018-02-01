import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { join } from 'path';
import padStart from 'lodash.padstart';
import { listFolder, getThumbnailSize, getThumbUrl } from '../../utils/dropbox';
import Page from '../Page';
import IssueList from '../../components/IssueList';
import { SubTitle, SubTitleLink } from '../../components/Typography';
import { ChevronsRight } from '../../components/Icon';
import { sortByName } from '../../utils';

class Issue extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        year: PropTypes.string.isRequired,
        issue: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    appData: PropTypes.shape({
      dropbox_token: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    pages: [],
  };

  componentDidMount() {
    this.getPages();
  }

  getPages = async () => {
    const dropboxToken = this.props.appData.dropbox_token;
    const { year, issue } = this.props.match.params;
    const { data } = await listFolder(join(year, issue), dropboxToken);

    const { width } = this.ref.getBoundingClientRect();
    const thumbnailSize = getThumbnailSize(width / 4);

    const newPages = data.entries.sort(sortByName).map((entry, i) => ({
      id: entry.id,
      name: `${i + 1}`,
      coverSrc: getThumbUrl(
        entry.path_lower.replace('/bryggan', ''),
        thumbnailSize,
        dropboxToken,
      ),
    }));

    const withoutLast =
      newPages.length % 2 === 1 ? newPages.slice(0, -1) : newPages;

    this.setState(({ pages }) => ({ pages: [...pages, ...withoutLast] }));
  };

  getIssueLink = page => {
    const { match } = this.props;
    return join(match.url, page.name);
  };

  render() {
    const { match, appData } = this.props;
    const { year, issue } = match.params;
    const pageLength = this.state.pages.length;
    const padLength = `${pageLength}`.length;

    return (
      <section
        ref={ref => {
          this.ref = ref;
        }}
      >
        <SubTitle>
          <SubTitleLink to={match.url.replace(/(\/\d+)+$/, '')}>
            {year}
          </SubTitleLink>
          <ChevronsRight baseline />
          <SubTitleLink to={match.url}>{issue}</SubTitleLink>
        </SubTitle>

        <Route
          path={match.url}
          exact
          render={() => (
            <IssueList
              issues={this.state.pages}
              caption={n => `${padStart(n, padLength, '0')}`}
              keepPairs
              getIssueLink={this.getIssueLink}
            />
          )}
        />

        <Route
          path={join(match.path, ':page')}
          exact
          render={props => (
            <Page {...props} totalPages={pageLength} appData={appData} />
          )}
        />
      </section>
    );
  }
}

export default Issue;
