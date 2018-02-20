// @flow
import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { Match, RouterHistory } from 'react-router-dom';
import padStart from 'lodash.padstart';
import { CancelToken, isCancel } from 'axios';
import type { CancelTokenSource } from 'axios';
import { clamp } from '../../utils';
import dropbox from '../../api/dropbox';
import InitialLoadingScreen from '../../components/InitialLoadingScreen';

type DocumentProps = {
  file: File | string | { url: string, data: any, httpHeaders: Object },
  children: React$Node,
  className?: string,
  error?: React$Node,
  inputRef?: (ref: ?HTMLElement) => mixed,
  loading?: React$Node,
  noData?: React$Node,
  onItemClick?: (page: ?Object) => void,
  onLoadError?: (error: Error) => void,
  onLoadSuccess?: (pdf: Object) => void,
  onSourceError?: (error: Error) => void,
  onSourceSuccess?: () => void,
  rotate?: number,
};

type PageProps = {
  className?: string,
  inputRef?: (ref: ?HTMLElement) => mixed,
  onLoadError?: (error: Error) => void,
  onLoadSuccess?: (pdf: Object) => void,
  onRenderError?: (error: Error) => void,
  onRenderSuccess?: () => void,
  onGetAnnotationsError?: (error: Error) => void,
  onGetAnnotationsSuccess?: (annotations: any) => void,
  onGetTextError?: (error: Error) => void,
  onGetTextSuccess?: (items: any) => void,
  pageIndex?: number,
  pageNumber?: number,
  renderAnnotations?: boolean,
  renderTextLayer?: boolean,
  rotate?: number,
  scale?: number,
  width?: number,
};

type Props = {
  match: Match,
  history: RouterHistory,
};

type State = {
  dependecies: boolean,
  loading: boolean,
  src: ?string,
  zoomLevel: number,
  error: ?string,
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
  overflow: scroll;
`;

class MagazinePage extends PureComponent<Props, State> {
  Document: ComponentType<DocumentProps>;
  Page: ComponentType<PageProps>;
  cancelToken: CancelTokenSource;

  state = {
    dependecies: false,
    loading: true,
    src: null,
    zoomLevel: 1,
    error: null,
  };

  componentDidMount() {
    this.fetchDependecies();
    this.fetchPdf();

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.match.url !== this.props.match.url) this.fetchPdf();
  }

  componentWillUnmount() {
    this.cancelRequest();
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  fetchDependecies = async () => {
    const { Document, Page, setOptions } = await import('react-pdf');
    this.Document = Document;
    this.Page = Page;

    setOptions({
      workerSrc: 'https://unpkg.com/pdfjs-dist@2.0.303/build/pdf.worker.min.js',
    });

    this.setState(() => ({ dependecies: true }));
  };

  fetchPdf = async () => {
    this.cancelRequest();

    try {
      this.cancelToken = CancelToken.source();
      this.setState(() => ({ loading: true, src: null, error: null }));

      const file = this.getFilePath();
      const { data } = await dropbox.filesDownload({
        file,
        cancelToken: this.cancelToken.token,
      });
      const src = URL.createObjectURL(data);

      this.setState(() => ({ src }));
    } catch (err) {
      if (!isCancel(err)) {
        this.setState(() => ({
          error: 'Kunde inte hämta sidan',
          loading: false,
        }));
      }
    }
  };

  cancelRequest = () => {
    if (this.cancelToken) this.cancelToken.cancel('Cancelling request');
  };

  handleKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 37:
        this.transitionPage(-1);
        break;
      case 39:
        this.transitionPage(1);
        break;
      case 48:
        this.zoomPage();
        break;
      case 187:
        this.zoomPage(0.1);
        break;
      case 189:
        this.zoomPage(-0.1);
        break;
      default:
    }
  };

  getFilePath = () => {
    const { match } = this.props;
    const { params } = match;
    const year = params.year || '';
    const issue = params.issue || '';
    const page = params.page || '';

    const path = `/${year}/${issue}/${year}-${issue}-${page}.pdf`;
    return path;
  };

  transitionPage = (next: number) => {
    const { match, history } = this.props;
    const { params } = match;
    const page = params.page || '';

    const currentPage = Number.parseInt(page || '0', 10);
    const nextPage = clamp(0, 100, currentPage + next);

    const nextUrl = match.url.replace(/(\d{3})$/, padStart(nextPage, 3, '0'));
    history.replace(nextUrl);
  };

  zoomPage = (next?: number) => {
    const nextZoomLevel = clamp(0.1, 5, next ? this.state.zoomLevel + next : 1);
    this.setState(() => ({ zoomLevel: nextZoomLevel }));
  };

  handleRenderSuccess = () => {
    this.setState(() => ({ loading: false }));
    if (this.state.src != null) URL.revokeObjectURL(this.state.src);
  };

  render() {
    const { Document, Page } = this;
    const { dependecies, loading, src, zoomLevel, error } = this.state;

    return (
      <Fragment>
        {loading && <InitialLoadingScreen />}
        <PageWrapper>
          {dependecies &&
            src && (
              <Document file={src}>
                <Page
                  pageNumber={1}
                  scale={zoomLevel}
                  onRenderSuccess={this.handleRenderSuccess}
                />
              </Document>
            )}
          {error && <p>{error}</p>}
        </PageWrapper>
      </Fragment>
    );
  }
}

export default MagazinePage;
