/* eslint-disable react/no-array-index-key */
// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import YearHeader from './YearHeader';
import YearIssue from './YearIssue';
import type { Issue } from '../../../store/tidningen/types';
import { getIssues } from '../../../store/tidningen/actions';

type Props = {
  year: string,
  issues: Issue[],
  translateTitle: number,
  getIssues: (year: string) => void,
};

const PreviewsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: ${props => props.theme.size(0)}em;
  z-index: 1;
`;

class Year extends Component<Props, *> {
  componentDidMount() {
    if (this.props.issues.length < 1) this.props.getIssues(this.props.year);
  }

  render() {
    const { year, issues, translateTitle } = this.props;
    return (
      <section style={{ position: 'relative' }}>
        <YearHeader translateTitle={translateTitle}>{year}</YearHeader>

        <PreviewsContainer>
          {issues.length > 0
            ? issues.map(issue => <YearIssue key={issue.id} issue={issue} />)
            : Array.from({ length: 11 }).map((_, i) => <YearIssue key={i} />)}
        </PreviewsContainer>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { issues } = state.tidningen;

  if (!issues[props.year]) return { issues: [] };
  return { issues: issues[props.year] };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getIssues }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Year);
