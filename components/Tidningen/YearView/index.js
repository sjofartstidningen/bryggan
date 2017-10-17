// @flow
import React from 'react';
import styled from 'styled-components';
import YearHeader from './YearHeader';
import YearImage, { YearImageLoading } from './YearImage';
import Folder from '../../Dropbox/Folder';
import Thumbnail from '../../Dropbox/Thumbnail';

type Props = {
  years: Array<FileMetaData | FolderMetaData>,
  translateTitle: number,
};

const ImageContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 1em;
`;

function YearView({ years, translateTitle }: Props) {
  return (
    <div className="years">
      {years.length > 0 &&
        years.map(year => (
          <section key={year.id} style={{ position: 'relative' }}>
            <YearHeader translateTitle={translateTitle}>{year.name}</YearHeader>

            <ImageContainer>
              <Folder
                path={year.path_lower}
                render={({ entries: issues }) =>
                  issues.map(issue => {
                    const previewUrl = `${issue.path_lower}/${year.name}-${issue.name}-001.pdf`;
                    return (
                      <Thumbnail
                        key={issue.id}
                        path={previewUrl}
                        size="w640h480"
                        render={({ src }) => (
                          <YearImage
                            src={src}
                            description={`${year.name}/${issue.name}`}
                          />
                        )}
                        loading={() => (
                          <YearImageLoading
                            description={`${year.name}/${issue.name}`}
                          />
                        )}
                      />
                    );
                  })}
              />
            </ImageContainer>
          </section>
        ))}
    </div>
  );
}

export default YearView;
