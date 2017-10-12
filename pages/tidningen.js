// @flow

import React from 'react';
import Layout from '../components/Layout';

export default () => (
  <Layout activeLink={'/tidningen'} user={{ name: 'Adam Bergman' }}>
    <h1>Tidningen</h1>
  </Layout>
);
