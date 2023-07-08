import styled, { css } from 'styled-components'
import { theme as globalTheme } from 'styles/theme/main'

export const Wrapper = styled.div<{
  $fill?: boolean
  backgroundColor: keyof typeof globalTheme.colors.background
}>`
  ${({ theme, $fill, backgroundColor }) => css`
    display: flex;
    flex-direction: column;
    padding: ${theme.spacings[7]} ${theme.spacings[10]};
    background-color: ${theme.colors.background[backgroundColor]};
    border-radius: ${theme.shapes.borderRadius.sm};
    ${$fill &&
    css`
      height: 100%;
      width: 100%;
    `}
  `}
`

export const TitleContainer = styled.div<{
  forceTitleHeight?: boolean
  iconLeft?: boolean
}>`
  ${({ theme, forceTitleHeight, iconLeft }) => css`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${theme.spacings.sm};
    gap: ${theme.spacings.xs};
    height: ${theme.spacings[14]};

    ${forceTitleHeight &&
    css`
      height: ${theme.spacings[13]};
    `}

    ${iconLeft &&
    css`
      height: ${theme.spacings[24]};
    `}
  `}
`

export const BackgroundContentIcon = styled.div<{ titleVertical?: boolean }>`
  ${({ theme, titleVertical }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${theme.spacings[14]};
    width: ${theme.spacings[14]};
    border-radius: ${theme.shapes.borderRadius.sm};
    color: ${theme.colors.primary.main};
    background-color: ${theme.colors.primary.xxxlight};
    margin-bottom: ${!titleVertical ? theme.spacings.lg : 0};
  `}
`
