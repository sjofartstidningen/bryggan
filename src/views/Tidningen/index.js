import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { join } from 'path';
import padStart from 'lodash.padstart';
import dropbox from '../../api/dropbox';
import IssueList from '../../components/IssueList';
import Issue from '../Issue';
import { AreaMain } from '../../components/MainGrid';
import { Title, SubTitle } from '../../components/Typography';
import { sortByName } from '../../utils';

const sortNameDesc = list => list.sort((a, b) => -sortByName(a, b));

class Tidningen extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  state = {
    years: [],
  };

  componentDidMount() {
    this.getIssues();
  }

  getIssues = async () => {
    const { data } = await dropbox.filesListFolder({ folder: '' });
    const { entries } = data;

    const { width } = this.ref.getBoundingClientRect();
    const thumbnailSize = dropbox.getThumbnailSize(width / 4);

    entries.filter(e => e['.tag'] === 'folder').forEach(async year => {
      const { data: folderData } = await dropbox.filesListFolder({
        folder: year.name,
      });

      const mappedYear = {
        name: year.name,
        id: year.id,
        issues: sortNameDesc(
          folderData.entries.map(issue => ({
            id: issue.id,
            name: issue.name,
            path: issue.path_lower,
            coverSrc: dropbox.getThumbUrl({
              file: `${year.name}/${issue.name}/${year.name}-${
                issue.name
              }-001.pdf`,
              size: thumbnailSize,
            }),
          })),
        ),
      };

      this.setState(({ years }) => ({
        years: sortNameDesc([...years, mappedYear]),
      }));
    });
  };

  getIssueLink = year => issue => {
    const { match } = this.props;
    return join(match.url, year.name, issue.name);
  };

  render() {
    const { match } = this.props;
    const { years } = this.state;

    return (
      <AreaMain
        innerRef={ref => {
          this.ref = ref;
        }}
      >
        <Title>Tidningen</Title>

        <Route
          path={match.url}
          exact
          render={() =>
            years.map(year => (
              <section key={year.id}>
                <SubTitle>{year.name}</SubTitle>
                <IssueList
                  issues={year.issues}
                  caption={n => `Nummer ${padStart(n, 2, '0')}`}
                  getIssueLink={this.getIssueLink(year)}
                />
              </section>
            ))
          }
        />

        <Route
          path={join(match.url, ':year', ':issue')}
          render={props => <Issue {...props} />}
        />
      </AreaMain>
    );
  }
}

export default Tidningen;
