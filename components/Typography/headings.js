// @flow
import styled from 'styled-components';

export const H1 = styled.h1`
  font-family: ${props => props.theme.font.serif};
  font-weight: 400;
  font-size: ${props => props.theme.size(2)}em;
  letter-spacing: 0.05em;
  color: ${props => props.theme.color.grey};
`;

export const H2 = H1.withComponent('h2').extend`
  border-bottom: 1px solid ${props => props.theme.color.grey};
  padding: 0.5em;
  font-size: ${props => props.theme.size(1)}em;
  color: ${props => props.theme.color.black};
`;
