// @flow
import React from 'react';
import { matchPath } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import type { LinkItem, Route } from '../../types';
import { BreadcrumbsWrapper, Breadcrumb } from './components';

const generateCrumbs = (
  routes: Array<Route>,
  location: Location,
  skipLast?: boolean = false,
): Array<LinkItem> => {
  const items = routes.reduce((acc, route) => {
    const match = matchPath(location.pathname, route);
    if (match == null) return acc;

    const title =
      typeof route.title === 'string' ? route.title : route.title(match.params);

    return [
      ...acc,
      {
        to: match.url,
        title,
      },
    ];
  }, []);

  return items.slice(0, skipLast ? -1 : Infinity);
};

type Props = {
  routes: Array<Route>,
  location: Location,
  skipLast?: boolean,
  className?: string,
};

function Breadcrumbs({ routes, location, skipLast, className }: Props) {
  const breadcrumbs = generateCrumbs(routes, location, skipLast);
  const cname = ['breadcrumb', className].filter(Boolean).join(' ');

  return (
    breadcrumbs.length > 0 && (
      <BreadcrumbsWrapper className={cname}>
        {breadcrumbs.map(crumb => (
          <Breadcrumb key={crumb.to} to={crumb.to} className="breadcrumb-link">
            {crumb.title}
          </Breadcrumb>
        ))}
      </BreadcrumbsWrapper>
    )
  );
}

export { Breadcrumbs as default, generateCrumbs };
