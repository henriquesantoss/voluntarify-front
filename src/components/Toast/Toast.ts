import { ToastContainer } from 'react-toastify'
import styled, { css } from 'styled-components'

export const Toast = styled(ToastContainer)`
  ${({ theme }) => css`
    .Toastify__toast {
      border-radius: ${theme.shapes.borderRadius.sm};
      min-height: 0;
    }
    .Toastify__toast--success {
      background: ${theme.colors.success.xlight};
    }
    .Toastify__toast--error {
      background: ${theme.colors.error.light};
    }
    .Toastify__toast--info {
      background: ${theme.colors.info.xlight};
    }
    .Toastify__toast--warning {
      background: ${theme.colors.warning.light};
    }
    .Toastify__toast-body {
      color: ${theme.colors.text.dark};
      font-weight: ${theme.typography.weight.medium};
      font-size: ${theme.typography.sizes.sm};
      margin: 0;
    }
  `}
`
