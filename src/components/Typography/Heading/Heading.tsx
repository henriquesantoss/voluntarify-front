import { theme } from 'styles/theme/main'
import * as S from './Heading.styles'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type Weights = keyof typeof theme.typography.weight

export type HeadingProps = {
  as: HeadingLevel
  children: React.ReactNode
  color?: S.Colors
  weight?: Weights
  lineHeight?: S.LineHeight
  transform?: S.Transform
}

export const Heading = ({
  as,
  children,
  color,
  weight,
  transform,
  lineHeight,
}: HeadingProps) => (
  <S.Wrapper
    as={as}
    $color={color}
    weight={weight}
    lineHeight={lineHeight}
    transform={transform}
  >
    {children}
  </S.Wrapper>
)
