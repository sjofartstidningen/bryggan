import styled from 'styled-components';
import { modularScale, darken } from 'polished';
import transition from '../../styles/transitions';

const ButtonStandard = styled.button`
  display: inline-block;
  margin: 0;
  margin-right: ${modularScale(0)};
  border: none;
  border-radius: 3px;
  padding: 0 ${modularScale(0)};
  font-family: ${props => props.theme.font.serif};
  font-size: ${modularScale(-1)};
  font-weight: 400;
  line-height: ${modularScale(3)};
  text-transform: capitalize;
  vertical-align: middle;
  color: ${props => props.theme.color.black};
  background-color: ${props => props.theme.color.lightgrey};
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  ${transition('background-color')};

  &:hover {
    cursor: pointer;
    background-color: ${props => darken(0.1, props.theme.color.lightgrey)};
  }
`;

const ButtonPrimary = ButtonStandard.extend`
  color: ${props => props.theme.color.white};
  background-color: ${props => props.theme.color.grey};

  &:hover {
    background-color: ${props => darken(0.1, props.theme.color.grey)};
  }
`;

const ButtonBrand = ButtonStandard.extend`
  color: ${props => props.theme.color.white};
  background-color: ${props => props.theme.color.brand};

  &:hover {
    background-color: ${props => darken(0.1, props.theme.color.brand)};
  }
`;

const ButtonWarning = ButtonStandard.extend`
  color: ${props => props.theme.color.white};
  background-color: ${props => props.theme.color.warning};

  &:hover {
    background-color: ${props => darken(0.1, props.theme.color.warning)};
  }
`;

export { ButtonStandard, ButtonPrimary, ButtonBrand, ButtonWarning };
