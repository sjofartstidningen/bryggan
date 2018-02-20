// @flow
import React, { Component, Fragment } from 'react';
import { matchPath, Route } from 'react-router-dom';
import type { Location, Match } from 'react-router-dom';
import { AreaMain } from '../../components/MainGrid';
import MagazineHeader from './MagazineHeader';
import MagazineList from './MagazineList';
import MagazinePage from './MagazinePage';

type Props = {
  location: Location,
  match: Match,
};

type State = {};

class Magazine extends Component<Props, State> {
  routes = [
    { path: '/tidningen', title: 'Tidningen' },
    { path: '/tidningen/:year', title: ({ year }: Object) => year || '' },
    {
      path: '/tidningen/:year/:issue',
      title: ({ issue }: Object) => issue || '',
    },
    {
      path: '/tidningen/:year/:issue/:page',
      title: ({ page }: Object) => page || '',
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

  stripRootUrl = (url: string = '/') => url.replace(this.props.match.url, '');

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
            path={`${match.url}/:year?/:issue?`}
            exact
            render={props => (
              <MagazineList
                folder={this.stripRootUrl(props.match.url)}
                match={props.match}
                pages={!!props.match.params && !!props.match.params.issue}
              />
            )}
          />

          <Route
            path={`${match.url}/:year/:issue/:page`}
            exact
            render={props => (
              <MagazinePage match={props.match} history={props.history} />
            )}
          />
        </AreaMain>
      </Fragment>
    );
  }
}

export default Magazine;
