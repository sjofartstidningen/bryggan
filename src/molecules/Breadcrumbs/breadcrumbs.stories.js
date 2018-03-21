/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import Breadcrumbs from './index';

class Wrapper extends Component<*, *> {
  state = {
    path: '/blog/2018/123456',
  };

  routes = [
    { path: '/:root', title: ({ root }: Object) => root },
    {
      path: '/:root/:year',
      title: ({ year }: Object) => year,
      routes: [
        { path: '/blog/2015', title: '2015' },
        { path: '/blog/2016', title: '2016' },
        { path: '/blog/2017', title: '2017' },
        { path: '/blog/2018', title: '2018' },
      ],
    },
    {
      path: '/:root/:year/:id',
      title: ({ id }: Object) => id,
      routes: [
        { path: '/blog/2018/123', title: '123' },
        { path: '/blog/2018/456', title: '456' },
        { path: '/blog/2018/789', title: '789' },
        { path: '/blog/2018/012', title: '012' },
      ],
    },
  ];

  handleChange = (e: any) => {
    const { value } = e.target;
    this.setState(() => ({ path: value }));
  };

  render() {
    const { path } = this.state;
    const location = { pathname: path, search: '', hash: '' };
    return (
      <div>
        <Breadcrumbs location={location} routes={this.routes} />
        <input
          type="text"
          value={path}
          onChange={this.handleChange}
          style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}
        />
      </div>
    );
  }
}

storiesOf('molecules/Breadcrumbs', module).add('standard', () => <Wrapper />);
