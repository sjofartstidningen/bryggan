export const untrailingSlash = (str: string) => str.replace(/\/$/, '');
export const unleadingSlash = (str: string) => str.replace(/^\//, '');

export const trailingSlash = (str: string) => `${untrailingSlash(str)}/`;
export const leadingSlash = (str: string) => `/${unleadingSlash(str)}`;
