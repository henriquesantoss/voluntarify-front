import Image from 'next/image'
import styled, { css } from 'styled-components'
import { Flex } from 'components/Flex'

export const Wrapper = styled.div<{ size: number | string }>`
  ${({ theme, size }) => css`
    color: ${theme.colors.primary.dark};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    overflow: hidden;
    user-select: none;
    width: ${Number(size) ? size + 'rem' : size};
    height: ${Number(size) ? size + 'rem' : size};
    border-radius: 100%;
    background-color: ${theme.colors.primary.xxxlight};
    position: relative;
  `}
`

export const ContainerIcon = styled(Flex)`
  svg {
    height: 50%;
    width: 50%;
  }
`

export const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`
