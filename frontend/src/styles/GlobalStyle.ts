import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    margin: 0;
    min-height: 100vh;
    min-width: ${({ theme }) => theme.breakpoints.minWidth};
    font-family: ${({ theme }) => theme.font.sans};
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.bg};
    -webkit-font-smoothing: antialiased;
  }

  #root {
    min-height: 100vh;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  button {
    font: inherit;
  }
`;
