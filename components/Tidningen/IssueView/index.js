// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Page } from '../../../store/tidningen/types';
import PreviewsContainer from '../components/PreviewsContainer';
import PageThumbnail from '../components/PageThumbnail';

type Props = {
  pages: Page[],
};

function IssueView(props: Props) {
  const { pages } = props;
  return (
    <PreviewsContainer>
      {pages.length > 0 &&
        pages.map((page, i) => (
          <PageThumbnail
            bind
            src={page.coverSrc}
            description={`${i + 1}`}
            alt={page.name}
            handleClick={() => undefined}
          />
        ))}
    </PreviewsContainer>
  );
}

const mapStateToProps = state => ({
  pages: state.tidningen.pages.pages || [],
});

// $FlowFixMe
export default connect(mapStateToProps)(IssueView);
