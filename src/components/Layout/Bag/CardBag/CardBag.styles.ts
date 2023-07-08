import Image from 'next/image'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  height: 80px;
`

export const StyledImage = styled(Image)`
  ${({ theme }) => css`
    user-select: none;
    border-radius: ${theme.shapes.borderRadius.md};
  `}
`
