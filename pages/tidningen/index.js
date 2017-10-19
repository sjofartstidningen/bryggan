// @flow
import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import styled, { css } from 'styled-components';
import Layout from '../../components/Layout';
import { H1 } from '../../components/Typography/headings';
import YearView from '../../components/Tidningen/YearView';
import StickyEvent from '../../components/StickyEvent';

import { initStore } from '../../store';
import { getYears } from '../../store/tidningen/actions';

const Title = styled(H1)`
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease-in-out;
  will-change: border-color;

  ${props =>
    props.stuck &&
    css`
      border-color: ${props.theme.color.grey};
    `};
`;

const TitleSpan = styled.span`
  display: inline-block;
  padding-bottom: 0.5rem;
  background-color: ${props => props.theme.color.white};
`;

type State = {
  titleWidth: number,
};

class Tidningen extends Component<*, State> {
  static async getInitialProps({ store }) {
    const { tidningen } = store.getState();
    if (tidningen.years.length > 0) return {};

    await getYears()(store.dispatch, store.getState);
    return {};
  }

  state = {
    titleWidth: 0,
  };

  getTitleWidth = (ref: ?HTMLElement): void => {
    if (ref != null) {
      const { width } = ref.getBoundingClientRect();
      this.setState(() => ({ titleWidth: width }));
    }
  };

  render() {
    const { titleWidth } = this.state;

    return (
      <Layout title="Bryggan - Tidningen">
        <StickyEvent
          style={{ zIndex: 3 }}
          render={({ stuck }) => (
            <Title stuck={stuck}>
              <TitleSpan innerRef={this.getTitleWidth}>Tidningen</TitleSpan>
            </Title>
          )}
        />

        <YearView translateTitle={titleWidth} />
      </Layout>
    );
  }
}

export default withRedux(initStore)(Tidningen);
