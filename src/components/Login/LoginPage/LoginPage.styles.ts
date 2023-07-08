import styled, { css } from 'styled-components'
import { Flex } from 'components/Flex'
import { Text } from 'components/Typography'

export const Wrapper = styled(Flex)`
  ${({ theme }) => css`
    background-color: ${theme.colors.background.light};
  `}
`

export const FormContainer = styled(Flex)`
  ${({ theme }) => css`
    padding: ${theme.spacings[12]};
    max-width: 500px;
  `}
`

export const TextContainer = styled(Text)`
  ${({ theme }) => css`
    cursor: pointer;
    color: ${theme.colors.info.light};
    :hover {
      color: ${theme.colors.info.xlight};
    }
  `}
`
