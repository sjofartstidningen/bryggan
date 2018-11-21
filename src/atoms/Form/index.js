import styled from 'styled-components';
import {
  applyStyleModifiers,
  styleModifierPropTypes,
} from 'styled-components-modifiers';
import { fontSmoothing, transitions } from '../../theme/utils';

const Form = styled.form``;

const FormFieldset = styled.fieldset`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.margin.double};
  border: 0;
  padding: 0;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FormLegend = styled.legend`
  display: block;
  width: 100%;
  max-width: 40rem;
  margin-bottom: ${({ theme }) => theme.margin.extra};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.typeSize.body};
  font-weight: ${({ theme }) => theme.weight.normal};
  line-height: ${({ theme }) => theme.lineHeight.body};
  color: ${({ theme }) => theme.color.black};

  ${fontSmoothing};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.margin.extra};

  &:last-child {
    margin-bottom: 0;
  }
`;

const FormInputLabel = styled.label`
  display: block;
  max-width: 40rem;
  margin-bottom: ${({ theme }) => theme.margin.half};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.typeSize.body};
  font-weight: ${({ theme }) => theme.weight.normal};
  line-height: ${({ theme }) => theme.lineHeight.body};
  color: ${({ theme }) => theme.color.greyDark};
  user-select: none;

  ${fontSmoothing};
`;

const formInputModifierConfig = {
  error: ({ theme }) => `border-color: ${theme.color.error}`,
};

const FormInput = styled.input`
  display: inline-block;
  width: 100%;
  min-width: 3.25rem;
  max-width: 40rem;
  min-height: 2rem;
  border: ${({ theme }) => theme.border.greyOpaque};
  border-radius: 4px;
  padding: 0 ${({ theme }) => theme.padding.half};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.typeSize.body};
  font-weight: ${({ theme }) => theme.weight.normal};
  line-height: ${({ theme }) => theme.lineHeight.body};
  color: ${({ theme }) => theme.color.black};
  vertical-align: middle;
  background-color: #ffffff;
  -webkit-appearance: none;

  ${fontSmoothing};
  ${transitions.short('border-color')};
  ${applyStyleModifiers(formInputModifierConfig)};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.brand};
  }
`;

FormInput.propTypes = {
  modifiers: styleModifierPropTypes(formInputModifierConfig),
};

const formInputDetailModifierConfig = {
  error: ({ theme }) => `color: ${theme.color.error}`,
};

const FormInputDetail = styled.small`
  display: block;
  max-width: 40rem;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.typeSize.label};
  font-weight: ${({ theme }) => theme.weight.normal};
  line-height: ${({ theme }) => theme.lineHeight.body};
  color: ${({ theme }) => theme.color.greyDark};

  ${fontSmoothing};
  ${transitions.short('color')};
  ${applyStyleModifiers(formInputDetailModifierConfig)};

  ${FormInput}:focus + & {
    color: ${({ theme }) => theme.color.greyDark};
  }
`;

FormInputDetail.propTypes = {
  modifiers: styleModifierPropTypes(formInputDetailModifierConfig),
};

export {
  Form,
  FormFieldset,
  FormLegend,
  FormGroup,
  FormInputLabel,
  FormInput,
  FormInputDetail,
};
