import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ shadow?: boolean }>`
  ${({ theme, shadow = true }) => css`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    height: ${theme.spacings[20]};
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.colors.background.light};
    padding: ${theme.spacings[7]} ${theme.spacings[10]};
    z-index: ${theme.layers.base};
    ${shadow &&
    css`
      box-shadow: ${theme.effects.boxShadow.md};
    `}
  `}
`
