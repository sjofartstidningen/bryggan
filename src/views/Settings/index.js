import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale, lighten, darken } from 'polished';
import { Formik } from 'formik';
import { Main } from '../../components/MainGrid';
import { Title, SubTitle } from '../../components/Typography';
import { ax } from '../../styles';
import { updateUserData } from '../../utils/firebase';

const Form = styled.form`
  width: 100%;
  max-width: 35rem;
`;

const Fieldset = styled.fieldset`
  display: block;
  width: 100%;
  border: none;
  padding: 0;
`;

const InputContainer = styled.div`
  margin: 1.5em 0;
  font-size: 1em;
`;

const TextInputLabel = styled.label`
  position: relative;
  display: block;
`;

const LabelText = styled.span`
  display: block;
  width: 100%;
  margin-bottom: 0.5em;
  font-size: ${modularScale(-1)};
  text-align: left;
`;

const TextInput = styled.input`
  display: inline-block;
  min-width: 3.125em;
  width: 100%;
  max-width: 35em;
  border: 2px solid
    ${p => (p.valid ? ax('color.grey')(p) : ax('color.warning')(p))};
  border-radius: 4px;
  padding: 0 0.5em;
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

const SubmitButton = styled.button`
  display: block;
  width: auto;
  border: 2px solid ${p => darken(0.05, ax('color.brand')(p))};
  border-radius: 4px;
  padding: 0 1em;
  font-size: 1em;
  font-family: ${ax('font.sansSerif')};
  line-height: 2;
  color: white;
  background-color: ${ax('color.brand')};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  user-select: none;

  &:hover {
    background-color: ${p => darken(0.05, ax('color.brand')(p))};
  }

  &:disabled {
    background-color: ${p => lighten(0.5, ax('color.black')(p))};
    border-color: ${p => lighten(0.25, ax('color.black')(p))};
    cursor: default;
  }
`;

class Settings extends Component {
  static propTypes = {
    user: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string.isRequired,
    }).isRequired,
    onUserUpdated: PropTypes.func.isRequired,
  };

  handleSubmit = async (values, { setSubmitting, setValues }) => {
    const user = await updateUserData(values);
    setValues(user);
    setSubmitting(false);
    this.props.onUserUpdated(user);
  };

  render() {
    const { displayName } = this.props.user;

    return (
      <Main>
        <Title>Inställningar</Title>

        <div>
          <Formik
            initialValues={{
              displayName: displayName || '',
            }}
            onSubmit={this.handleSubmit}
            render={({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <SubTitle>Användare</SubTitle>

                <Fieldset>
                  <InputContainer>
                    <TextInputLabel htmlFor="displayName">
                      <LabelText>Namn</LabelText>
                      <TextInput
                        type="test"
                        name="displayName"
                        id="displayName"
                        value={values.displayName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoCorrect="off"
                        autoCapitalize="on"
                        valid={!(touched.displayName && errors.displayName)}
                      />
                    </TextInputLabel>
                  </InputContainer>

                  <InputContainer>
                    <SubmitButton type="submit" disabled={isSubmitting}>
                      Spara inställningar
                    </SubmitButton>
                  </InputContainer>
                </Fieldset>
              </Form>
            )}
          />
        </div>
      </Main>
    );
  }
}

export default Settings;
