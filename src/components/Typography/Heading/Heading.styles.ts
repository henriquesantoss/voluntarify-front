import styled, { css } from 'styled-components'
import { theme } from 'styles/theme/main'
import { HeadingProps } from './Heading'

const levels = {
  h1: css`
    ${({ theme }) => css`
      font-size: ${theme.typography.sizes['2xl']};
      line-height: ${theme.typography.lineHeight.snug};
    `}
  `,
  h2: css`
    ${({ theme }) => css`
      font-size: ${theme.typography.sizes.xl};
      line-height: ${theme.typography.lineHeight.snug};
    `}
  `,
  h3: css`
    ${({ theme }) => css`
      font-size: ${theme.typography.sizes.lg};
      line-height: ${theme.typography.lineHeight.snug};
    `}
  `,
  h4: css`
    ${({ theme }) => css`
      font-size: ${theme.typography.sizes.md};
      line-height: ${theme.typography.lineHeight.snug};
    `}
  `,
  h5: css`
    ${({ theme }) => css`
      font-size: ${theme.typography.sizes.sm};
      line-height: ${theme.typography.lineHeight.tight};
    `}
  `,
  h6: css`
    ${({ theme }) => css`
      font-size: ${theme.typography.sizes.xs};
      line-height: ${theme.typography.lineHeight.tight};
    `}
  `,
}

export const transformations = {
  uppercase: css`
    text-transform: uppercase;
  `,
  lowercase: css`
    text-transform: lowercase;
  `,
  capitalize: css`
    text-transform: capitalize;
  `,
}

export type Transform = keyof typeof transformations
export type Colors = keyof typeof theme.colors.text
export type LineHeight = keyof typeof theme.typography.lineHeight

type WrapperProps = {
  $color?: Colors
  lineHeight?: LineHeight
} & Omit<HeadingProps, 'color'>

export const Wrapper = styled.h1<WrapperProps>`
  ${({
    theme,
    $color = 'dark',
    as: level,
    weight = 'bold',
    lineHeight = 'normal',
    transform,
  }) => css`
    ${levels[level]};
    color: ${theme.colors.text[$color]};
    font-weight: ${theme.typography.weight[weight]};
    letter-spacing: ${theme.typography.spacing.normal};
    line-height: ${theme.typography.lineHeight[lineHeight]};
    ${transform ? transformations[transform] : ''}
  `}
`
