import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import styled, { css } from 'styled-components'

export const Content = styled(TooltipPrimitive.Content)`
  ${({ theme }) => css`
    z-index: ${theme.layers.modal};
    background-color: ${theme.colors.neutral.white};
    padding: ${theme.spacings.md};
    border-radius: ${theme.shapes.borderRadius.sm};
    box-shadow: ${theme.effects.boxShadow.lg};
  `}
`
export const StyledArrow = styled(TooltipPrimitive.Arrow)`
  ${({ theme }) => css`
    fill: ${theme.colors.neutral.white};
  `}
`
