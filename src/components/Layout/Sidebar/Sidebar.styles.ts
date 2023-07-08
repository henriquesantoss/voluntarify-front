import { Flex } from 'components/Flex'
import styled, { css } from 'styled-components'

export const Wrapper = styled(Flex)`
  ${({ theme }) => css`
    height: ${theme.spacings[10]}
    box-shadow: ${theme.effects.boxShadow.md};
    background-color: ${theme.colors.background.light};
    padding: ${theme.spacings.md} ${theme.spacings[10]};
    z-index: ${theme.layers.menu};
    width: 100%;

    `}
  html {
    scroll-behavior: smooth;
  }
  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    color: #3b82f6;
  }
`
