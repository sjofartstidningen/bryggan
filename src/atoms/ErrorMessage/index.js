import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Paragraph } from '../Text';
import { Close } from '../Icon';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const Icon = styled(Close)`
  color: ${({ theme }) => theme.color.error};
`;

const Message = styled(Paragraph)`
  text-align: center;
  max-width: 20rem;
`;

function ErrorMessage({ message }) {
  return (
    <Wrapper>
      <Icon />
      {message && <Message>{message}</Message>}
    </Wrapper>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export { ErrorMessage as default };
