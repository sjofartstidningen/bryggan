import React from 'react';
import { mount } from 'enzyme';
import IssueList from '../';
import { IssueListItem } from '../components';
import { WithContexts } from '../../../test-utils';

jest.mock('../../LazyImage', () => ({ src }) => <img src={src} alt="" />); // eslint-disable-line

describe('Component.IssueList', () => {
  test('should render list of issues', () => {
    const issues = Array.from({ length: 10 }).map((_, i) => ({
      id: `issue-${i}`,
      name: `issue-${i}`,
      coverSrc: `issue-${i}.jpg`,
    }));

    const getIssueLink = jest.fn(x => x.name);

    const wrapper = mount(
      <WithContexts>
        <IssueList issues={issues} getIssueLink={getIssueLink} />
      </WithContexts>,
    );

    const items = wrapper.find(IssueListItem);

    expect(items.length).toBe(issues.length);
  });
});
