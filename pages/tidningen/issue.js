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
  background-color: ${props => props.theme.color.white};
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

  &:hover {
    color: ${props => props.theme.color.black};
  }
`;

const Small = styled.small`
  font-size: ${props => props.theme.size(-1)}em;
  color: ${props => props.theme.color.black};
`;

class Issue extends Component<*, *> {
  static async getInitialProps(props) {
    const { query, store } = props;
    const { year, issue } = query;
    await getPages(year, issue)(store.dispatch, store.getState);
    return {};
  }

  render() {
    const { year, issue } = this.props.url.query;
    return (
      <Layout title={`Nummer ${issue}-${year} – Bryggan`}>
        <StickyEvent
          style={{ zIndex: 3 }}
          render={({ stuck }) => (
            <Title stuck={stuck}>
              <TitleLink href="/tidningen">Tidningen</TitleLink>{' '}
              <Small>
                &gt; {year} &gt; {issue}
              </Small>
            </Title>
          )}
        />
        <IssueView />
      </Layout>
    );
  }
}

export default withRedux(initStore)(Issue);
