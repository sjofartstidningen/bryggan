import { css, DefaultTheme } from 'styled-components';
import { shadow } from './theme';

export const truncate = () => css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

type TransitionProp =
  | string
  | [string]
  | [string, number]
  | [string, number, string];

export const transition = (...props: TransitionProp[]) => css`
  transition: ${props
    .map(prop => {
      if (typeof prop === 'string') return `${prop} 0.3s ease-in-out`;
      return `${prop[0]} ${prop[1] || '0.3'}s ${prop[2] || 'ease-in-out'}`;
    })
    .join(', ')};
`;

export const boxShadow = (key: keyof DefaultTheme['shadow']) => css`
  box-shadow: ${shadow(key)};
`;
