import { toCamelCase, toSnakeCase } from 'strman';

const isObject = (value: unknown): value is Record<string, any> => {
  return typeof value === 'object' && value !== null;
};

export const transformKeys = <R extends Record<string, any>>(
  input: Record<string, any>,
  transformer: (key: string) => string,
): R => {
  const newObject: Record<string, any> = {};
  for (const key in input) {
    let value = input[key];
    if (isObject(value)) {
      value = transformKeys(value, transformer);
    }
    newObject[transformer(key)] = value;
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
