// @flow
import React, { Component } from 'react';
import type { Location } from 'react-router-dom';
import type { Route as RouteType } from '../../types';
import ErrorMessage from '../../atoms/ErrorMessage';
import Breadcrumbs from '../../molecules/Breadcrumbs';
import { MainContentWrapper } from '../../molecules/Grid';

type WithSubroutes = {
  routes?: Array<RouteType>,
};

type Routes = Array<RouteType & WithSubroutes>;

type Props = {
  location: Location,
};

type State = {
  breadcrumbs: Routes,
};

class Nyhetsbrevet extends Component<Props, State> {
  state = {
    breadcrumbs: [{ path: '/:root', title: 'Nyhetsbrevet' }],
  };

  render() {
    const { location } = this.props;
    const { breadcrumbs } = this.state;
    return (
      <MainContentWrapper>
        <Breadcrumbs location={location} routes={breadcrumbs} />
        <ErrorMessage message="Funktionaliteten för /nyhetsbrevet är inte klar ännu. Men snart förhoppningsvis 😬" />
      </MainContentWrapper>
    );
  }
}

export { Nyhetsbrevet as default };
