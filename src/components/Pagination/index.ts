import ReactPaginate from 'react-paginate'
import styled, { css } from 'styled-components'

export const Pagination = styled(ReactPaginate)`
  ${({ theme }) => css`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    list-style-type: none;
    color: ${theme.colors.text.dark};
    font-weight: ${theme.typography.weight.medium};
    li {
      cursor: pointer;
      min-width: 28px;
      height: 28px;
      a {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${theme.spacings.xxs};
        line-height: ${theme.typography.lineHeight.none};
      }
      gap: ${theme.spacings.xs};

      &.previous,
      &.next {
        color: ${theme.colors.primary.dark};
      }
      &.selected {
        border: ${theme.shapes.borderWidth.sm} solid
          ${theme.colors.primary.dark};
        border-radius: ${theme.shapes.borderRadius.sm};
      }
      &.disabled {
        cursor: default;
        color: ${theme.colors.text.mutted};
      }
    }
  `}
`
