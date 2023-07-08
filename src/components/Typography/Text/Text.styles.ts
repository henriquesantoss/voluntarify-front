import styled, { css } from 'styled-components'
import { theme } from 'styles/theme/main'
import { TextProps } from './Text'

export const sizes = {
  nano: css`
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  `,
  small: css`
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  `,
  medium: css`
    font-size: ${({ theme }) => theme.typography.sizes.md};
  `,
  big: css`
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  `,
  'extra-large': css`
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  `,
}

export const alignments = {
  center: css`
    text-align: center;
  `,
  left: css`
    text-align: left;
  `,
  right: css`
    text-align: right;
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

export type Align = keyof typeof alignments
export type Sizes = keyof typeof sizes
export type Transform = keyof typeof transformations

export type Colors = keyof typeof theme.colors.text
export type LineHeight = keyof typeof theme.typography.lineHeight
export type LetterSpacings = keyof typeof theme.typography.spacing
export type Weights = keyof typeof theme.typography.weight

type WrapperProps = Omit<TextProps, 'children' | 'as'>
export const Wrapper = styled.p<WrapperProps>`
  ${({
    theme,
    color = 'dark',
    noWrap = false,
    align = 'left',
    lineHeight = 'normal',
    size = 'medium',
    weight = 'regular',
    spacing = 'normal',
    transform,
  }) => css`
    color: ${theme.colors.text[color]};
    letter-spacing: ${theme.typography.spacing[spacing]};
    font-weight ${theme.typography.weight[weight]};
    line-height: ${theme.typography.lineHeight[lineHeight]};
    overflow: hidden;
    text-overflow: ellipsis;
    ${alignments[align]}
    ${transform ? transformations[transform] : ''}
    ${
      noWrap &&
      css`
        white-space: nowrap;
      `
    }

    ${sizes[size]}
  `}

  ${({ limitLines }) =>
    limitLines &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    `}
`
