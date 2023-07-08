import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Bubble } from 'components/Bubble'
import { Flex } from 'components/Flex'
import { Icon, IconsType } from 'components/Icon'
import { Text } from 'components/Typography'
import * as S from './MenuSidebar.styles'

type MenuSidebarConditionalProps =
  | {
      subMenu: {
        href: string
        label: string
      }[]
      href?: never
    }
  | {
      subMenu?: never
      href: string
    }

interface MenuSidebarCommonProps {
  icon: IconsType
  title?: string
  label: string
  onClick?: () => void
  nameGroup?: string
  typePerfil?: string
  notification?: number
}
export type MenuSidebarProps = MenuSidebarCommonProps &
  MenuSidebarConditionalProps

export const MenuSidebar = ({
  icon,
  href,
  onClick,
  title,
  subMenu,
  notification,
}: MenuSidebarProps) => {
  const routes = useRouter()
  const subMenuSelected = subMenu?.find(({ href }) =>
    routes.route.startsWith(href),
  )
  const [showDetail, setShowDetail] = useState(!!subMenuSelected)
  return (
    <>
      <Flex direction='column' align='center'>
        <S.Wrapper
          $active={
            (href && routes?.route.startsWith(href)) || !!subMenuSelected
          }
        >
          <Flex fill='horizontal'>
            <Flex
              onClick={() => setShowDetail(!showDetail)}
              fill='horizontal'
              justify='space-between'
            >
              {subMenu ? (
                <Flex gap='xs' align='center' fill='horizontal'>
                  <Icon
                    size='md'
                    color={!!subMenuSelected ? 'main' : 'inherit'}
                    as={icon}
                    onClick={onClick}
                  />
                  <Text
                    weight='bold'
                    color={!!subMenuSelected ? 'primary' : 'main'}
                    size='small'
                    className='menu-button-title'
                  >
                    {title}
                  </Text>
                </Flex>
              ) : (
                <Link href={href}>
                  <Flex gap='xs' align='center' fill='horizontal'>
                    <Icon
                      size='md'
                      color={!!subMenuSelected ? 'main' : 'inherit'}
                      as={icon}
                      onClick={onClick}
                    />
                    <Text
                      weight='bold'
                      color={
                        routes?.route.startsWith(href) ? 'primary' : 'main'
                      }
                      size='small'
                      className='menu-button-title'
                    >
                      {title}
                    </Text>
                  </Flex>
                </Link>
              )}

              {!!notification && (
                <Bubble>{notification > 99 ? '99+' : notification}</Bubble>
              )}
              {subMenu && (
                <Icon
                  color={!showDetail ? 'gray' : 'main'}
                  as={showDetail ? 'chevron-up' : 'chevron-down'}
                />
              )}
            </Flex>
          </Flex>
        </S.Wrapper>
        {subMenu && (
          <div>
            <S.SubMenuContent
              margin={showDetail ? { top: 'md' } : undefined}
              gap='md'
              direction='column'
              $open={showDetail}
            >
              {subMenu?.map((item) => (
                <Link href={item.href} key={item.href}>
                  <S.ContainerText
                    size='small'
                    color={!!subMenuSelected ? 'contrast' : 'main'}
                    $active={subMenuSelected?.href === item.href && showDetail}
                  >
                    {item.label}
                  </S.ContainerText>
                </Link>
              ))}
            </S.SubMenuContent>
          </div>
        )}
      </Flex>
    </>
  )
}
