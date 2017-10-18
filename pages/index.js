// @flow

import React from 'react';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';
import Layout from '../components/Layout';

const Index = () => (
  <Layout activeLink={'/'} user={{ name: 'Adam Bergman' }}>
    <h1>Dashboard</h1>
  </Layout>
);

export default withRedux(initStore)(Index);
