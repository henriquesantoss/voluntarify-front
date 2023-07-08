import styled, { css } from 'styled-components'
import { Flex } from 'components/Flex'

export const colors = {
  inherit: css`
    color: inherit;
  `,
  contrast: css`
    color: ${({ theme }) => theme.colors.text.contrast};
  `,
  primary: css`
    color: ${({ theme }) => theme.colors.primary.light};
  `,
  main: css`
    color: ${({ theme }) => theme.colors.primary.main};
  `,
  'dark-primary': css`
    color: ${({ theme }) => theme.colors.primary.dark};
  `,
  secondary: css`
    color: ${({ theme }) => theme.colors.secondary.main};
  `,
  success: css`
    color: ${({ theme }) => theme.colors.success.main};
  `,
  error: css`
    color: ${({ theme }) => theme.colors.error.dark};
  `,
  dark: css`
    color: ${({ theme }) => theme.colors.text.dark};
  `,
  xxlight: css`
    color: ${({ theme }) => theme.colors.neutral.light};
  `,
  gray: css`
    color: ${({ theme }) => theme.colors.neutral.dark};
  `,
  xlight: css`
    color: ${({ theme }) => theme.colors.text.main};
  `,
  light: css`
    color: ${({ theme }) => theme.colors.neutral.white};
  `,
  mutted: css`
    color: ${({ theme }) => theme.colors.neutral.medium};
  `,
}

export const sizes = {
  sm: css`
    height: ${({ theme }) => theme.spacings[8]};
    width: ${({ theme }) => theme.spacings[8]};
  `,
  md: css`
    height: ${({ theme }) => theme.spacings[10]};
    width: ${({ theme }) => theme.spacings[10]};
  `,
  lg: css`
    height: ${({ theme }) => theme.spacings[12]};
    width: ${({ theme }) => theme.spacings[12]};
  `,
  xl: css`
    height: ${({ theme }) => theme.spacings[16]};
    width: ${({ theme }) => theme.spacings[16]};
  `,
  xll: css`
    height: ${({ theme }) => theme.spacings[18]};
    width: ${({ theme }) => theme.spacings[18]};
  `,
  xxl: css`
    height: ${({ theme }) => theme.spacings[20]};
    width: ${({ theme }) => theme.spacings[20]};
  `,
}

export type IconColors = keyof typeof colors
export type IconSizes = keyof typeof sizes

type WrapperProps = {
  $color?: IconColors
  size?: IconSizes
}

export const Wrapper = styled(Flex)<WrapperProps>`
  ${({ theme, $color = 'inherit', size = 'md' }) => css`
    svg {
      padding: ${theme.spacings[1]};
      ${sizes[size]}
    }

    ${colors[$color]}
    ${sizes[size]}
  `}

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
`
