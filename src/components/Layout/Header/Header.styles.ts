import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding: 0 ${theme.spacings[10]};
    justify-content: space-between;
    width: 100%;
    height: ${theme.spacings[19]};
    background-color: ${theme.colors.primary.dark};
    flex-shrink: 0;
    z-index: ${theme.layers.base};
  `}
`
