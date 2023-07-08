import { ReactNode } from 'react'
import { Flex } from 'components/Flex'
import { Icon, IconsType } from 'components/Icon'
import { Tooltip } from 'components/Tooltip'
import { Text } from 'components/Typography'
import { Sizes } from 'components/Typography/Text/Text.styles'
import { theme } from 'styles/theme/main'
import * as S from './Card.styles'

interface CardProps {
  title?: ReactNode
  titleWarning?: string
  titleVertical?: boolean
  children: ReactNode
  rightContent?: IconsType
  leftContent?: IconsType
  rightConentBackground?: IconsType
  sizeTitle?: Sizes
  fill?: boolean
  iconLeft?: boolean
  forceTitleHeight?: boolean
  backgroundColor?: keyof typeof theme.colors.background
}

export const Card = ({
  title,
  titleWarning,
  titleVertical,
  children,
  rightContent,
  leftContent,
  sizeTitle = 'small',
  fill,
  forceTitleHeight,
  iconLeft,
  rightConentBackground,
  backgroundColor = 'light',
}: CardProps) => (
  <S.Wrapper $fill={fill} backgroundColor={backgroundColor}>
    {!!title && (
      <S.TitleContainer iconLeft={iconLeft} forceTitleHeight={forceTitleHeight}>
        <Flex direction='column' gap='px'>
          {!!leftContent && !titleVertical && (
            <S.BackgroundContentIcon>
              <Icon as={leftContent} size='md' color='dark-primary' />
            </S.BackgroundContentIcon>
          )}
          <Text size={sizeTitle} weight='bold' limitLines={2}>
            {title}
          </Text>
          {!!leftContent && titleVertical && (
            <Flex gap={11} align='center'>
              <S.BackgroundContentIcon titleVertical={titleVertical}>
                <Icon as={leftContent} size='md' color='dark-primary' />
              </S.BackgroundContentIcon>
              <Text size={sizeTitle} weight='bold' limitLines={2}>
                {title}
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex>
          {!!rightContent && (
            <Icon as={rightContent} size='lg' color='dark-primary' />
          )}
          {!!rightConentBackground && (
            <S.BackgroundContentIcon>
              <Icon as={rightConentBackground} size='lg' color='contrast' />
            </S.BackgroundContentIcon>
          )}
          {!!titleWarning && (
            <Tooltip content={titleWarning}>
              <Icon as='info' size='sm' color='dark-primary' />
            </Tooltip>
          )}
        </Flex>
      </S.TitleContainer>
    )}

    {children}
  </S.Wrapper>
)
