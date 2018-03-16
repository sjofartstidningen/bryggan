import styled from 'styled-components';
import {
  applyStyleModifiers,
  styleModifierPropTypes,
} from 'styled-components-modifiers';

const modifierConfig = {
  rounded: () => `border-radius: 100%;`,
};

const Img = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  border-style: none;

  ${applyStyleModifiers(modifierConfig)};
`;

Img.propTypes = {
  modifiers: styleModifierPropTypes(modifierConfig),
};

export { Img };
