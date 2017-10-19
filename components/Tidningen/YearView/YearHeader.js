// @flow
import React from 'react';
import styled, { css } from 'styled-components';
import StickyEvent from '../../StickyEvent';
import { H2 } from '../../Typography/headings';

const Title = styled(H2)`
  background-color: ${props => props.theme.color.white};
  transition: border-color 0.3s ease-in-out;
  will-change: border-color;

  ${props =>
    props.stuck &&
    css`
      border-color: transparent;
    `};
`;

const TitleSpan = styled.span`
  display: inline-block;
  transform: translateX(${props => (props.stuck ? props.translate : 0)}px);
  transition: transform 0.3s ease-in-out;
  will-change: transform;
`;

type Props = { translateTitle: number, children: string };

function YearHeader({ translateTitle, children }: Props) {
  return (
    <StickyEvent
      style={{ zIndex: 2 }}
      render={({ stuck }) => (
        <Title stuck={stuck}>
          <TitleSpan stuck={stuck} translate={translateTitle}>
            {stuck && '>'} {children}
          </TitleSpan>
        </Title>
      )}
    />
  );
}

export default YearHeader;
