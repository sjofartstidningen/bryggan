// @flow
import React from 'react';
import styled from 'styled-components';
import type { Location } from 'react-router-dom';
import { AreaHeader } from '../../components/MainGrid';
import { layerMixin } from '../../styles/utils';
import { typeMixin } from '../../styles/type';
import { colorMixin, backgroundColorMixin, getColor } from '../../styles/color';
import Breadcrumbs from '../../components/Breadcrumbs';
import type { Route } from '../../types';

const Wrapper = styled.div`
  padding: 4rem 12.5% 0;
  border-bottom: 1px solid ${getColor('brand01')};
  ${backgroundColorMixin('ui02')};
  ${layerMixin('overlay')};
  ${colorMixin('text01')};
`;

const PageTitle = styled.h1`
  margin: 0;
  padding-bottom: 1rem;
  text-transform: capitalize;
  ${typeMixin('giga')};
`;

type Props = {
  pageTitle: string,
  location: Location,
  routes: Array<Route>,
};

function Header({ pageTitle, location, routes }: Props = {}) {
  return (
    <AreaHeader>
      <Wrapper>
        <Breadcrumbs location={location} routes={routes} skipLast />
        <PageTitle>{pageTitle}</PageTitle>
      </Wrapper>
    </AreaHeader>
  );
}

export default Header;
