// @flow

import React from 'react';
import Layout from '../components/Layout';

export default () => (
  <Layout activeLink={'/nyhetsbrevet'} user={{ name: 'Adam Bergman' }}>
    <h1>Nyhetsbrevet</h1>
  </Layout>
);
