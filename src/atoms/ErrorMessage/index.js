// @flow
import React from 'react';
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
`;

const Icon = styled(Close)`
  color: ${({ theme }) => theme.color.error};
`;

const Message = Paragraph.extend`
  text-align: center;
`;

// eslint-disable-next-line
function ErrorMessage({ message }: { message?: ?string }) {
  return (
    <Wrapper>
      <Icon />
      {message && <Message>{message}</Message>}
    </Wrapper>
  );
}

export { ErrorMessage as default };
