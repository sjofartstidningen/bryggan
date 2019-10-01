import React, { useState } from 'react';
import styled from 'styled-components';
import { spacing } from '../../styles/theme';
import { ToggleButton } from '../Form/ToggleButton';

export const GeneralSettings = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Wrapper>
      <ToggleButton
        id="enable-this"
        checked={checked}
        onClick={() => setChecked(!checked)}
      >
        Enable this
      </ToggleButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: ${spacing('4')};
`;
