import * as re from './regex';

export const extractFileInfo = (
  fileName: string,
): { page: string; issue: string; year: string } => {
  const result = fileName.match(re.page());

  if (result && result[1] && result[2] && result[3]) {
    return { page: result[3], issue: result[2], year: result[1] };
  }

  throw new Error(`Could not extract data from filename ${fileName}`);
};

export const generateFileUrl = (fileName: string): string => {
  const { page, issue, year } = extractFileInfo(fileName);
  return `/${year}/${issue}/${page}`;
};
