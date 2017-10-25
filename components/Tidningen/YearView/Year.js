/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import SectionTitle from '../components/SectionTitle';
import PreviewsContainer from '../components/PreviewsContainer';
import PageThumbnail from '../components/PageThumbnail';
import { getIssues } from '../../../store/tidningen/actions';

class Year extends Component {
  static propTypes = {
    year: PropTypes.string.isRequired,
    issues: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        year: PropTypes.string,
        path: PropTypes.string,
        coverSrc: PropTypes.string,
      }),
    ).isRequired,
    translateTitle: PropTypes.number.isRequired,
    getIssues: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.issues.length < 1) this.props.getIssues(this.props.year);
  }

  onPageClick = issue => {
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
        <SectionTitle translateTitle={translateTitle}>{year}</SectionTitle>

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
