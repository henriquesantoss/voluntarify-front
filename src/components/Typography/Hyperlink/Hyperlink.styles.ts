import styled, { css } from 'styled-components'

export const Hyperlink = styled.a`
  ${({ theme }) => css`
    cursor: pointer;
    text-decoration: none;
    font-size: ${theme.typography.sizes.sm};
    font-weight: ${theme.typography.weight.bold};
    color: ${theme.colors.primary.contrast};
    :hover {
      color: ${theme.colors.primary.dark};
    }
  `}
`
