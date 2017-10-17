// @flow
import React from 'react';
import styled from 'styled-components';
import { filesGetThumbnailSrc } from '../../../utils/api/dropbox';
import YearHeader from './YearHeader';
import YearImage from './YearImage';
import Folder from '../../Dropbox/Folder';

type Props = {
  years: Array<FileMetaData | FolderMetaData>,
  translateTitle: number,
};

const ImagesContainer = styled.div`
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

            <ImagesContainer>
              <Folder
                path={year.path_lower}
                render={({ entries: issues }) =>
                  issues.map(issue => {
                    const previewPath = `${issue.path_lower}/${year.name}-${issue.name}-001.pdf`;
                    const src = filesGetThumbnailSrc({
                      path: previewPath,
                      format: 'jpeg',
                      size: 'w640h480',
                    });

                    return (
                      <YearImage
                        key={issue.id}
                        src={src}
                        description={`${year.name}/${issue.name}`}
                      />
                    );
                  })}
              />
            </ImagesContainer>
          </section>
        ))}
    </div>
  );
}

export default YearView;
