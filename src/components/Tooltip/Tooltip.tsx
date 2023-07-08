import { ReactNode, RefAttributes } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as S from './Tooltip.styles'

type TooltipSides = 'left' | 'right' | 'top' | 'bottom'

const TooltipContent = ({
  children,
  ...props
}: TooltipPrimitive.TooltipContentProps & RefAttributes<HTMLDivElement>) => {
  return (
    <TooltipPrimitive.Portal>
      <S.Content style={{ zIndex: 40 }} {...props}>
        {children}
        <S.StyledArrow />
      </S.Content>
    </TooltipPrimitive.Portal>
  )
}

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  side?: TooltipSides
}

export const Tooltip = ({ content, children, side }: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider delayDuration={400}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <div>{children}</div>
        </TooltipPrimitive.Trigger>
        <TooltipContent side={side} sideOffset={5}>
          {content}
        </TooltipContent>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
