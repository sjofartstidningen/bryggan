// @flow
import React, { PureComponent } from 'react';
import { join } from 'path';
import memoize from 'lodash.memoize';
import IsInView from '../../components/IsInView';
import PageGrid from '../../molecules/PageGrid';

const getWidth = memoize((container: number): number => {
  const widths = [32, 64, 128, 256, 480, 640, 960, 1024, 2048];
  const bestFit = widths.find(
    w => w >= container * (window.devicePixelRatio || 1),
  );
  return bestFit || widths[widths.length - 1];
});

const placeholderIssues = (l: number) =>
  // $FlowFixMe
  Array.from({ length: l }, (_, i) => ({
    id: `${i}`,
    name: '-',
    path: '/',
    url: '#',
  }));

type Preview = {
  '32': string,
  '64': string,
  '128': string,
  '256': string,
  '480': string,
  '640': string,
  '960': string,
  '1024': string,
  '2048': string,
};

type Entry = {
  type: 'year' | 'issue' | 'page',
  tag: 'file' | 'folder',
  id: string,
  name: string,
  url: string,
  modified?: string,
  src?: string,
  preview: Preview,
};

type Props = {
  baseUrl: string,
  expectedLength: number,
  push?: boolean,
  issues: Array<Entry>,
  fetchIssues: () => Promise<void>,
};

type State = {};

class IssueList extends PureComponent<Props, State> {
  containerWidth: number = 1000;
  ref: ?HTMLDivElement;

  componentDidMount() {
    this.getContainerWidth();
  }

  handleEnter = async () => {
    await this.props.fetchIssues();
  };

  handleRef = (ref: ?HTMLDivElement) => {
    if (ref) this.ref = ref;
  };

  getContainerWidth = () => {
    if (this.ref) {
      const { width } = this.ref.getBoundingClientRect();
      this.containerWidth = width;
    }
  };

  getIssues = () => {
    const { baseUrl, issues, expectedLength } = this.props;
    if (issues.length < 1) return placeholderIssues(expectedLength);

    const previewSize = getWidth(this.containerWidth / 4);

    const mappedIssues = issues.map(issue => ({
      id: issue.id,
      name: issue.name,
      url: join(baseUrl, issue.url),
      preview: issue.preview[`${previewSize}`],
    }));

    return mappedIssues;
  };

  render() {
    return (
      <IsInView onEnter={this.handleEnter}>
        {({ getRef }) => (
          <div
            ref={ref => {
              getRef(ref);
              this.handleRef(ref);
            }}
          >
            <PageGrid
              pages={this.getIssues()}
              push={this.props.push}
              ratio={2048 / 1589}
            />
          </div>
        )}
      </IsInView>
    );
  }
}

export { IssueList as default };
