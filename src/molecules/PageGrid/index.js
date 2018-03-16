// @flow
import React from 'react';
import type { MagazineEntry } from '../../types/magazine';
import LazyImage from '../../atoms/LazyImage';
import {
  Wrapper,
  Page,
  PageLink,
  Description,
  EyeIcon,
  RefreshButton,
  RefreshIcon,
} from './components';

type Props = {
  pages: Array<MagazineEntry>,
  push?: boolean,
  onRefreshClick?: ?(entry: MagazineEntry) => void | Promise<void>,
};

function PageGrid({ pages, push, onRefreshClick }: Props) {
  return (
    <Wrapper>
      {push && <Page />}
      {pages.map(page => (
        <Page key={page.id}>
          <PageLink to={page.url}>
            <LazyImage src={page.preview['32']} alt="" ratio={1} />
            <Description>
              <span>
                {page.name} <EyeIcon />
              </span>
            </Description>
          </PageLink>
          {onRefreshClick && (
            <RefreshButton onClick={() => onRefreshClick(page)}>
              <RefreshIcon />
            </RefreshButton>
          )}
        </Page>
      ))}
    </Wrapper>
  );
}

PageGrid.defaultProps = {
  push: false,
  onRefreshClick: null,
};

export { PageGrid as default };
