import styled from 'styled-components';
import { modularScale } from 'polished';

const SignInContainer = styled.div`
  position: relative;
  width: 20rem;
  min-height: 20rem;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.color.lightgrey};
  border-radius: 4px;
  padding: ${modularScale(1)};
  font-family: ${props => props.theme.font.serif};
`;

export { SignInContainer as default };
