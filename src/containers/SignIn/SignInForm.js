/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { modularScale } from 'polished';
import Loader from '../../components/Loader';
import { ButtonPrimary } from '../../components/Button';

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${modularScale(1)};

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
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            zIndex: 3,
          }}
        >
          <Loader />
        </div>
      )}
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
          autoComplete="on"
          autoCapitalize="off"
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
          autoComplete="off"
          autoCapitalize="off"
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
        <ButtonPrimary type="submit" loading={loading}>
          Logga in
        </ButtonPrimary>
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
