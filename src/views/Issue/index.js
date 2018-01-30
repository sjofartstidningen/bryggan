import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { join } from 'path';
import padStart from 'lodash.padstart';
import { listFolder, getThumbnailSize, getThumbUrl } from '../../utils/dropbox';
import Page from '../Page';
import IssueList from '../../components/IssueList';
import { SubTitle } from '../../components/Typography';
import { ChevronsRight } from '../../components/Icon';

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
  };

  state = {
    pages: [],
  };

  componentDidMount() {
    this.fetchPages();
  }

  fetchPages = async () => {
    const { year, issue } = this.props.match.params;
    const { data } = await listFolder(
      join(year, issue),
      process.env.REACT_APP_DROPBOX_TOKEN,
    );

    const { width } = this.ref.getBoundingClientRect();
    const thumbnailSize = getThumbnailSize(width / 4);

    const newPages = data.entries.map((entry, i) => ({
      id: entry.id,
      name: `${i + 1}`,
      coverSrc: getThumbUrl(
        entry.path_lower.replace('/bryggan', ''),
        thumbnailSize,
        process.env.REACT_APP_DROPBOX_TOKEN,
      ),
    }));

    const withoutLast =
      newPages.length % 2 === 1 ? newPages.slice(0, -1) : newPages;

    this.setState(({ pages }) => ({ pages: [...pages, ...withoutLast] }));
  };

  handleIssueClick = ({ issue: page }) => {
    const { match, history } = this.props;
    history.push(join(match.url, page.name));
  };

  render() {
    const { match } = this.props;
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
          {year} <ChevronsRight baseline /> {issue}
        </SubTitle>

        <Route
          path={match.url}
          exact
          render={() => (
            <IssueList
              issues={this.state.pages}
              caption={n => `${padStart(n, padLength, '0')}`}
              keepPairs
              onIssueClick={this.handleIssueClick}
            />
          )}
        />

        <Route
          path={join(match.path, ':page')}
          exact
          render={props => <Page {...props} totalPages={pageLength} />}
        />
      </section>
    );
  }
}

export default Issue;
