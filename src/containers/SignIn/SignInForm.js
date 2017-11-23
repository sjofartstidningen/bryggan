/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { modularScale } from 'polished';
import transition from '../../styles/transitions';
import Loader from '../../components/Loader';

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${modularScale(0)};

  &:last-child {
    margin: 0;
  }

  ${props =>
    props.withBorder &&
    css`
      border-bottom: 1px solid ${props.theme.color.lightgrey};
    `};
`;

const FormWarning = styled.p`
  font-size: ${modularScale(-1)};
  color: ${props => props.theme.color.warning};
`;

const InputLabel = styled.label`
  margin-right: ${modularScale(0)};
  font-size: ${modularScale(-1)};
  font-weight: 200;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  padding: 0;
  font-size: ${modularScale(-1)};
  font-weight: 500;
  line-height: 3;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  position: relative;
  width: 100%;
  margin: 0;
  margin-top: ${modularScale(1)};
  border: 1px solid ${props => props.theme.color.white};
  border-radius: 4px;
  padding: ${modularScale(-1)};
  font-size: ${modularScale(0)};
  color: ${props => props.theme.color.white};
  background-color: ${props => props.theme.color.black};
  ${transition('background-color', 'border-color', 'color')};

  &:not([disabled]):hover {
    cursor: pointer;
    border-color: ${props => props.theme.color.black};
    color: ${props => props.theme.color.black};
    background-color: ${props => props.theme.color.white};
  }

  &:disabled {
    background-color: ${props => props.theme.color.lightgrey};
  }

  ${props =>
    props.loading &&
    css`
      border-color: ${props.theme.color.black};
      color: ${props.theme.color.black};
      background-color: ${props.theme.color.white};
      text-indent: -9999px;
    `};
`;

function SignInForm({
  email,
  password,
  remember,
  error,
  loading,
  onInputChange,
  onCheckboxChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      {error && (
        <InputGroup>
          <FormWarning>{error}</FormWarning>
        </InputGroup>
      )}

      <InputGroup withBorder>
        <InputLabel htmlFor="auth-email">Email:</InputLabel>
        <TextInput
          type="email"
          id="auth-email"
          name="email"
          value={email}
          onChange={onInputChange}
        />
      </InputGroup>

      <InputGroup withBorder>
        <InputLabel htmlFor="auth-password">Lösenord:</InputLabel>
        <TextInput
          type="password"
          id="auth-password"
          name="password"
          value={password}
          onChange={onInputChange}
        />
      </InputGroup>

      <InputGroup style={{ justifyContent: 'flex-start' }}>
        <InputLabel htmlFor="auth-remember">Kom ihåg mig:</InputLabel>
        <input
          type="checkbox"
          id="auth-remember"
          name="remember"
          checked={remember}
          onChange={onCheckboxChange}
        />
      </InputGroup>

      <InputGroup>
        <SubmitButton
          type="submit"
          loading={loading}
          disabled={email.length === 0 || password.length === 0}
        >
          Logga in {loading && <Loader width="10%" />}
        </SubmitButton>
      </InputGroup>
    </form>
  );
}

SignInForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  remember: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

SignInForm.defaultProps = {
  error: null,
};

export { SignInForm as default };
