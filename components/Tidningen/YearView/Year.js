/* eslint-disable react/no-array-index-key */
// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import YearHeader from './YearHeader';
import PreviewsContainer from '../components/PreviewsContainer';
import PageThumbnail from '../components/PageThumbnail';
import type { Issue } from '../../../store/tidningen/types';
import { getIssues } from '../../../store/tidningen/actions';

type Props = {
  year: string,
  issues: Issue[],
  translateTitle: number,
  getIssues: (year: string) => void,
};

class Year extends Component<Props, *> {
  componentDidMount() {
    if (this.props.issues.length < 1) this.props.getIssues(this.props.year);
  }

  onPageClick = (issue: string) => {
    const { year } = this.props;
    Router.push(
      {
        pathname: '/tidningen/issue',
        query: { year, issue },
      },
      `/tidningen/${year}/${issue}`,
    );
  };

  render() {
    const { year, issues, translateTitle } = this.props;
    return (
      <section style={{ position: 'relative' }}>
        <YearHeader translateTitle={translateTitle}>{year}</YearHeader>

        <PreviewsContainer>
          {issues.length > 0
            ? issues.map(issue => (
                <PageThumbnail
                  key={issue.id}
                  src={issue.coverSrc}
                  alt={`Nummber ${issue.name}`}
                  description={`Nummber ${issue.name}`}
                  handleClick={() => this.onPageClick(issue.name)}
                />
              ))
            : Array.from({ length: 11 }).map((_, i) => (
                <PageThumbnail
                  key={i}
                  src={''}
                  description="Laddar"
                  handleClick={() => undefined}
                />
              ))}
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
