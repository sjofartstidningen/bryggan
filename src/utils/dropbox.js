import { join } from 'path';
import axios from 'axios';
import qs from 'qs';

const dropboxApi = axios.create({
  baseURL: 'https://api.dropboxapi.com/2',
  headers: {
    'Content-Type': 'application/json',
  },
});

function getThumbUrl(file, size = 'w640h480', token) {
  const baseURL = 'https://content.dropboxapi.com/2/files/get_thumbnail';
  const params = {
    authorization: `Bearer ${token}`,
    arg: JSON.stringify({
      path: join('/bryggan', file),
      format: 'png',
      size,
    }),
  };

  return `${baseURL}?${qs.stringify(params)}`;
}

function getThumbnailSize(width, dpi = window.devicePixelRatio || 1) {
  const widths = {
    w32h32: { w: 32, h: 32 },
    w64h64: { w: 64, h: 64 },
    w128h128: { w: 128, h: 128 },
    w256h256: { w: 256, h: 256 },
    w480h320: { w: 480, h: 320 },
    w640h480: { w: 640, h: 480 },
    w960h640: { w: 960, h: 640 },
    w1024h768: { w: 1024, h: 768 },
    w2048h1536: { w: 2048, h: 1536 },
  };

  const actualWidth = width * dpi;

  const keys = Object.keys(widths);
  let i = 0;

  while (i < keys.length) {
    const key = keys[i];
    const { w } = widths[key];

    if (w >= actualWidth) return key;
    i += 1;
  }

  return keys[keys.length - 1];
}

function listFolder(folder, token, recursive = false) {
  return dropboxApi({
    url: '/files/list_folder',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      path: join('/bryggan', folder),
      recursive,
    },
  });
}

export { getThumbUrl, listFolder, getThumbnailSize };
