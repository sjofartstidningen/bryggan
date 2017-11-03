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
    dropboxAccessToken: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { issues, year, dropboxAccessToken } = this.props;
    if (issues.length < 1) this.props.getIssues(year, dropboxAccessToken);
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
    const { year, issues, translateTitle, dropboxAccessToken } = this.props;

    return (
      <section style={{ position: 'relative' }}>
        <SectionTitle translateTitle={translateTitle}>{year}</SectionTitle>

        <PreviewsContainer>
          {issues.length > 0
            ? issues.map(issue => (
                <PageThumbnail
                  key={issue.id}
                  src={issue.coverSrc}
                  alt={`Nummer ${issue.name}`}
                  description={`Nummer ${issue.name}`}
                  handleClick={() => this.onPageClick(issue.name)}
                  dropboxAccessToken={dropboxAccessToken}
                />
              ))
            : Array.from({ length: 11 }).map((_, i) => (
                <PageThumbnail
                  key={i}
                  src={''}
                  description="Laddar"
                  handleClick={() => undefined}
                  dropboxAccessToken={dropboxAccessToken}
                />
              ))}
        </PreviewsContainer>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { tidningen, auth } = state;
  const { issues } = tidningen;
  const { dropboxAccessToken } = auth.tokens;

  if (!issues[props.year]) return { issues: [], dropboxAccessToken };
  return { issues: issues[props.year], dropboxAccessToken };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getIssues }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Year);
