// @flow
import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Layout from '../../components/Layout';
import MainTitle from '../../components/Tidningen/components/MainTitle';
import IssueView from '../../components/Tidningen/IssueView';

import { initStore } from '../../store';
import { getPages } from '../../store/tidningen/actions';

type State = {
  titleWidth: number,
};

class Issue extends Component<*, State> {
  static async getInitialProps({ query, store }) {
    const { year, issue } = query;
    const { pages } = store.getState().tidningen;

    if (pages && pages.year === year && pages.issue === issue) return {};

    await getPages(year, issue)(store.dispatch, store.getState);
    return {};
  }

  state = { titleWidth: 0 };

  getTitleWidth = (ref: ?HTMLElement): void => {
    if (ref != null) {
      const { width } = ref.getBoundingClientRect();
      this.setState(() => ({ titleWidth: width }));
    }
  };

  render() {
    const { year, issue } = this.props.url.query;
    return (
      <Layout title={`Nummer ${issue}-${year} – Bryggan`}>
        <MainTitle>
          <span ref={this.getTitleWidth}>Tidningen</span>
        </MainTitle>
        <IssueView translateTitle={this.state.titleWidth} />
      </Layout>
    );
  }
}

export default withRedux(initStore)(Issue);
