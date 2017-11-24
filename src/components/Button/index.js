import styled, { css } from 'styled-components';
import { modularScale, darken } from 'polished';
import transition from '../../styles/transitions';

const Button = styled.button.attrs({
  color: props => props.theme.color.white,
  bgColor: props => props.theme.color.grey,
  hoverBgColor: props => darken(0.3, props.theme.color.grey),
})`
  position: relative;
  display: block;
  margin: 0;
  border: none;
  border-radius: 4px;
  padding: 0 ${modularScale(1)};
  font-size: ${modularScale(0)};
  font-family: ${props => props.theme.font.serif};
  text-decoration: none;
  line-height: 2;
  text-align: center;
  vertical-align: middle;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  ${transition('background-color', 'border-color', 'color')};

  &:not([disabled]):hover {
    background-color: ${props => props.hoverBgColor};
    cursor: pointer;
  }

  &:disabled {
    color: ${props => props.theme.color.grey};
    background-color: ${props => props.theme.color.lightgrey};
  }

  ${props =>
    props.bordered &&
    css`
      border: 2px solid ${props.bgColor};
      color: ${props.bgColor};
      background-color: transparent;

      &:not([disabled]):hover {
        background-color: transparent;
        border-color: ${props.hoverBgColor};
        color: ${props.hoverBgColor};
      }

      &:disabled {
        border-color: ${props.theme.color.lightgrey};
        color: ${props.theme.color.grey};
        background-color: transparent;
      }
    `};
`;

const ButtonPrimary = Button.extend.attrs({
  color: props => props.theme.color.white,
  bgColor: props => props.theme.color.black,
})``;

export { Button, ButtonPrimary };
