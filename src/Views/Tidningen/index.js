import React, { Component } from 'react';
import styled from 'styled-components';
import { modularScale, lighten } from 'polished';
import IssueList from '../../components/IssueList';
import { listFolder, getThumbUrl } from '../../utils/dropbox';

const Main = styled.main`
  grid-area: main;
  padding: ${modularScale(1)};
  color: #1a1a1a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${modularScale(4)};
  font-weight: 400;
  letter-spacing: 0.03em;
  color: ${lighten(0.5, '#1a1a1a')};
`;

const SubTitle = styled.h2`
  position: sticky;
  top: 0;
  margin: 0;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  font-size: ${modularScale(1)};
  font-weight: 700;
  background-color: white;
`;

const sortNameDesc = list =>
  list.sort((a, b) => {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
  });

class Tidningen extends Component {
  state = { years: [] };

  componentDidMount() {
    this.fetchIssues();
  }

  fetchIssues = async () => {
    const { data } = await listFolder('', process.env.REACT_APP_DROPBOX_TOKEN);
    const { entries } = data;

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

  handleIssueClick = () => null;

  render() {
    const { years } = this.state;

    return (
      <Main>
        <Title>Tidningen</Title>
        {years.map(year => (
          <section key={year.id}>
            <SubTitle>{year.name}</SubTitle>
            <IssueList
              issues={year.issues}
              onIssueClick={this.handleIssueClick}
            />
          </section>
        ))}
      </Main>
    );
  }
}

export default Tidningen;
