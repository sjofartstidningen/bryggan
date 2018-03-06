// @flow

const yearStr = '\\d{4}';
const issueStr = '\\d{2}(?:(?: |-)(?:\\w| |-)*)*';
const pageStr = '\\d{3}';

const year = () => new RegExp(`^${yearStr}$`);
const issue = () => new RegExp(`^${issueStr}$`);
const page = () =>
  new RegExp(`^(${yearStr})-(${issueStr})-(${pageStr})\\.pdf$`);

export { year, issue, page };
