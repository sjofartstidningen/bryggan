// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Page } from '../../../store/tidningen/types';
import SectionTitle from '../components/SectionTitle';
import PreviewsContainer from '../components/PreviewsContainer';
import PageThumbnail from '../components/PageThumbnail';

type Props = {
  pages: Page[],
  year: string,
  issue: string,
  translateTitle: number,
};

function IssueView(props: Props) {
  const { pages, year, issue, translateTitle } = props;
  return (
    <section style={{ position: 'relative' }}>
      <SectionTitle translateTitle={translateTitle}>
        {`${year} > ${issue}`}
      </SectionTitle>
      <PreviewsContainer bind>
        {pages.length > 0 &&
          pages.map((page, i) => (
            <PageThumbnail
              key={page.id}
              src={page.coverSrc}
              description={`${i + 1}`}
              alt={`Preview of page ${i + 1}`}
              handleClick={() => undefined}
            />
          ))}
      </PreviewsContainer>
    </section>
  );
}

const mapStateToProps = state => ({
  ...state.tidningen.pages,
});

// $FlowFixMe
export default connect(mapStateToProps)(IssueView);
