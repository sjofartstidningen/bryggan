const yearBase = '\\d{4}';
const issueBase = '\\d{2}(?:(?: |-)(?:\\w| |-)*)*';
const pageBase = '\\d{3}';

const year = () => new RegExp(`^${yearBase}$`);
const issue = () => new RegExp(`^${issueBase}$`);
const page = () =>
  new RegExp(`^(${yearBase})-(${issueBase})-(${pageBase})\\.pdf$`);

const path = () =>
  /\/(\d{4})(?:\/)?(\d{2}(?:(?: |-)(?:\w| |-)*)*)?(?:\/)?(\d{4}-\d{2}(?:(?: |-)(?:\w| |-)*)*-\d{3})?/;

export { path, year, issue, page, yearBase, issueBase, pageBase };
