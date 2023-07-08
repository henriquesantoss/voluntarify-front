import { Flex } from 'components/Flex'
import styled, { css } from 'styled-components'

export const Wrapper = styled(Flex)`
  ${({ theme }) => css`
    input {
      outline: none;
      border: 1px solid ${theme.colors.text.xlight};
      border-radius: 10px;
      height: 40px;
      width: 100%;
      background-color: transparent;
      padding: ${theme.spacings.sm} ${theme.spacings.md};
      font-size: ${theme.typography.sizes.sm};
      font-size: ${theme.typography.sizes.sm};
      letter-spacing: ${theme.typography.spacing.wide};

      [type='number'] {
        -moz-appearance: textfield;
      }
    }
  `}
`
