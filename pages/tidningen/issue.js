// @flow
import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import styled, { css } from 'styled-components';
import { initStore } from '../../store';
import { getPages } from '../../store/tidningen/actions';

import StickyEvent from '../../components/StickyEvent';
import Link from '../../components/Link';
import Layout from '../../components/Layout';
import { H1 } from '../../components/Typography/headings';
import IssueView from '../../components/Tidningen/IssueView';

const Title = styled(H1)`
  border-bottom: 1px solid transparent;
  padding-bottom: 0.5rem;
  transition: border-color 0.3s ease-in-out;
  will-change: border-color;

  ${props =>
    props.stuck &&
    css`
      border-color: ${props.theme.color.grey};
    `};
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.color.grey};
  transition: color 0.3s ease-in-out;
  background-color: ${props => props.theme.color.white};

  &:hover {
    color: ${props => props.theme.color.black};
  }
`;

type State = {
  titleWidth: number,
};

class Issue extends Component<*, State> {
  static async getInitialProps({ query, store }) {
    const { year, issue } = query;
    const { pages } = store.getState().tidningen;

    if (pages && pages.year === year && pages.issue === issue) return {};

    await getPages(year, issue)(store.dispatch, store.getState);
    return {};
  }

  state = { titleWidth: 0 };

  getTitleWidth = (ref: ?HTMLElement): void => {
    if (ref != null) {
      const { width } = ref.getBoundingClientRect();
      this.setState(() => ({ titleWidth: width }));
    }
  };

  render() {
    const { year, issue } = this.props.url.query;
    return (
      <Layout title={`Nummer ${issue}-${year} – Bryggan`}>
        <StickyEvent
          style={{ zIndex: 3 }}
          render={({ stuck }) => (
            <Title stuck={stuck}>
              <TitleLink href="/tidningen">
                <span ref={this.getTitleWidth}>Tidningen</span>
              </TitleLink>
            </Title>
          )}
        />
        <IssueView translateTitle={this.state.titleWidth} />
      </Layout>
    );
  }
}

export default withRedux(initStore)(Issue);
