import { GraphQLScalarType, Kind, GraphQLScalarTypeConfig } from 'graphql';

const validatePathLike = (value: string) => {
  return /^(\/(.|[\r\n])*|id:.*)|(rev:[0-9a-f]{9,})|(ns:[0-9]+(\/.*)?)$/.test(
    value,
  )
    ? value
    : null;
};

export const PathLike = new GraphQLScalarType({
  name: 'PathLike',
  description: 'A scalar indicating a path like input string',
  serialize: validatePathLike,
  parseValue: validatePathLike,
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) return validatePathLike(ast.value);
    return null;
  },
} as GraphQLScalarTypeConfig<number, number>);
