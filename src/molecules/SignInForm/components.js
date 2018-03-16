import styled, { css } from 'styled-components';
import { borderRadius } from 'polished';
import { fontSmoothing, transitions } from '../../theme/utils';
import { Button } from '../../atoms/Button';
import {
  Form as _Form,
  FormInputLabel,
  FormInput,
  FormInputDetail,
  FormGroup as _FormGroup,
} from '../../atoms/Form';
import { slideInDownShort, fadeIn } from '../../theme/animations';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.typeSize.body};
  font-weight: ${({ theme }) => theme.weight.normal};
  line-height: ${({ theme }) => theme.lineHeight.body};
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.greyLight};

  ${fontSmoothing};
  ${fadeIn};
  animation-timing-function: ease-in-out;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 15rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: ${({ theme }) => theme.boxShadow.greyOpaque};
  z-index: 0;

  ${transitions.short('box-shadow')};
  ${slideInDownShort};

  ${p =>
    p.error &&
    css`
      box-shadow: ${({ theme }) => theme.boxShadow.error};
    `};
`;

const TitleContainer = styled.div`
  margin-top: ${({ theme }) => theme.margin.extended};
  margin-bottom: ${({ theme }) => theme.margin.standard};
`;
const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typeSize.heading};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const SigninContainer = styled.div`
  width: 100%;
`;

const Form = _Form.extend`
  margin: 0;
  border: none;
  padding: 0;
`;

const FormGroup = _FormGroup.extend`
  padding: 0 ${({ theme }) => theme.padding.standard};
`;

const Label = FormInputLabel;
const Input = FormInput.extend`
  min-height: 2.25rem;
  background-color: ${({ theme }) => theme.color.greyLight};
`;

const InputDetail = FormInputDetail.extend``;

const SubmitButtonContainer = styled.div`
  width: 100%;
  margin-top: 1.5rem;
`;

const SubmitButton = Button.extend`
  position: relative;
  display: block;
  width: 100%;
  height: 3rem;
  border-top: ${({ theme }) => theme.border.greyOpaque};
  ${borderRadius('top', '0px')};
  font-size: ${({ theme }) => theme.typeSize.body};
  color: ${({ theme }) => theme.color.greyDark};
  background-color: transparent;
  ${transitions.short('color', 'background-color')};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.brand};
  }

  &:focus {
    outline: 1px dotted ${({ theme }) => theme.color.brand};
  }

  &:disabled {
    cursor: default;
    color: ${({ theme }) => theme.color.grey};
    background-color: transparent;
  }
`;

const SubmitButtonText = styled.span`
  opacity: 1;
  ${transitions.short('opacity')};
  transition-delay: 0.4s;

  ${p =>
    !p.show &&
    css`
      opacity: 0;
      transition-delay: 0s;
    `};
`;

export {
  Wrapper,
  Container,
  TitleContainer,
  Title,
  SigninContainer,
  Form,
  FormGroup,
  Label,
  Input,
  InputDetail,
  SubmitButtonContainer,
  SubmitButton,
  SubmitButtonText,
};
