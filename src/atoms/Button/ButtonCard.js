// @flow
import React from 'react';
import type { ComponentType } from 'react';
import styled from 'styled-components';
import { borderRadius } from 'polished';
import { Button as _Button } from './index';
import { Paragraph } from '../Text';
import { transitions } from '../../theme/utils';

const Button = styled(_Button)`
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: stretch;
  width: 8rem;
  height: 8rem;
  border: ${({ theme }) => theme.border.greyOpaque};
  padding: 0;
  background-color: transparent;

  ${transitions.short('border')};

  &:hover {
    background-color: transparent;
    border: ${({ theme }) => theme.border.brand};
  }
`;

const Title = styled(Paragraph)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 0;
  padding: ${({ theme }) => theme.padding.half};
  color: ${({ theme }) => theme.color.greyDark};
  text-align: center;
  white-space: normal;
`;

const Label = styled.span`
  display: block;
  margin-top: auto;
  border-top: ${({ theme }) => theme.border.greyOpaque};
  font-size: ${({ theme }) => theme.typeSize.label};
  line-height: 2rem;
  background-color: transparent;

  ${borderRadius('top', 0)};
  ${borderRadius('bottom', 0)};
  ${transitions.short('border-top', 'color')};

  &:hover {
    background-color: transparent;
  }

  ${Button}:hover & {
    border-top: ${({ theme }) => theme.border.brand};
    color: ${({ theme }) => theme.color.brand};
  }
`;

type Props = {
  title: string,
  label: string,
  icon?: ComponentType<any>, // eslint-disable-line
  onClick: (e: SyntheticMouseEvent<HTMLButtonElement>) => void | Promise<void>,
};

function ButtonCard({ title, label, icon: Icon, onClick }: Props) {
  return (
    <Button onClick={onClick}>
      <Title>{title}</Title>
      <Label>
        {Icon && <Icon />} {label}
      </Label>
    </Button>
  );
}

export { ButtonCard as default };
