import styled, { css } from 'styled-components'

export const ContainerBanner = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary.xxxlight};

    border-radius: ${theme.shapes.borderRadius.sm};
    display: flex;
    width: ${theme.spacings[12]};
    height: ${theme.spacings[12]};
    align-items: center;
    justify-content: center;

    color: ${theme.colors.background.dark};
  `}
`
