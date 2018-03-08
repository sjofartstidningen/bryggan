// @flow
import styled from 'styled-components';
import {
  applyStyleModifiers,
  styleModifierPropTypes,
} from 'styled-components-modifiers';
import { darken, timingFunctions } from 'polished';
import { readableColor, fontSmoothing } from '../../theme/utils';

const applyBgColor = (bg: string) => `
  color: ${readableColor(bg)};
  background-color: ${bg};
  
  &:hover,
  &:active {
    background-color: ${darken(0.05, bg)};
  }
`;

const modifierConfig = {
  standard: ({ theme }) => `${applyBgColor(theme.color.grey)}`,
  brand: ({ theme }) => `${applyBgColor(theme.color.brand)}`,
  error: ({ theme }) => `${applyBgColor(theme.color.error)}`,
};

const Button = styled.button.attrs({
  modifiers: props => props.modifiers || ['standard'],
})`
  margin: 0;
  margin-right: ${({ theme }) => theme.margin.standard};
  border: 0;
  border-radius: 4px;
  padding: 0 ${({ theme }) => theme.margin.extra};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.typeSize.label};
  font-weight: ${({ theme }) => theme.weight.normal};
  line-height: ${({ theme }) => theme.lineHeight.double};
  text-align: center;
  vertical-align: middle;
  text-transform: capitalize;
  transition: background-color 0.2s ${timingFunctions('easeInOutCubic')};
  user-select: none;
  white-space: nowrap;
  overflow: hidden;

  ${fontSmoothing};
  ${applyStyleModifiers(modifierConfig)};

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 1px dotted ${({ theme }) => theme.color.white};
    outline-offset: -4px;
  }
`;

Button.propTypes = {
  modifiers: styleModifierPropTypes(modifierConfig),
};

export { Button };
