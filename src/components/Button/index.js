import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';
import { getTypeScale, getColor } from '../../styles';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  margin: 1rem;
  border: 2px solid transparent;
  padding: 0 1rem;
  font-family: ${p => p.theme.font.sansSerif};
  font-weight: ${p => p.theme.fontWeight.normal};
  ${getTypeScale(1)};
  text-align: center;
  text-decoration: none;
  color: ${getColor('inverse text color')};
  background-color: ${getColor('primary brand')};
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${lighten(0.1, getColor('primary brand'))};
  }

  ${p =>
    p.state &&
    css`
      background-color: ${getColor(p.state)};

      &:hover {
        background-color: ${lighten(0.1, getColor(p.state))};
      }
    `};

  ${p => p.size === 'small' && css`
    height: 2rem;
    padding: 0 0.625rem;
  `}
`;

const ButtonLink = Button.withComponent(Link);

const ButtonSecondary = Button.extend`
  border-color: ${getColor('primary brand')};
  color: ${getColor('primary brand')};
  background-color: transparent;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${lighten(0.1, getColor('primary brand'))};
    color: ${lighten(0.1, getColor('primary brand'))};
    background-color: transparent;
  }

  ${p =>
    p.state &&
    css`
      border-color: ${getColor(p.state)};
      color: ${getColor(p.state)};
      background-color: transparent;

      &:hover {
        border-color: ${lighten(0.1, getColor(p.state))};
        color: ${lighten(0.1, getColor(p.state))};
        background-color: transparent;
      }
    `};
`;

const ButtonLinkSecondary = ButtonSecondary.withComponent(Link);

export { Button as default, ButtonSecondary, ButtonLink, ButtonLinkSecondary };
