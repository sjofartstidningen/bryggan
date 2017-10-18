// @flow
import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import Layout from '../../components/Layout';
import { H1 } from '../../components/Typography/headings';
import YearView from '../../components/Tidningen/YearView';

import { initStore } from '../../store';
import { getYears } from '../../store/tidningen/actions';

type State = {
  titleWidth: number,
};

class Tidningen extends Component<*, State> {
  static async getInitialProps({ store }) {
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
        <H1 style={{ position: 'sticky', top: 0, zIndex: 3 }}>
          <span ref={this.getTitleWidth} style={{ backgroundColor: '#fff' }}>
            Tidningen
          </span>
        </H1>
        <YearView translateTitle={titleWidth} />
      </Layout>
    );
  }
}

export default withRedux(initStore)(Tidningen);
