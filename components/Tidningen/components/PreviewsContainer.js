// @flow
import styled, { css } from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${props => props.theme.size(0)}rem;
  padding: ${props => props.theme.size(0)}em;
  z-index: 1;

  ${props =>
    props.bind &&
    css`
      grid-column-gap: 0;

      & > *:last-child {
        display: none;
      }

      & > *:nth-child(1) {
        grid-column-start: 2;
      }

      & > *:nth-child(odd) {
        padding-right: ${props.theme.size(0) / 2}em;
      }

      & > *:nth-child(even) {
        padding-left: ${props.theme.size(0) / 2}em;
      }
    `};
`;
