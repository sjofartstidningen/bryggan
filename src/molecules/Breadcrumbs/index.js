// @flow
import React, { Fragment } from 'react';
import { matchPath } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import type {
  BreadcrumbsRoute,
  Breadcrumbs as BreadcrumbsType,
} from '../../types';
import {
  Wrapper,
  CrumbWrapper,
  Crumb,
  SubRouteIcon,
  SubRouteList,
  SubRouteListItem,
  SubRouteListItemLink,
  Icon,
} from './components';

type Props = {
  routes: BreadcrumbsType,
  location: Location,
};

function generateCrumbs(
  routes: BreadcrumbsType,
  location: Location,
): Array<{
  to: string,
  title: string,
  exact: boolean,
  routes?: Array<BreadcrumbsRoute>,
}> {
  const items = routes.reduce((acc, route) => {
    const match = matchPath(location.pathname, route);
    if (match == null) return acc;

    const title =
      typeof route.title === 'string' ? route.title : route.title(match.params);

    return [
      ...acc,
      { to: match.url, title, exact: match.isExact, routes: route.routes },
    ];
  }, []);

  return items;
}

function Breadcrumbs({ routes, location }: Props) {
  const crumbs = generateCrumbs(routes, location);

  return (
    <Wrapper>
      {crumbs.map(crumb => (
        <Fragment key={crumb.title}>
          <CrumbWrapper>
            <Crumb to={crumb.to} exact={crumb.exact}>
              {crumb.title}
            </Crumb>
            {crumb.routes && (
              <Fragment>
                <SubRouteIcon />
                <SubRouteList>
                  {crumb.routes.map(route => (
                    <SubRouteListItem key={route.path}>
                      <SubRouteListItemLink
                        to={route.path}
                        exact={route.path === crumb.to}
                      >
                        {route.title}
                      </SubRouteListItemLink>
                    </SubRouteListItem>
                  ))}
                </SubRouteList>
              </Fragment>
            )}
          </CrumbWrapper>
          <Icon />
        </Fragment>
      ))}
    </Wrapper>
  );
}

export default Breadcrumbs;
