import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { join } from 'path';
import padStart from 'lodash.padstart';
import { listFolder, getThumbUrl, getThumbnailSize } from '../../utils/dropbox';
import IssueList from '../../components/IssueList';
import Issue from '../Issue'; // eslint-disable-line
import { Main } from '../../components/MainGrid';
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
    appData: PropTypes.shape({
      dropbox_token: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    years: [],
  };

  componentDidMount() {
    this.getIssues();
  }

  getIssues = async () => {
    const dropboxToken = this.props.appData.dropbox_token;
    const { data } = await listFolder('', dropboxToken);
    const { entries } = data;

    const { width } = this.ref.getBoundingClientRect();
    const thumbnailSize = getThumbnailSize(width / 4);

    entries
      .filter(e => e['.tag'] === 'folder')
      .forEach(async ({ name, id }) => {
        const { data: folderData } = await listFolder(name, dropboxToken);

        const year = {
          name,
          id,
          issues: sortNameDesc(
            folderData.entries.map(e => ({
              id: e.id,
              name: e.name,
              path: e.path_lower,
              coverSrc: getThumbUrl(
                `${name}/${e.name}/${name}-${e.name}-001.pdf`,
                thumbnailSize,
                dropboxToken,
              ),
            })),
          ),
        };

        this.setState(({ years }) => ({
          years: sortNameDesc([...years, year]),
        }));
      });
  };

  getIssueLink = year => issue => {
    const { match } = this.props;
    return join(match.url, year.name, issue.name);
  };

  render() {
    const { match, appData } = this.props;
    const { years } = this.state;

    return (
      <Main
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
          render={props => <Issue {...props} appData={appData} />}
        />
      </Main>
    );
  }
}

export default Tidningen;
