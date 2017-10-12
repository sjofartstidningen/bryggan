// @flow

import React from 'react';
import Layout from '../components/Layout';

export default () => (
  <Layout activeLink={'/'} user={{ name: 'Adam Bergman' }}>
    <h1>Hello world!</h1>
  </Layout>
);
