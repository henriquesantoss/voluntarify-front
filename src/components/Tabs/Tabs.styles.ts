import styled, { css } from 'styled-components'

export const Sticky = styled.div`
  ${({ theme }) => css`
    position: sticky;
    top: -26px;
    z-index: ${theme.layers.overlay};

    & > div {
      transition-property: all;
      transition: ${theme.animationTimings.transition.fast};
    }

    &.is-pinned {
      padding-top: ${theme.spacings.md};
      & > div {
        background-color: ${theme.colors.background.light};
        padding: ${theme.spacings.xs};
        border-radius: ${theme.shapes.borderRadius.sm};
        box-shadow: ${theme.effects.boxShadow.lg};
      }
    }
  `}
`

export const TabContainer = styled.div<{
  barPosition?: number
}>`
  ${({ theme, barPosition }) => css`
    justify-content: space-between;
    align-items: center;
    user-select: none;
    display: flex;
    position: relative;
    margin: ${theme.spacings.xs};
    gap: ${theme.spacings[10]};

    .tabs {
      cursor: pointer;
      position: relative;
      & > :not(:last-child) {
        padding-right: ${theme.spacings.md};
      }

      ::after {
        content: '';
        position: absolute;
        background-color: ${theme.colors.primary.dark};
        height: 2px;
        width: 24px;
        bottom: 0px;
        left: ${barPosition}px;
        transition-property: left;
        transition: ${theme.animationTimings.transition.default};
        border-radius: ${theme.shapes.borderRadius.full};
      }
    }
  `}
`
