import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { join } from 'path';
import styled from 'styled-components';
import { lighten } from 'polished';
import padStart from 'lodash.padstart';
import axios, { CancelToken } from 'axios';
import { downloadFile } from '../../utils/dropbox';
import Loader from '../../components/Loader';
import PageController from '../../components/PageController';

const DocumentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(44rem * ${p => p.zoom});
  max-width: 100%;
  margin: 0 auto;
  border: 1px solid ${lighten(0.8, '#1a1a1a')};
  padding: 1em;
`;

class IssuePage extends Component {
  static propTypes = {
    totalPages: PropTypes.number.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        year: PropTypes.string.isRequired,
        issue: PropTypes.string.isRequired,
        page: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    appData: PropTypes.shape({
      dropbox_token: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    src: null,
    ready: false,
    loading: true,
    width: 0,
    zoom: 1,
  };

  componentDidMount() {
    this.getWrapperWidth();
    this.getDependecies();
    this.getPdf();
  }

  componentDidUpdate(nextProps) {
    const { page: nextPage } = nextProps.match.params;
    const { page: currentPage } = this.props.match.params;

    if (nextPage !== currentPage) {
      this.cancelToken.cancel('Download next pdf');
      this.getPdf();
    }
  }

  componentWillUnmount() {
    this.cancelToken.cancel('Leaving preview');
  }

  getWrapperWidth = () => {
    if (this.ref) {
      const { width } = this.ref.getBoundingClientRect();
      this.setState(() => ({ width: width - 32 }));
    }
  };

  getPdf = async () => {
    this.setState(() => ({ loading: true }));
    const { year, issue, page } = this.props.match.params;
    const dropboxToken = this.props.appData.dropbox_token;

    const file = join(
      year,
      issue,
      `${year}-${issue}-${padStart(page, 3, '0')}.pdf`,
    );

    this.cancelToken = CancelToken.source();
    try {
      const { src } = await downloadFile(
        file,
        dropboxToken,
        this.cancelToken.token,
      );

      this.setState(() => ({ src, loading: false }));
    } catch (err) {
      if (!axios.isCancel(err)) console.error(err); // eslint-disable-line
    }
  };

  getDependecies = async () => {
    const { Document, Page, setOptions } = await import('react-pdf');
    this.Document = styled(Document)`
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    this.Page = styled(Page)`
      margin: 0 auto;
    `;

    setOptions({
      workerSrc: 'https://unpkg.com/pdfjs-dist@2.0.303/build/pdf.worker.min.js',
    });

    this.setState(() => ({ ready: true }));
  };

  handlePageTransition = add => () => {
    const { match, history, totalPages } = this.props;
    const { path } = match;
    const { year, issue, page } = match.params;

    const currentPage = Number.parseInt(page, 10);
    const nextPage = currentPage + add;

    if (nextPage < 1 || nextPage > totalPages) return;

    const nextUrl = path
      .replace(':year', year)
      .replace(':issue', issue)
      .replace(':page', `${nextPage}`);

    history.replace(nextUrl);
  };

  handleZoom = add => () => {
    const nextZoom = this.state.zoom + add;
    if (nextZoom < 0.1 || nextZoom > 5) return;
    this.setState(() => ({ zoom: nextZoom }));
  };

  handleZoomReset = () => {
    this.setState(() => ({ zoom: 1 }));
  };

  render() {
    const { match, totalPages } = this.props;
    const { page } = match.params;
    const { src, ready, loading, width, zoom } = this.state;

    return (
      <Fragment>
        <DocumentWrapper
          zoom={zoom}
          innerRef={ref => {
            this.ref = ref;
          }}
        >
          {!ready || loading ? (
            <Loader ratio={480 / 372} />
          ) : (
            <this.Document file={src}>
              <this.Page pageNumber={1} width={width * zoom} />
            </this.Document>
          )}
        </DocumentWrapper>

        <PageController
          currentPage={page}
          totalPages={totalPages}
          onNextPage={this.handlePageTransition(1)}
          onPrevPage={this.handlePageTransition(-1)}
          onZoomIncrease={this.handleZoom(0.2)}
          onZoomDecrease={this.handleZoom(-0.2)}
          onZoomReset={this.handleZoomReset}
        />
      </Fragment>
    );
  }
}

export default IssuePage;
