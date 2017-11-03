import React, { Component } from 'react';
import securePage from '../../hoc/securePage';
import Year from '../../containers/Tidningen/Year';
import { getYears } from '../../store/tidningen/actions';
import config from '../../config';

class Tidningen extends Component<*, State> {
  static async getInitialProps({ store }) {
    const { tidningen, auth } = store.getState();
    if (tidningen.years.length < 1) {
      const { dropboxAccessToken } = auth.tokens;
      await getYears(dropboxAccessToken)(store.dispatch, store.getState);
    }

    return { title: `Tidningen – ${config.name}` };
  }

  // eslint-disable-next-line
  render() {
    return <Year />;
  }
}

export default securePage(Tidningen);
