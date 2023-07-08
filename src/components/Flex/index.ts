import styled, { css } from 'styled-components'
import { theme } from 'styles/theme/main'

export type Spacings = keyof typeof theme.spacings

export type Align =
  | 'baseline'
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'stretch'

export type AlignContent =
  | 'around'
  | 'between'
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'stretch'

export type Justify =
  | 'space-around'
  | 'space-between'
  | 'center'
  | 'flex-end'
  | 'space-evenly'
  | 'flex-start'

export type Wrap = 'wrap' | 'wrap-reverse'

export type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto'

export type Fill = 'horizontal' | 'vertical' | 'both'

export type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse'

const alignStyle = css<{ align?: Align }>`
  align-items: ${({ align }) => align};
`

const alignContentStyle = css<{ alignContent?: AlignContent }>`
  align-content: ${({ alignContent }) => alignContent};
`

const justifyStyle = css<{ justify?: Justify }>`
  justify-content: ${({ justify }) => justify};
`

const wrapStyle = css<{ wrap?: Wrap }>`
  flex-wrap: ${({ wrap }) => wrap};
`

const overflowStyle = css<{ overflow?: Overflow }>`
  overflow: ${({ overflow }) => overflow};
`

const fillStyle = (fill: Fill) => {
  if (fill === 'horizontal') {
    return 'width: 100%;'
  }
  if (fill === 'vertical') {
    return 'height: 100%;'
  }
  if (fill === 'both') {
    return `
      width: 100%;
      height: 100%;
    `
  }
  return undefined
}

const directionStyle = css<{ direction?: Direction }>`
  flex-direction: ${({ direction }) => direction};
`

interface FixedSize {
  horizontal?: string | number
  vertical?: string | number
}

const fixedSizeStyle = css<{ fixedSize?: FixedSize }>`
  ${({ fixedSize }) =>
    fixedSize &&
    css`
      ${fixedSize.horizontal &&
      css`
        width: ${typeof fixedSize.horizontal === 'string'
          ? fixedSize.horizontal
          : fixedSize.horizontal + 'px'};
      `}
      ${fixedSize.vertical &&
      css`
        height: ${typeof fixedSize.vertical === 'string'
          ? fixedSize.vertical
          : fixedSize.vertical + 'px'};
      `};
    `}
`

interface Margin {
  all?: Spacings
  horizontal?: Spacings
  vertical?: Spacings
  top?: Spacings
  right?: Spacings
  left?: Spacings
  bottom?: Spacings
}

const marginStyle = (margin: Margin) => {
  const styles = []
  if (margin.vertical) {
    styles[1] = `margin-top: ${theme.spacings[margin.vertical]};`
    styles[3] = `margin-bottom: ${theme.spacings[margin.vertical]};`
  }
  if (margin.horizontal) {
    styles[2] = `margin-right: ${theme.spacings[margin.horizontal]};`
    styles[4] = `margin-left: ${theme.spacings[margin.horizontal]};`
  }
  if (margin.top) {
    styles[1] = `margin-top: ${theme.spacings[margin.top]};`
  }
  if (margin.right) {
    styles[2] = `margin-right: ${theme.spacings[margin.right]};`
  }
  if (margin.bottom) {
    styles[3] = `margin-bottom: ${theme.spacings[margin.bottom]};`
  }
  if (margin.left) {
    styles[4] = `margin-left: ${theme.spacings[margin.left]};`
  }
  if (margin.all) {
    styles[0] = `margin: ${theme.spacings[margin.all]};`
  }
  return css`
    ${styles.map((style) => style).join('')}
  `
}

export interface FlexProps {
  align?: Align
  alignContent?: AlignContent
  fill?: Fill
  justify?: Justify
  wrap?: Wrap
  direction?: Direction
  inline?: boolean
  flex?: boolean
  gap?: Spacings
  margin?: Margin
  overflow?: Overflow
  fixedSize?: FixedSize
  noShrink?: boolean
}

export const Flex = styled.div<FlexProps>`
  display: flex;

  ${({ theme, gap }) =>
    gap &&
    css`
      gap: ${theme.spacings[gap]};
    `}

  ${(props) =>
    props.inline &&
    css`
      display: inline-flex;
    `}

  ${(props) =>
    props.flex &&
    css`
      flex: 1;
    `};

  ${({ noShrink }) =>
    noShrink &&
    css`
      flex-shrink: 0;
    `}

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}

  ${({ align }) => align && alignStyle}
  ${({ alignContent }) => alignContent && alignContentStyle}
  ${({ fill }) => fill && fillStyle(fill)}
  ${({ justify }) => justify && justifyStyle}
  ${({ wrap }) => wrap && wrapStyle}
  ${({ overflow }) => overflow && overflowStyle}
  ${({ direction }) => direction && directionStyle}
  ${({ margin }) => margin && marginStyle(margin)}
  ${({ fixedSize }) => fixedSize && fixedSizeStyle}
`
