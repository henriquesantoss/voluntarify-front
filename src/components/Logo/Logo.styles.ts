import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${theme.spacings[14]};
    width: ${theme.spacings[14]};
    background-color: ${theme.colors.primary.active};
    border-radius: ${theme.shapes.borderRadius.sm};
  `}
`
