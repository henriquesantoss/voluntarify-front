import styled, { css } from 'styled-components'
import { Flex } from 'components/Flex'

export const Wrapper = styled(Flex)<{
  minPadding?: boolean
  minWidth?: boolean
}>`
  ${({ theme, minPadding, minWidth }) => css`
    background-color: ${theme.colors.background.main};
    padding: ${theme.spacings.xs}
      ${minPadding ? theme.spacings.xs : theme.spacings.md};
    width: ${minWidth ? 'initial' : '100%'};
    border-radius: ${theme.shapes.borderRadius.sm};
  `}
`
export const Content = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.primary.xlight};
    padding: ${theme.spacings.xs} ${theme.spacings.md};
    width: 100%;
    border-radius: ${theme.shapes.borderRadius.md};
    padding: ${theme.spacings.md};
  `}
`
