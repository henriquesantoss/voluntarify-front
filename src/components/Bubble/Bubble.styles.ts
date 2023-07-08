import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ $backgroundLight?: boolean }>`
  ${({ theme, $backgroundLight }) => css`
    background-color: ${$backgroundLight
      ? theme.colors.background.main
      : theme.colors.primary.xxxlight};
    padding: ${theme.spacings.xxs} ${theme.spacings.xs};
    border-radius: ${theme.shapes.borderRadius.sm};
    transition-property: background-color color;
    transition: ${theme.animationTimings.transition.default};
    display: flex;
    height: ${theme.spacings[14]};
    align-items: center;

    :hover {
      background-color: ${$backgroundLight
        ? theme.colors.primary.xxxlight
        : theme.colors.background.main};
    }

    p {
      color: ${theme.colors.primary.main};
    }
  `}
`
