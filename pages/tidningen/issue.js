import React, { Component } from 'react';
import securePage from '../../hoc/securePage';
import IssueView from '../../containers/Tidningen/Issue';
import { getPages } from '../../store/tidningen/actions';
import config from '../../config';

class Issue extends Component<*, State> {
  static async getInitialProps({ query, store }) {
    const { year, issue } = query;
    const { tidningen, auth } = store.getState();
    const { pages } = tidningen;
    const { dropboxAccessToken } = auth.tokens;

    if (pages && pages.year === year && pages.issue === issue) return {};

    await getPages(year, issue, dropboxAccessToken)(
      store.dispatch,
      store.getState,
    );

    return { title: `Nummer ${issue}-${year} – ${config.name}` };
  }

  // eslint-disable-next-line
  render() {
    return <IssueView />;
  }
}

export default securePage(Issue);
