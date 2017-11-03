import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { join } from 'path';
import { connect } from 'react-redux';
import { filesDownloadUrl } from '../../../utils/api/dropbox';
import leftPad from '../../../utils/left-pad';
import MainTitle from '../components/MainTitle';
import SectionTitle from '../components/SectionTitle';
import PreviewsContainer from '../components/PreviewsContainer';
import PageThumbnail from '../components/PageThumbnail';
import Page from '../Page';
import config from '../../../config';

class IssueView extends Component {
  static propTypes = {
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
    dropboxAccessToken: PropTypes.string.isRequired,
  };

  state = {
    showPreview: null,
    translateTitle: 0,
  };

  showPreview = page => {
    this.setState(() => ({ showPreview: page }));
  };

  handleClose = () => this.setState(() => ({ showPreview: false }));
  handleTraverse = next => () => {
    this.setState(({ showPreview }) => {
      const nextPage = next
        ? Number.parseInt(showPreview, 10) + 1
        : Number.parseInt(showPreview, 10) - 1;

      return { showPreview: nextPage };
    });
  };

  generatePdfUrl = page => {
    const { year, issue, dropboxAccessToken } = this.props;
    const pdfPath = join(
      config.dropboxRoot,
      year,
      issue,
      `${year}-${issue}-${leftPad(page, 3, 0)}.pdf`,
    );

    const url = filesDownloadUrl({
      path: pdfPath,
      accessToken: dropboxAccessToken,
    });
    return url;
  };

  getTitleWidth = ref => {
    if (ref) {
      const { width } = ref.getBoundingClientRect();
      this.setState(() => ({ translateTitle: width }));
    }
  };

  render() {
    const { pages, year, issue, dropboxAccessToken } = this.props;
    const { showPreview, translateTitle } = this.state;

    return (
      <div>
        <MainTitle key="title">
          <span ref={this.getTitleWidth}>Tidningen</span>
        </MainTitle>

        <section key="pages" style={{ position: 'relative' }}>
          <SectionTitle translateTitle={translateTitle}>
            {[year, issue]}
          </SectionTitle>
          <PreviewsContainer bind>
            {pages &&
              pages.length > 0 &&
              pages.map((page, i) => (
                <PageThumbnail
                  key={page.id}
                  src={page.coverSrc}
                  description={`${i + 1}`}
                  alt={`Preview of page ${i + 1}`}
                  handleClick={() => this.showPreview(i + 1)}
                  dropboxAccessToken={dropboxAccessToken}
                />
              ))}
          </PreviewsContainer>
        </section>

        {showPreview && (
          <Page
            key="preview"
            pdfUrl={this.generatePdfUrl(showPreview)}
            page={`${showPreview}`}
            total={pages.length - 1}
            onClose={this.handleClose}
            onPrev={this.handleTraverse(false)}
            onNext={this.handleTraverse(true)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.tidningen.pages,
  dropboxAccessToken: state.auth.tokens.dropboxAccessToken,
});

export default connect(mapStateToProps)(IssueView);
