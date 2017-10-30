import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filesDownloadUrl } from '../../../utils/api/dropbox';
import leftPad from '../../../utils/left-pad';
import SectionTitle from '../components/SectionTitle';
import PreviewsContainer from '../components/PreviewsContainer';
import PageThumbnail from '../components/PageThumbnail';
import PageView from '../PageView';
import ChevronsRight from '../../Icons/ChevronsRight';

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
    translateTitle: PropTypes.number.isRequired,
  };

  state = {
    showPreview: null,
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
    const { year, issue } = this.props;
    const pdfPath = `/Bryggan/${year}/${issue}/${year}-${issue}-${leftPad(
      page,
      3,
      0,
    )}.pdf`;

    const url = filesDownloadUrl({ path: pdfPath });
    return url;
  };

  render() {
    const { pages, year, issue, translateTitle } = this.props;
    const { showPreview } = this.state;

    return [
      <section key="pages" style={{ position: 'relative' }}>
        <SectionTitle translateTitle={translateTitle}>
          {year} <ChevronsRight baseline /> {issue}
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
              />
            ))}
        </PreviewsContainer>
      </section>,
      showPreview && (
        <PageView
          key="preview"
          pdfUrl={this.generatePdfUrl(showPreview)}
          page={`${showPreview}`}
          total={pages.length - 1}
          onClose={this.handleClose}
          onPrev={this.handleTraverse(false)}
          onNext={this.handleTraverse(true)}
        />
      ),
    ];
  }
}

const mapStateToProps = state => ({
  ...state.tidningen.pages,
});

export default connect(mapStateToProps)(IssueView);
