import React, { Component } from 'react';
import securePage from '../../hoc/securePage';
import MainTitle from '../../components/Tidningen/components/MainTitle';
import IssueView from '../../components/Tidningen/IssueView';
import { getPages } from '../../store/tidningen/actions';
import config from '../../config';

class Issue extends Component<*, State> {
  static async getInitialProps({ query, store }) {
    const { year, issue } = query;
    const { pages } = store.getState().tidningen;

    if (pages && pages.year === year && pages.issue === issue) return {};

    await getPages(year, issue)(store.dispatch, store.getState);
    return { title: `Nummer ${issue}-${year} – ${config.name}` };
  }

  state = { titleWidth: 0 };

  getTitleWidth = ref => {
    if (ref != null) {
      const { width } = ref.getBoundingClientRect();
      this.setState(() => ({ titleWidth: width }));
    }
  };

  render() {
    return [
      <MainTitle key="title">
        <span ref={this.getTitleWidth}>Tidningen</span>
      </MainTitle>,
      <IssueView key="view" translateTitle={this.state.titleWidth} />,
    ];
  }
}

export default securePage(Issue);
