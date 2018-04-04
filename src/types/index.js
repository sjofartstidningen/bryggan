/* eslint-disable no-use-before-define */
// @flow
import type { Node } from 'react';
import type { ContextRouter } from 'react-router-dom';

export type GlobalRoute = {
  to: string,
  title: string,
  render: ContextRouter => Node,
};

export type PageEntry = {
  id: string,
  name: string,
  url: string,
  preview?: string,
};

export type BreadcrumbsRoute = {
  path?: string,
  title: string | ((params: { [x: string]: ?string }) => string),
  exact?: boolean,
  strict?: boolean,
  sensitive?: boolean,
};

export type Breadcrumb = BreadcrumbsRoute & {
  routes?: Array<BreadcrumbsRoute>,
};

export type Breadcrumbs = Array<Breadcrumb>;
