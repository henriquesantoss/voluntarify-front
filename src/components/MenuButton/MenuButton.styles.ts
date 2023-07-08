import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import styled, { css } from 'styled-components'

export const Wrapper = styled.a<{ $active: boolean }>`
  ${({ theme, $active }) => css``}
`
