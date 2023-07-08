import styled, { css } from 'styled-components'
import { Flex } from 'components/Flex'
import { Text } from 'components/Typography'

export const Wrapper = styled.a<{ $active: boolean }>`
  ${({ theme, $active }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    height: ${theme.spacings[14]};
    width: 100%;
    border-radius: ${theme.shapes.borderRadius.sm};
    transition-property: background-color color;
    transition: ${theme.animationTimings.transition.default};
    padding-inline: ${theme.spacings.sm};
    :hover {
      color: ${theme.colors.primary.main};
      background-color: ${theme.colors.primary.xxxlight};

      .menu-button-title {
        color: ${theme.colors.primary.main};
      }
    }

    ${$active &&
    css`
      color: ${theme.colors.primary.main};
      background-color: ${theme.colors.primary.xxxlight};
    `}
  `}
`

export const ContainerText = styled(Text)<{ $active: boolean }>`
  ${({ theme, $active }) => css`
    cursor: pointer;
    transition-property: background-color color;
    transition: ${theme.animationTimings.transition.default};
    font-weight: bold;
    margin-left: ${theme.spacings.xs};
    color: ${theme.colors.text.mutted};
    :hover {
      color: ${theme.colors.primary.main};
    }

    ${$active &&
    css`
      color: ${theme.colors.primary.main};

      ::before {
        content: '';
        position: absolute;
        left: -${theme.shapes.borderWidth.sm};
        height: ${theme.spacings.md};
        width: ${theme.shapes.borderWidth.sm};
        background-color: ${theme.colors.primary.main};
      }
    `}
  `}
`

export const SubMenuContent = styled(Flex)<{ $open?: boolean }>`
  ${({ theme, $open }) => css`
    position: relative;
    border-left: 1px solid #d2d2d2;
    transition-property: height;
    height: 100%;
    transition: ${theme.animationTimings.transition.fast};
    ${!$open &&
    css`
      height: 0;
    `}
  `}
`
