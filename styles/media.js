import { css } from 'styled-components';

const sizes = {
  notSmall: '(min-width: 30em)',
  medium: '(min-width: 30em) and (max-width: 60em)',
  large: '(min-width: 60em) and (max-width: 120em)',
  xlarge: '(min-width: 120em)',
};

export default Object.keys(sizes).reduce((acc, label) => {
  return {
    ...acc,
    [label]: (...args) => css`
      @media screen and ${sizes[label]} {
        ${css(...args)};
      }
    `,
  };
}, {});
