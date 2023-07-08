import { ReactNode, RefAttributes } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import Link from 'next/link'
import { Icon, IconsType } from 'components/Icon'
import { Text } from 'components/Typography'
import * as S from './MenuButton.styles'

export interface MenuButtonProps {
  icon: IconsType
  label: string
  active?: boolean
  href?: string
  onClick?: () => void
}

export const MenuButton = ({
  icon,
  label,
  href,
  active = false,
  onClick,
}: MenuButtonProps) => (
  <div>
    {href ? (
      <Link href={href}>
        <S.Wrapper $active={active}>
          <Icon as={icon} onClick={onClick} />
        </S.Wrapper>
      </Link>
    ) : (
      <S.Wrapper $active={active}>
        <Icon as={icon} onClick={onClick} />
      </S.Wrapper>
    )}
  </div>
)
