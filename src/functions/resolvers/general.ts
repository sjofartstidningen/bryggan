import { GraphQLScalarType, Kind, GraphQLScalarTypeConfig } from 'graphql';
import { IResolvers, UserInputError } from 'apollo-server-lambda';
import { GraphQLContext } from '../ts/types';

const pathRegex = /^(\/(.|[\r\n])*|id:.*)|(rev:[0-9a-f]{9,})|(ns:[0-9]+(\/.*)?)$/;

const validatePathLike = (value: unknown): string => {
  if (typeof value === 'string' && pathRegex.test(value)) return value;
  throw new UserInputError(
    'A PathLike value must match the pattern "^(/(.|[\r\n])*|id:.*)|(rev:[0-9a-f]{9,})|(ns:[0-9]+(/.*)?)$"',
  );
};

/**
 * Paths in the Dropbox API are a bit special. First of all they are _case
 * insensitive_ as long as they are regular paths with a leading slash, e.g.
 * `"/Root/child/a.doc" === "/rOOT/CHILD/A.DOC"`.
 *
 * But the in many use cases, like when listing entries in a folder or fetching
 * a thumbnail an id, rev or namespace can be used in place of a regular path.
 *
 * The above versions are _case sensitive_.
 *
 * The scalar `PathLike` will validate against the same regular expression as
 * Dropbox uses to verify that the "path like" is correct.
 *
 * @link https://www.dropbox.com/developers/documentation/http/documentation#path-formats
 */
export const PathLike = new GraphQLScalarType({
  name: 'PathLike',
  description: 'A scalar indicating a path like input string',
  serialize: validatePathLike,
  parseValue: validatePathLike,
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) return validatePathLike(ast.value);
    return null;
  },
} as GraphQLScalarTypeConfig<string, string>);

const general: IResolvers<any, GraphQLContext> = {
  PathLike,
};

export default general;
