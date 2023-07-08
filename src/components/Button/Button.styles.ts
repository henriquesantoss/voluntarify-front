import styled, { css } from 'styled-components'
import { ButtonProps } from './Button'

export const Wrapper = styled.button<
  Omit<ButtonProps, 'loading'> & { $loading?: boolean }
>`
  ${({ theme, disabled, size }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background-color: ${disabled
      ? theme.colors.neutral.light
      : theme.colors.info.light};
    line-height: ${theme.typography.lineHeight.none};
    color: ${theme.colors.text.light};
    border-radius: ${theme.shapes.borderRadius.sm};
    padding-right: ${theme.spacings.md};
    padding-left: ${theme.spacings.md};
    min-width: ${theme.spacings[36]};
    height: ${theme.spacings[14]};
    font-size: ${theme.typography.sizes.sm};
    font-family: ${theme.typography.family.primary};
    font-weight: ${theme.typography.weight.medium};
    letter-spacing: ${theme.typography.spacing.wide};
    line-height: ${theme.typography.lineHeight.none};
    border: none;
    transition-property: all;
    transition-timing-function: ${theme.transitions.timing['ease-linear']};
    transition-duration: ${theme.transitions.duration[200]};
    gap: ${size === 'sm' ? theme.spacings.xxs : theme.spacings.xs};

    :hover {
      background-color: ${theme.colors.info.xlight};
    }
  `}

  ${({ theme, styleType, disabled }) =>
    styleType === 'outlined' &&
    css`
      background-color: transparent;
      border-style: solid;
      border-width: ${theme.shapes.borderWidth.md};
      border-color: ${
        disabled ? theme.colors.neutral.light : theme.colors.info.light
      };
      color: ${disabled ? theme.colors.neutral.light : '#000'};
    };
      :hover {
        background-color: transparent;
        border-color: ${theme.colors.info.xlight};
        color: ${theme.colors.info.xlight};
      }
    `}

  ${({ theme, styleType, disabled }) =>
    styleType === 'text' &&
    css`
      background-color: transparent;
      color: ${disabled ? theme.colors.neutral.light : theme.colors.info.light};
      :hover {
        background-color: transparent;
        color: ${theme.colors.info.xlight};
      }
    `}

  ${({ theme, size }) =>
    size === 'lg' &&
    css`
      min-width: ${theme.spacings[44]};
      height: ${theme.spacings[16]};
      padding-right: ${theme.spacings.lg};
      padding-left: ${theme.spacings.lg};
    `}

  ${({ theme, size }) =>
    size === 'sm' &&
    css`
      min-width: ${theme.spacings[24]};
      height: ${theme.spacings[11]};
      font-size: ${theme.typography.sizes.xs};
      padding-right: ${theme.spacings.xs};
      padding-left: ${theme.spacings.xs};
    `}

  ${({ disabled, $loading }) =>
    (disabled || $loading) &&
    css`
      pointer-events: none;
    `}
`
