import { createGlobalStyle, css } from 'styled-components'
import { theme } from './theme/main'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    html , a{
      scroll-behavior: smooth;
    }

    &::before,
    &::after {
      border-width: 0;
      border-style: solid;
      box-sizing: inherit;
    }

    input {
      outline: none;
      border: 1px solid ${theme.colors.text.xlight};
      border-radius: 10px;
      height: 40px;
      width: 100%;
      background-color: transparent;
      padding: ${theme.spacings.sm} ${theme.spacings.md};
      font-size: ${theme.typography.sizes.sm};
      font-size: ${theme.typography.sizes.sm};
      letter-spacing: ${theme.typography.spacing.wide};

      [type='number'] {
        -moz-appearance: textfield;
      }
    }

  }

  a { text-decoration: none }

  ${({ theme }) => css`
    html {
      font-size: 16px;

      @media screen and (max-width: ${theme.breakpoints.xl}px) {
        font-size: 14px;
      }

      @media screen and (max-width: ${theme.breakpoints.lg}px) {
        font-size: 12px;
      }
    }

    html,
    body,
    #__next {
      height: 100%;
    }

    body {
      accent-color: ${theme.colors.primary.main};
      color: ${theme.colors.text.main};
      font-family: ${theme.typography.family.primary};
      font-size: ${theme.typography.sizes.md};
      background-color: ${theme.colors.background.main};
    }

    ::-webkit-scrollbar {
      height: 0.5rem;
      width: 0.5rem;
    }

    ::-webkit-scrollbar-track {
      background-color: ${theme.colors.primary.xxxlight};
      border-radius: ${theme.shapes.borderRadius.full};
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.primary.xxlight};
      border-radius: ${theme.shapes.borderRadius.full};
    }
  `}

`

export default GlobalStyles
