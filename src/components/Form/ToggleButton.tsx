import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { spacing, color, size, shadow } from '../../styles/theme';
import { VisuallyHidden } from '../VisuallyHidden';
import { transition } from '../../styles/utils';

interface ToggleButtonProps {
  checked?: boolean;
  id: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export const ToggleButton = forwardRef<HTMLLabelElement, ToggleButtonProps>(
  ({ checked, id, onClick, children }, ref) => {
    return (
      <Label ref={ref} htmlFor={id}>
        <Button
          type="button"
          role="switch"
          id={id}
          aria-checked={checked}
          onClick={onClick}
          checked={checked}
        >
          <SwitchLabel checked={checked} aria-hidden>
            {checked ? 'I' : 'O'}
          </SwitchLabel>
          <SwitchKnob checked={checked} aria-hidden />

          <VisuallyHidden>{checked ? 'on' : 'off'}</VisuallyHidden>
        </Button>
        <LabelText>{children}</LabelText>
      </Label>
    );
  },
);

const Label = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
`;

const Button = styled.button<{ checked?: boolean }>`
  position: relative;
  display: inline-flex;
  width: calc(${spacing('6')} * 2);
  height: ${spacing('6')};
  margin: 0;
  border: 1px solid ${color('black')};
  border-radius: ${spacing('6')};
  padding: 0;
  background-color: ${color('white')};
  color: ${color('black')};
  ${transition('background')};

  :focus {
    outline: none;
    box-shadow: ${shadow('outline')};
  }

  ${p =>
    p.checked &&
    css`
      background-color: ${color('shade')};
    `}
`;

const SwitchLabel = styled.span<{ checked?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(${spacing('6')} - 2px);
  height: calc(${spacing('6')} - 2px);
  font-size: ${size('xs')};
  line-height: 1;
  transform: translateX(0);
  ${transition('transform')};

  ${p =>
    p.checked &&
    css`
      transform: translateX(calc(100% + 2px));
    `}
`;

const SwitchKnob = styled.span<{ checked?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(${spacing('6')} - 2px);
  height: calc(${spacing('6')} - 2px);
  border: 1px solid ${color('white')};
  border-radius: 100%;
  background-color: ${color('black')};
  transform: translateX(calc(100% + 2px));
  ${transition('transform')};

  ${p =>
    p.checked &&
    css`
      transform: translateX(0);
    `}
`;

const LabelText = styled.span`
  font-size: ${size('sm')};
  color: ${color('black')};
  margin-left: ${spacing('2')};
`;
