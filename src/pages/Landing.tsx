import React from 'react';
import { useFolders } from '../hooks/use-graphql';
import { Folders_folders_edges } from '../types/graphql';

const Landing: React.FC = () => {
  const { data } = useFolders('/bryggan');
  const years = data && sortFolders(data.folders.edges);

  return (
    <div>
      <ul>
        {years &&
          years.map(folder => (
            <li key={folder.id}>
              {folder.name}
              <Year path={folder.id} />
            </li>
          ))}
      </ul>
    </div>
  );
};

const Year: React.FC<{ path: string }> = ({ path }) => {
  const { data } = useFolders(path);
  const issues = data && sortFolders(data.folders.edges);

  return (
    <div>
      <ul>
        {issues &&
          issues.map(issue => (
            <li key={issue.id}>
              {issue.name}
              {issue.thumbnail && <img src={issue.thumbnail.url} alt="" />}
            </li>
          ))}
      </ul>
    </div>
  );
};

const sortFolders = (folders: Folders_folders_edges[]) => {
  return folders
    .map(edge => edge.node)
    .sort((a, b) => -a.name.localeCompare(b.name));
};

export default Landing;
