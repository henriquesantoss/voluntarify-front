import { HTMLProps } from 'react'
import * as S from './Text.styles'

export type Tag =
  | 'i'
  | 'u'
  | 'abbr'
  | 'cite'
  | 'del'
  | 'em'
  | 'ins'
  | 'kbd'
  | 'mark'
  | 's'
  | 'samp'
  | 'sub'
  | 'sup'
  | 'span'

export interface TextProps
  extends Omit<HTMLProps<HTMLParagraphElement>, 'ref' | 'size'> {
  as?: Tag
  align?: S.Align
  children: React.ReactNode
  color?: S.Colors
  lineHeight?: S.LineHeight
  size?: S.Sizes
  weight?: S.Weights
  limitLines?: number
  transform?: S.Transform
  spacing?: S.LetterSpacings
  noWrap?: boolean
}

export const Text = ({ children, ...restProps }: TextProps) => (
  <S.Wrapper {...restProps}>{children}</S.Wrapper>
)
