import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionTitle from '../components/SectionTitle';
import PreviewsContainer from '../components/PreviewsContainer';
import PageThumbnail from '../components/PageThumbnail';

function IssueView({ pages, year, issue, translateTitle }) {
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

IssueView.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      path: PropTypes.string,
      updated_at: PropTypes.string,
      updated_by: PropTypes.string,
      coverSrc: PropTypes.string,
    }),
  ).isRequired,
  year: PropTypes.string.isRequired,
  issue: PropTypes.string.isRequired,
  translateTitle: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  ...state.tidningen.pages,
});

export default connect(mapStateToProps)(IssueView);
