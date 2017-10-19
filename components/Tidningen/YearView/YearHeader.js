// @flow
import React from 'react';
import styled, { css } from 'styled-components';
import StickyEvent from '../../StickyEvent';
import { H2 } from '../../Typography/headings';

const Title = styled(H2)`
  background-color: ${props => props.theme.color.white};
  transition: border 0.3s ease-in-out;
  will-change: border;

  ${props =>
    props.stuck &&
    css`
      border: none;
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
            {children}
          </TitleSpan>
        </Title>
      )}
    />
  );
}

export default YearHeader;
