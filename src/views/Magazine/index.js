// @flow
import React, { Component, Fragment } from 'react';
import { matchPath, Route } from 'react-router-dom';
import type { Location, Match } from 'react-router-dom';
import { AreaMain } from '../../components/MainGrid';
import MagazineHeader from './MagazineHeader';
import MagazineList from './MagazineList';

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
      title: ({ issue }: Obj) => issue || '',
    },
    {
      path: '/tidningen/:year/:issue/:page',
      title: ({ page }: Obj) => page || '',
    },
  ];

  getPageTitle = () => {
    const { pathname } = this.props.location;
    const match = matchPath(pathname, {
      path: '/tidningen/:year?/:issue?/:page?',
    });

    const params = match ? match.params : {};
    const title = (() => {
      if (params.page) return params.page;
      if (params.issue) return params.issue;
      if (params.year) return params.year;
      return 'Tidningen';
    })();

    return title;
  };

  stripRootUrl = (path: string = '/') => {
    const { url } = this.props.match;
    return path.replace(url, '');
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
            render={props => (
              <MagazineList
                folder={this.stripRootUrl(props.match.url)}
                match={props.match}
              />
            )}
          />

          <Route
            path={`${match.url}/:year`}
            exact
            render={props => (
              <MagazineList
                folder={this.stripRootUrl(props.match.url)}
                match={props.match}
              />
            )}
          />

          <Route
            path={`${match.url}/:year/:issue`}
            exact
            render={props => (
              <MagazineList
                folder={this.stripRootUrl(props.match.url)}
                match={props.match}
                pages
              />
            )}
          />
        </AreaMain>
      </Fragment>
    );
  }
}

export default Magazine;
