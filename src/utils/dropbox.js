import { join } from 'path';

const apiRoot = 'https://api.dropboxapi.com/2/'; // eslint-disable-line
const contentRoot = 'https://content.dropboxapi.com/2/';

const getAbsolutePath = (path, rootFolder) =>
  path.toLowerCase().startsWith(rootFolder) ? path : join(rootFolder, path);

function buildContentUrl({ path, arg, accessToken, pathRoot, selectedUser }) {
  const url = new URL(path, contentRoot);

  url.searchParams.set('authorization', `Bearer ${accessToken}`);
  url.searchParams.set(
    'path_root',
    JSON.stringify({ '.tag': 'root', root: pathRoot }),
  );
  url.searchParams.set('select_user', selectedUser);
  url.searchParams.set('arg', JSON.stringify(arg));

  return url;
}

function generateDownloadUrl({
  path,
  accessToken,
  rootFolder,
  pathRoot,
  selectedUser,
}) {
  return buildContentUrl({
    path: 'files/download',
    accessToken,
    pathRoot,
    selectedUser,
    arg: { path: getAbsolutePath(path, rootFolder) },
  }).toString();
}

function generatePreview({ id, accessToken, pathRoot, selectedUser }) {
  const generateUrl = size =>
    buildContentUrl({
      path: 'files/get_thumbnail_v2',
      accessToken,
      pathRoot,
      selectedUser,
      arg: {
        resource: { '.tag': 'path', id },
        size,
        format: 'jpeg',
        mode: 'fitone_bestfit',
      },
    }).toString();

  return {
    '32': generateUrl('w32h32'),
    '64': generateUrl('w64h64'),
    '128': generateUrl('w128h128'),
    '256': generateUrl('w256h256'),
    '480': generateUrl('w480h320'),
    '640': generateUrl('w640h480'),
    '960': generateUrl('w960h640'),
    '1024': generateUrl('w1024h768'),
    '2048': generateUrl('w2048h1536'),
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
