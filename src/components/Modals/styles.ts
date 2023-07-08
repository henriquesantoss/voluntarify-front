import styled, { css, keyframes } from 'styled-components'
import { Flex } from 'components/Flex'
import { theme } from 'styles/theme/main'
import { MODAL_TYPES } from 'constants/modals'

export const Overlay = styled(Flex)<{ isOpen: boolean }>`
  ${({ theme, isOpen }) => css`
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: ${theme.layers.modal};
    background-color: ${theme.colors.neutral.black};
    opacity: 0.5;
    transition-property: all;
    transition: ${theme.animationTimings.transition.slow};

    ${!isOpen &&
    css`
      display: none;
    `}
  `}
`
export const ContentContainer = styled(Flex)`
  ${({ theme }) => css`
    overflow: auto;
    padding: 0 ${theme.spacings.xs};
  `}
`
export const ModalLayout = styled(Flex)<{
  backgroundColor?: keyof typeof theme.colors.background
}>`
  ${({ theme, backgroundColor }) =>
    backgroundColor !== undefined &&
    css`
      background-color: ${theme.colors.background[backgroundColor]};
    `}
`

export const ModalContainer = styled.div<{
  modalType: MODAL_TYPES
  isOpen: boolean
}>`
  ${({ theme, modalType = MODAL_TYPES.CENTER }) => css`
    position: absolute;
    z-index: ${theme.layers.modal};

    box-shadow: ${theme.effects.boxShadow.md};

    ${modalType === MODAL_TYPES.SIDE
      ? css`
          background-color: ${theme.colors.background.main};
          top: 0;
          right: 0;
          height: 100%;
          width: 85%;
          animation-duration: 300ms;
          animation-name: ${keyframes`from { width: 0 }`};
        `
      : css`
          max-height: 90%;
          overflow: auto;
          background-color: ${theme.colors.background.light};
          border-radius: ${theme.shapes.borderRadius.md};
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-duration: 300ms;
          animation-name: ${theme.animations.show};
        `};
  `}
`
