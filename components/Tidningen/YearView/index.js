// @flow
import React from 'react';
import styled from 'styled-components';
import YearHeader from './YearHeader';
import YearIssue from './YearIssue';
import Folder from '../../Dropbox/Folder';

type Entry = FileMetaData | FolderMetaData;

type Props = {
  years: Array<Entry>,
  translateTitle: number,
};

const PreviewsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 1em;
  z-index: 1;
`;

function YearView({ years, translateTitle }: Props) {
  return (
    <div className="years">
      {years.length > 0 &&
        years.map(year => (
          <section key={year.id} style={{ position: 'relative' }}>
            <YearHeader translateTitle={translateTitle}>{year.name}</YearHeader>

            <PreviewsContainer>
              <Folder
                path={year.path_lower}
                render={({ entries: issues }) =>
                  issues.map(issue => (
                    <YearIssue
                      key={issue.id}
                      issue={issue}
                      yearName={year.name}
                    />
                  ))}
              />
            </PreviewsContainer>
          </section>
        ))}
    </div>
  );
}

export default YearView;
