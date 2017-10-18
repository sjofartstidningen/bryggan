// @flow

import React from 'react';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../../store';
import Layout from '../../components/Layout';

const Nyhetsbrevet = () => (
  <Layout activeLink={'/nyhetsbrevet'} user={{ name: 'Adam Bergman' }}>
    <h1>Nyhetsbrevet</h1>
  </Layout>
);

export default withRedux(initStore)(Nyhetsbrevet);
