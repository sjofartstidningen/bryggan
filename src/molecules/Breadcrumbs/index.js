import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';
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

function generateCrumbs(routes, location) {
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

function Breadcrumbs({ routes, location }) {
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

const BreadCrumbsRoute = {
  path: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  sensitive: PropTypes.bool,
};

Breadcrumbs.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      ...BreadCrumbsRoute,
      routes: PropTypes.arrayOf(PropTypes.shape(BreadCrumbsRoute)),
    }),
  ).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Breadcrumbs;
