// @flow
import React from 'react';

const serializer = (k, v) => {
  if (v == null) return 'null/undefined';

  const valueType = typeof v;
  switch (valueType) {
    case 'function':
      return `[function] ${v.name}`.trim();
    default:
      return v;
  }
};

function PreProps(props: any) {
  return <pre>{JSON.stringify(props, serializer, 2)}</pre>;
}

export { PreProps as default };
