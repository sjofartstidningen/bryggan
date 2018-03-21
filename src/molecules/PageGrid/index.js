// @flow
import React from 'react';
import LazyImage from '../../atoms/LazyImage';
import {
  Wrapper,
  Page,
  PageLink,
  Description,
  Placeholder,
  EyeIcon,
  RefreshButton,
  RefreshIcon,
} from './components';

type PageEntry = {
  id: string,
  name: string,
  url: string,
  preview?: string,
};

type Props = {
  pages: Array<PageEntry>,
  push?: boolean,
  onRefreshClick?: ?(entry: PageEntry) => void | Promise<void>,
  ratio?: number,
};

function PageGrid({ pages, push, onRefreshClick, ratio }: Props) {
  return (
    <Wrapper>
      {push && <Page />}
      {pages.map(page => (
        <Page key={page.id}>
          <PageLink to={page.url}>
            {page.preview ? (
              <LazyImage src={page.preview} alt="" ratio={ratio} />
            ) : (
              <Placeholder ratio={ratio} />
            )}
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
  ratio: 1,
};

export { PageGrid as default };
