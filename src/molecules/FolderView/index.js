import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { join } from 'path';
import { FilesListFolder } from '../../components/Fetch/dropbox';
import IsInView from '../../components/IsInView';
import PageGrid from '../PageGrid';
import { sortByName } from '../../utils';
import { getBestPreviewWidth } from '../../utils/dropbox';
import ErrorMessage from '../../atoms/ErrorMessage';

const getPlaceholderIssues = l =>
  Array.from({ length: l }, (_, i) => ({
    id: `${i}`,
    name: '-',
    path: '/',
    url: '#',
  }));

class FolderView extends PureComponent<Props, State> {
  static propTypes = {
    path: PropTypes.string.isRequired,
    baseUrl: PropTypes.string,
    expectedLength: PropTypes.number,
    issue: PropTypes.bool,
  };

  static defaultProps = {
    baseUrl: '/',
    expectedLength: 11,
    issue: false,
  };

  containerWidth = '640';

  ref;

  state = {};

  componentDidMount() {
    this.getContainerWidth();
  }

  handleRef = ref => {
    this.ref = ref;
  };

  getContainerWidth = () => {
    if (this.ref) {
      const { width } = this.ref.getBoundingClientRect();
      this.containerWidth = getBestPreviewWidth(width / 4);
    }
  };

  mapResponseToPages = response => {
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
                    pages={this.mapResponseToPages(response).sort((a, b) =>
                      issue ? sortByName(a, b) : -sortByName(a, b),
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
