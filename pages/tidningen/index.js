import React, { Component } from 'react';
import securePage from '../../hoc/securePage';
import MainTitle from '../../components/Tidningen/components/MainTitle';
import YearView from '../../components/Tidningen/YearView';
import { getYears } from '../../store/tidningen/actions';
import config from '../../config';

class Tidningen extends Component<*, State> {
  static async getInitialProps({ store }) {
    const { tidningen } = store.getState();
    if (tidningen.years.length < 1) {
      await getYears()(store.dispatch, store.getState);
    }

    return { title: `Tidningen – ${config.name}` };
  }

  state = {
    titleWidth: 0,
  };

  getTitleWidth = ref => {
    if (ref != null) {
      const { width } = ref.getBoundingClientRect();
      this.setState(() => ({ titleWidth: width }));
    }
  };

  render() {
    const { titleWidth } = this.state;

    return [
      <MainTitle key="title">
        <span ref={this.getTitleWidth}>Tidningen</span>
      </MainTitle>,
      <YearView key="view" translateTitle={titleWidth} />,
    ];
  }
}

export default securePage(Tidningen);
