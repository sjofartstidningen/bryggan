// @flow
import React, { Component, Fragment } from 'react';
import { matchPath, Route } from 'react-router-dom';
import type { Location, Match } from 'react-router-dom';
import { AreaMain } from '../../components/MainGrid';
import MagazineHeader from './MagazineHeader';
import MagazineYears from './MagazineYears';

type Obj = { [x: string]: ?string };

type Props = {
  location: Location,
  match: Match,
};

type State = {};

class Magazine extends Component<Props, State> {
  routes = [
    { path: '/tidningen', title: 'Tidningen' },
    { path: '/tidningen/:year', title: ({ year }: Obj) => year || '' },
    {
      path: '/tidningen/:year/:issue',
      title: ({ issue }: Obj) => `Nummer ${issue || ''}`,
    },
    {
      path: '/tidningen/:year/:issue/:page',
      title: ({ page }: Obj) => `Sida ${page || ''}`,
    },
  ];

  getPageTitle = () => {
    const { pathname } = this.props.location;
    const match = matchPath(pathname, {
      path: '/tidningen/:year?/:issue?/:page?',
    });

    const params = match ? match.params : {};
    const title = (() => {
      if (params.page) return `Sida ${params.page}`;
      if (params.issue) return `Nummer ${params.issue}`;
      if (params.year) return params.year;
      return 'Tidningen';
    })();

    return title;
  };

  render() {
    const { location, match } = this.props;
    const title = this.getPageTitle();

    return (
      <Fragment>
        <MagazineHeader
          pageTitle={title}
          location={location}
          routes={this.routes}
        />
        <AreaMain>
          <Route
            path={match.url}
            exact
            render={props => <MagazineYears match={props.match} />}
          />
        </AreaMain>
      </Fragment>
    );
  }
}

export default Magazine;
