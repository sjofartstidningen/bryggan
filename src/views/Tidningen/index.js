// @flow
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { join } from 'path';
import padStart from 'lodash.padstart';
import dropbox from '../../api/dropbox';
import IssueList from '../../components/IssueList';
import Issue from '../Issue';
import { AreaMain } from '../../components/MainGrid';
import { Title, SubTitle } from '../../components/Typography';
import { compareBy } from '../../utils';
import type { Year, Issue as IssueType } from '../../types';

type Props = {
  match: Match,
};

type State = {
  years: Array<Year>,
};

class Tidningen extends Component<Props, State> {
  ref: ?HTMLDivElement;

  state = {
    years: [],
  };

  componentDidMount() {
    this.getIssues();
  }

  getIssues = async () => {
    const { data } = await dropbox.filesListFolder({ folder: '' });
    const { entries } = data;

    const { width } = this.ref ? this.ref.getBoundingClientRect() : {};
    const thumbnailSize = dropbox.getThumbnailSize(width / 4);

    entries.filter(e => e['.tag'] === 'folder').forEach(async year => {
      const { data: folderData } = await dropbox.filesListFolder({
        folder: year.name,
      });

      const mappedYear: Year = {
        name: year.name,
        id: year.id,
        issues: folderData.entries
          .map(issue => ({
            id: issue.id,
            name: issue.name,
            path: issue.path_lower,
            coverSrc: dropbox.getThumbUrl({
              file: `${year.name}/${issue.name}/${year.name}-${
                issue.name
              }-001.pdf`,
              size: thumbnailSize,
            }),
          }))
          .sort((a, b) => -compareBy('name')(a, b)),
      };

      this.setState(({ years }) => ({
        years: [...years, mappedYear].sort((a, b) => -compareBy('name')(a, b)),
      }));
    });
  };

  getIssueLink = (year: Year) => (issue: IssueType) => {
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
