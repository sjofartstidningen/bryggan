// @flow

import React from 'react';
import Layout from '../../components/Layout';

const Nyhetsbrevet = () => (
  <Layout activeLink={'/nyhetsbrevet'} user={{ name: 'Adam Bergman' }}>
    <h1>Nyhetsbrevet</h1>
  </Layout>
);

Nyhetsbrevet.getInitialProps = () =>
  new Promise(resolve => setTimeout(() => resolve({}), 5000));

export default Nyhetsbrevet;
