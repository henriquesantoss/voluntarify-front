import * as Popover from '@radix-ui/react-popover'
import Image from 'next/image'
import styled, { css } from 'styled-components'

export const Content = styled(Popover.Content)`
  ${({ theme }) => css`
    box-shadow: ${theme.effects.boxShadow.md};
  `}
`
export const Container = styled.div`
  ${({ theme }) => css`
    height: 80vh;
    border-radius: ${theme.shapes.borderRadius.sm};
    background-color: ${theme.colors.background.light};
    padding: ${theme.spacings[10]};
  `}
`
export const StyledImage = styled(Image)`
  ${({ theme }) => css`
    user-select: none;
    border-radius: ${theme.shapes.borderRadius.md};
  `}
`

export const Close = styled(Popover.Close)`
  ${({ theme }) => css`
    border: none;
    width: ${theme.spacings.md};
    height: ${theme.spacings.md};
    background: transparent;
    cursor: pointer;
    color: ${theme.colors.neutral.black};
  `}
`
export const Arrow = styled(Popover.Arrow)`
  ${({ theme }) => css`
    width: 18px;
    height: 10px;
    fill: ${theme.colors.background.light};
    margin-bottom: ${theme.spacings.md};
  `}
`
