import { toCamelCase, toSnakeCase } from 'strman';

export const transformKeys = <R extends Record<string, any>>(
  input: Record<string, any>,
  transformer: (key: string) => string,
): R => {
  const newObject: Record<string, any> = {};
  for (const key in input) {
    newObject[transformer(key)] = input[key];
  }

  return newObject as R;
};

export const transformValues = <I, O, R extends Record<string, O>>(
  input: Record<string, I>,
  transformer: (value: I) => O,
): R => {
  const newObject: Record<string, any> = {};
  for (const key in input) {
    newObject[key] = transformer(input[key]);
  }

  return newObject as R;
};

export const camelCaseKeys = <R extends Record<string, any>>(
  input: Record<string, any>,
): R => transformKeys(input, toCamelCase);

export const snakeCaseKeys = <R extends Record<string, any>>(
  input: Record<string, any>,
): R => transformKeys(input, toSnakeCase);

export const camelCaseValues = <
  R extends Record<string | number | symbol, string>
>(
  input: Record<string | number | symbol, string>,
): R => transformValues(input, toCamelCase);

export const snakeCaseValues = <
  R extends Record<string | number | symbol, string>
>(
  input: Record<string | number | symbol, string>,
): R => transformValues(input, toSnakeCase);
