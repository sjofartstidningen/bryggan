// @flow
import React, { PureComponent } from 'react';
import { join } from 'path';
import memoize from 'lodash.memoize';
import IsInView from '../../components/IsInView';
import PageGrid from '../../molecules/PageGrid';
import type { MagazinePagePreview } from '../../types/magazine';

const getWidth = memoize((container: number): number => {
  const widths = [32, 64, 128, 256, 480, 640, 960, 1024, 2048];
  const bestFit = widths.find(
    w => w >= container * (window.devicePixelRatio || 1),
  );
  return bestFit || widths[widths.length - 1];
});

const placeholderIssues = (l: number) =>
  Array.from({ length: l }, (_, i) => ({
    id: `${i}`,
    name: '-',
    path: '/',
    url: '#',
  }));

type Props = {
  baseUrl: string,
  expectedLength: number,
  push?: boolean,
  issues: Array<{
    id: string,
    name: string,
    path: string,
    url: string,
    preview: MagazinePagePreview,
  }>,
  fetchIssues: () => Promise<void>,
};

type State = {};

class IssueList extends PureComponent<Props, State> {
  handleEnter = async () => {
    await this.props.fetchIssues();
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
          <div ref={getRef}>
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
