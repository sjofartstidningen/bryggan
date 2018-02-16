// @flow
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { typeMixin } from '../../styles/type';
import { colorMixin, backgroundColorMixin, getColor } from '../../styles/color';
import { transitionMixin } from '../../styles/utils';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  margin: 1rem;
  border: 2px solid transparent;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;

  ${typeMixin('ui')};
  ${colorMixin('inverse01')};
  ${backgroundColorMixin('brand01')};
  ${transitionMixin('background-color')};

  &:hover {
    ${backgroundColorMixin('brand02')};
  }

  ${p =>
    p.state &&
    css`
      ${backgroundColorMixin(p.state)};

      &:hover {
        background-color: ${lighten(0.1, getColor(p.state))};
      }
    `};

  ${p =>
    p.size === 'small' &&
    css`
      height: 2rem;
      padding: 0 0.625rem;
    `};

  ${p =>
    p.disabled &&
    css`
      ${backgroundColorMixin('text03')};
      cursor: default;

      &:hover {
        ${backgroundColorMixin('text03')};
      }
    `};
`;

export { Button };
