import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../../atoms/ErrorMessage';
import Breadcrumbs from '../../molecules/Breadcrumbs';
import { MainContentWrapper } from '../../molecules/Grid';

class Nyhetsbrevet extends Component<Props, State> {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

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
