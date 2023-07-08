import styled, { css } from 'styled-components'
import { Flex } from 'components/Flex'

export const Wrapper = styled(Flex)`
  ${({ theme }) => css`
    background-color: ${theme.colors.background.light};
  `}
`
export const TextContainer = styled(Flex)`
  ${({ theme }) => css`
    padding: ${theme.spacings[12]};
    max-width: 436px;
  `}
`
