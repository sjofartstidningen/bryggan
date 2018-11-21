import styled from 'styled-components';
import {
  applyStyleModifiers,
  styleModifierPropTypes,
} from 'styled-components-modifiers';
import { darken } from 'polished';
import { readableColor, fontSmoothing, transitions } from '../../theme/utils';

const applyBgColor = bg => `
  color: ${readableColor(bg)};
  background-color: ${bg};
  
  &:hover,
  &:active {
    background-color: ${darken(0.05, bg)};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const modifierConfig = {
  standard: ({ theme }) => `${applyBgColor(theme.color.grey)}`,
  brand: ({ theme }) => `${applyBgColor(theme.color.brand)}`,
  error: ({ theme }) => `${applyBgColor(theme.color.error)}`,
};

const Button = styled.button.attrs(props => ({
  modifiers: props.modifiers || ['standard'],
}))`
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
  user-select: none;
  white-space: nowrap;
  overflow: hidden;

  ${fontSmoothing};
  ${transitions.short('background-color')};
  ${applyStyleModifiers(modifierConfig)};

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 1px dotted ${({ theme }) => theme.color.white};
    outline-offset: -4px;
  }

  &:disabled {
    cursor: default;
  }
`;

Button.propTypes = {
  modifiers: styleModifierPropTypes(modifierConfig),
};

export { Button };
