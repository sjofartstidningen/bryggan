import React from 'react';
import PropTypes from 'prop-types';
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

function PageGrid({ pages, push, onRefreshClick, ratio }) {
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

PageGrid.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      preview: PropTypes.string,
    }),
  ),
  push: PropTypes.bool,
  onRefreshClick: PropTypes.func,
  ratio: PropTypes.number,
};

PageGrid.defaultProps = {
  push: false,
  onRefreshClick: null,
  ratio: 1,
};

export { PageGrid as default };
