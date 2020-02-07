import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
  IntrospectionResultData,
} from 'apollo-cache-inmemory';
import preval from 'preval.macro';

/**
 * In order to use union fragments together with Apollo a "fragment matcher" is
 * needed to get predictable results. We statically generate these values out
 * of the schema.
 *
 * We could use the full schema. But it unnecessarily large and we wont need it.
 * The reason for prebuilding it with the preval macro is just sugar. Probably
 * premature optimization, but it's fun. Right?
 *
 * @link https://graphql-code-generator.com/docs/plugins/fragment-matcher
 */
export const introspectionQueryResultData: IntrospectionResultData = preval`
  const schema = require('../../schema.json');
  const filteredTypes = schema.__schema.types.filter(
    type => type.possibleTypes !== null,
  );

  module.exports = { __schema: { types: filteredTypes } };
`;

export const createCache = (): InMemoryCache => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  });

  const cache = new InMemoryCache({ fragmentMatcher });
  return cache;
};
