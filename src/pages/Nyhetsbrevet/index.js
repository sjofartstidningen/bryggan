// @flow
import React, { Component } from 'react';
import type { Location } from 'react-router-dom';
import type { Breadcrumbs as BreadcrumbsType } from '../../types';
import ErrorMessage from '../../atoms/ErrorMessage';
import Breadcrumbs from '../../molecules/Breadcrumbs';
import { MainContentWrapper } from '../../molecules/Grid';

type Props = {
  location: Location,
};

type State = {
  breadcrumbs: BreadcrumbsType,
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
