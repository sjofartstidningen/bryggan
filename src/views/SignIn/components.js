// @flow
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { ax } from '../../styles';
import { typeMixin } from '../../styles/type';
import { colorMixin, getColor } from '../../styles/color';

export const SignInGrid = styled.div`
  width: 25rem;
  height: 100vh;
  margin: 0 auto;
  ${typeMixin('ui')};
  ${colorMixin('text01')};
`;

export const SignInSection = styled.div`
  padding: 2em;
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

export const LogotypeContainer = styled.div`
  width: 10rem;
  height: auto;
`;

export const Title = styled.h1`
  margin: 1em 0;
  ${typeMixin('alpha')};
`;

export const Fieldset = styled.fieldset`
  display: block;
  width: 100%;
  border: none;
  padding: 0;
`;

export const InputContainer = styled.div`
  margin: 1.5em 0;
  font-size: 1em;
  text-align: left;
`;

export const TextInputLabel = styled.label`
  position: relative;
  display: block;
`;

export const LabelText = styled.span`
  display: block;
  width: 100%;
  margin-bottom: 0.5em;
  text-align: left;
  ${typeMixin('caption')};
`;

export const TextInput = styled.input`
  display: inline-block;
  min-width: 3.125em;
  width: 100%;
  max-width: 35em;
  border: 2px solid ${p => (p.valid ? getColor('ui04') : getColor('warning'))};
  border-radius: 4px;
  padding: 0 1em;
  font-size: 1em;
  font-family: ${ax('font.sansSerif')};
  line-height: 2;
  transition: border-color 0.2s ease-in-out;
  user-select: none;

  &:focus {
    outline: none;
    border-color: ${ax('color.brand')};
  }
`;

export const SubmitButton = styled(Button)`
  margin-left: 0;
`;

export const CheckboxLabel = styled.label`
  ${typeMixin('caption')};
`;

export const CheckboxInput = styled.input`
  margin-right: 0.5em;
`;

export const CheckboxLabelText = styled.span``;
