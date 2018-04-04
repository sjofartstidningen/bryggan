// @flow
import React, { PureComponent } from 'react';
import { join } from 'path';
import { FilesListFolder } from '../../components/Fetch/dropbox';
import IsInView from '../../components/IsInView';
import PageGrid from '../PageGrid';
import type {
  MappedListFolderResponse,
  PreviewWidth,
} from '../../types/dropbox';
import { sortByName } from '../../utils';
import { getBestPreviewWidth } from '../../utils/dropbox';
import ErrorMessage from '../../atoms/ErrorMessage';
import type { PageEntry } from '../../types';

const getPlaceholderIssues = (l: number) =>
  Array.from({ length: l }, (_, i) => ({
    id: `${i}`,
    name: '-',
    path: '/',
    url: '#',
  }));

type Props = {
  path: string,
  baseUrl: string,
  expectedLength: number,
  issue: boolean,
};

type State = {};

class FolderView extends PureComponent<Props, State> {
  static defaultProps = {
    baseUrl: '/',
    expectedLength: 11,
    issue: false,
  };

  containerWidth: PreviewWidth = '640';
  ref: ?HTMLDivElement;
  state = {};

  componentDidMount() {
    this.getContainerWidth();
  }

  handleRef = (ref: ?HTMLDivElement) => {
    this.ref = ref;
  };

  getContainerWidth = () => {
    if (this.ref) {
      const { width } = this.ref.getBoundingClientRect();
      this.containerWidth = getBestPreviewWidth(width / 4);
    }
  };

  mapResponseToPages = (
    response: ?MappedListFolderResponse,
  ): Array<PageEntry> => {
    const { path, baseUrl, expectedLength } = this.props;

    if (response) {
      return response.reduce(
        (acc, entry) => [
          ...acc,
          {
            ...entry,
            url: join(baseUrl, path, entry.name),
            preview: entry.previews[this.containerWidth],
          },
        ],
        [],
      );
    }

    return getPlaceholderIssues(expectedLength);
  };

  render() {
    const { path, issue } = this.props;
    return (
      <IsInView>
        {({ getRef, inView }) => (
          <FilesListFolder path={path} shouldFetch={inView}>
            {({ response, error }) => {
              if (error)
                return (
                  <ErrorMessage
                    message={`Kunde inte hitta sidor för ${path}`}
                  />
                );

              return (
                <div
                  ref={ref => {
                    getRef(ref);
                    this.handleRef(ref);
                  }}
                >
                  <PageGrid
                    pages={this.mapResponseToPages(response).sort(
                      (a, b) => (issue ? sortByName(a, b) : -sortByName(a, b)),
                    )}
                    ratio={2048 / 1589}
                    push={issue}
                  />
                </div>
              );
            }}
          </FilesListFolder>
        )}
      </IsInView>
    );
  }
}

export { FolderView as default };
