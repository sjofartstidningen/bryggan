import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { BodyContent } from '../Typography';

const Fieldset = styled.fieldset`
  maring: 0;
  padding: 0;
  border: 0;
  font-weight: inherit;
  font-style: inherit;
  font-size: ${modularScale(0)};
  font-family: inherit;
  vertical-align: middle;
  line-height: 24px;
`;

const Legend = styled.legend`
  display: block;
  width: 100%;
  margin-bottom: ${modularScale(1)};
  font-family: ${props => props.theme.font.serif};
  font-weight: 600;
`;

const Label = BodyContent.withComponent('label').extend`
  display: block;
  user-select: none;
`;

const TextInput = styled.input`
  display: inline-block;
  width: 100%;
  min-width: 50px;
  max-width: 450px;
  margin-bottom: ${modularScale(1)};
  border: 2px solid ${props => props.theme.color.grey};
  border-radius: 3px;
  padding: 0 ${modularScale(-2)};
  font-size: ${modularScale(0)};
  line-height: ${modularScale(2)};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.color.brand};
  }
`;

export { Fieldset, Legend, Label, TextInput };
