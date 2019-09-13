import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: ${props => props.theme.font.body};
    font-size: 100%;
    color: ${props => props.theme.color.black};
  }
`;
