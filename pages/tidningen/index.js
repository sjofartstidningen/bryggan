// @flow
import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Layout from '../../components/Layout';
import MainTitle from '../../components/Tidningen/components/MainTitle';
import YearView from '../../components/Tidningen/YearView';

import { initStore } from '../../store';
import { getYears } from '../../store/tidningen/actions';

type State = {
  titleWidth: number,
};

class Tidningen extends Component<*, State> {
  static async getInitialProps({ store }) {
    const { tidningen } = store.getState();
    if (tidningen.years.length > 0) return {};

    await getYears()(store.dispatch, store.getState);
    return {};
  }

  state = {
    titleWidth: 0,
  };

  getTitleWidth = (ref: ?HTMLElement): void => {
    if (ref != null) {
      const { width } = ref.getBoundingClientRect();
      this.setState(() => ({ titleWidth: width }));
    }
  };

  render() {
    const { titleWidth } = this.state;

    return (
      <Layout title="Bryggan - Tidningen">
        <MainTitle>
          <span ref={this.getTitleWidth}>Tidningen</span>
        </MainTitle>
        <YearView translateTitle={titleWidth} />
      </Layout>
    );
  }
}

export default withRedux(initStore)(Tidningen);
