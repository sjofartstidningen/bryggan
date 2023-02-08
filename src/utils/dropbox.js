import { join } from 'path';
import qs from 'qs';

const apiRoot = 'https://api.dropboxapi.com/2/'; // eslint-disable-line
const contentRoot = 'https://content.dropboxapi.com/2/';

const getAbsolutePath = (path, rootFolder) =>
  path.toLowerCase().startsWith(rootFolder) ? path : join(rootFolder, path);

function generateDownloadUrl({ path, accessToken, rootFolder }) {
  const url = new URL('files/download', contentRoot);
  const authorization = `Bearer ${accessToken}`;
  const arg = JSON.stringify({
    path: getAbsolutePath(path, rootFolder),
  });
  const querystring = qs.stringify({ authorization, arg });

  return `${url.toString()}?${querystring}`;
}

function generatePreview({
  year,
  issue = '01',
  page = '001',
  id,
  accessToken,
  rootFolder,
}) {
  const url = new URL('files/get_thumbnail_v2', contentRoot);
  const authorization = `Bearer ${accessToken}`;
  const generateUrl = (path, size) =>
    `${url.toString()}?${qs.stringify({
      authorization,
      arg: JSON.stringify({
        resource: { '.tag': 'path', id },
        size,
        format: 'jpeg',
        mode: 'fitone_bestfit',
      }),
    })}`;

  const path = join(rootFolder, year, issue, `${year}-${issue}-${page}.pdf`);

  return {
    '32': generateUrl(path, 'w32h32'),
    '64': generateUrl(path, 'w64h64'),
    '128': generateUrl(path, 'w128h128'),
    '256': generateUrl(path, 'w256h256'),
    '480': generateUrl(path, 'w480h320'),
    '640': generateUrl(path, 'w640h480'),
    '960': generateUrl(path, 'w960h640'),
    '1024': generateUrl(path, 'w1024h768'),
    '2048': generateUrl(path, 'w2048h1536'),
  };
}

function getBestPreviewWidth(containerWidth) {
  const widths = [
    '32',
    '64',
    '128',
    '256',
    '480',
    '640',
    '960',
    '1024',
    '2048',
  ];
  const bestFit = widths.find(
    w =>
      Number.parseInt(w, 10) >= containerWidth * (window.devicePixelRatio || 1),
  );
  return bestFit || widths[widths.length - 1];
}

export { generateDownloadUrl, generatePreview, getBestPreviewWidth };
