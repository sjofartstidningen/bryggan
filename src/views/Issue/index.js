import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { join } from 'path';
import padStart from 'lodash.padstart';
import { listFolder, getThumbnailSize, getThumbUrl } from '../../utils/dropbox';
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

  handleIssueClick = () => null;

  render() {
    const { match } = this.props;
    const { year, issue } = match.params;
    const padLength = `${this.state.pages.length}`.length;

    return (
      <section
        ref={ref => {
          this.ref = ref;
        }}
      >
        <SubTitle>
          {year} <ChevronsRight baseline /> {issue}
        </SubTitle>
        <IssueList
          issues={this.state.pages}
          caption={n => `${padStart(n, padLength, '0')}`}
          keepPairs
          onIssueClick={this.handleIssueClick}
        />
      </section>
    );
  }
}

export default Issue;
