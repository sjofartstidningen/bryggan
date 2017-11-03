import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';
import callInitialProps from '../utils/call-initial-props';
import Layout from '../components/Layout';
import config from '../config';

export default Page => {
  class Standard extends Component {
    static propTypes = {
      title: PropTypes.string,
    };

    static defaultProps = {
      title: `${config.name} – ${config.company}`,
    };

    static async getInitialProps(ctx) {
      const pageProps = await callInitialProps(Page, ctx);
      return { ...pageProps };
    }

    render() {
      return (
        <Layout title={this.props.title}>
          <Page {...this.props} />
        </Layout>
      );
    }
  }

  return withRedux(initStore)(Standard);
};
