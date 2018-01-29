import path from 'path';
import axios from 'axios';
import qs from 'qs';

const dropboxApi = axios.create({
  baseURL: 'https://api.dropboxapi.com/2',
  headers: {
    'Content-Type': 'application/json',
  },
});

function getThumbUrl(file, token) {
  const baseURL = 'https://content.dropboxapi.com/2/files/get_thumbnail';
  const params = {
    authorization: `Bearer ${token}`,
    arg: JSON.stringify({
      path: path.join('/bryggan', file),
      format: 'png',
      size: 'w640h480',
    }),
  };

  return `${baseURL}?${qs.stringify(params)}`;
}

function listFolder(folder, token, recursive = false) {
  return dropboxApi({
    url: '/files/list_folder',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      path: path.join('/bryggan', folder),
      recursive,
    },
  });
}

export { getThumbUrl, listFolder };
