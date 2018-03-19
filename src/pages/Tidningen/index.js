// @flow
import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import type { Location } from 'react-router-dom';
import type { MagazineYear } from '../../types/magazine';
import type { Route } from '../../types';
import MagazineContainer from '../../states/MagazineContainer';
import { sortByName } from '../../utils';
import ProgressBar from '../../atoms/ProgressBar';
import Breadcrumbs from '../../molecules/Breadcrumbs';

type WithSubroutes = {
  routes?: Array<Route>,
};

type Routes = Array<Route & WithSubroutes>;

type Props = {
  location: Location,
  fetchAllYears: () => Promise<void>,
  years: Array<MagazineYear>,
  fetching: boolean,
};

type State = {
  state: 'loading' | 'loaded',
  breadcrumbs: Routes,
};

class Tidningen extends Component<Props, State> {
  state = {
    state: 'loading',
    breadcrumbs: [
      { path: '/:root', title: 'Tidningen' },
      { path: '/:root/:year', title: ({ year }: Object) => year },
      { path: '/:root/:year/:issue', title: ({ issue }: Object) => issue },
    ],
  };

  componentDidMount() {
    this.props.fetchAllYears();
  }

  componentDidUpdate() {
    const state = this.props.fetching ? 'loading' : 'loaded';
    if (state !== this.state.state) this.setState(() => ({ state })); // eslint-disable-line
  }

  render() {
    const { years, location } = this.props;
    const { state, breadcrumbs } = this.state;

    return (
      <div>
        <Breadcrumbs location={location} routes={breadcrumbs} />
        {state === 'loading' && <ProgressBar delay={1000} />}
        {state === 'loaded' &&
          years
            .sort((a, b) => -sortByName(a, b))
            .map(year => <h1 key={year.id}>{year.name}</h1>)}
      </div>
    );
  }
}

function Wrapped({ location }: { location: Location }) {
  return (
    <Subscribe to={[MagazineContainer]}>
      {magazine => (
        <Tidningen
          location={location}
          fetchAllYears={magazine.fetchAllYears}
          years={magazine.state.years}
          fetching={magazine.isFetching()}
        />
      )}
    </Subscribe>
  );
}

export { Wrapped as default };
