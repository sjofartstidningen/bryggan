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

const sortNameDesc = list =>
  list.sort((a, b) => {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
  });

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
    this.fetchIssues();
  }

  fetchIssues = async () => {
    const { data } = await listFolder('', process.env.REACT_APP_DROPBOX_TOKEN);
    const { entries } = data;

    const { width } = this.ref.getBoundingClientRect();
    const thumbnailSize = getThumbnailSize(width / 4);

    entries
      .filter(e => e['.tag'] === 'folder')
      .forEach(async ({ name, id }) => {
        const { data: folderData } = await listFolder(
          name,
          process.env.REACT_APP_DROPBOX_TOKEN,
        );

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
                process.env.REACT_APP_DROPBOX_TOKEN,
              ),
            })),
          ),
        };

        this.setState(({ years }) => ({
          years: sortNameDesc([...years, year]),
        }));
      });
  };

  handleIssueClick = year => ({ issue }) => {
    const { history, match } = this.props;
    history.push(join(match.url, year, issue.name));
  };

  render() {
    const { match } = this.props;
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
                  onIssueClick={this.handleIssueClick(year.name)}
                />
              </section>
            ))
          }
        />

        <Route
          path={join(match.url, ':year', ':issue')}
          render={props => <Issue {...props} />}
        />
      </Main>
    );
  }
}

export default Tidningen;
