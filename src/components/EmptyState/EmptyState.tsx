import { ReactNode } from 'react'
import { Flex } from 'components/Flex'
import { Button } from 'components/Button'
import { Heading, Text } from 'components/Typography'
import * as S from './EmptyState.styles'
interface EmptyStateProps {
  title?: string
  description: string
  banner?: ReactNode
  primaryButton?: {
    label: string
    onClick: () => void
  }
}

export const EmptyState = ({
  banner,
  title,
  description,
  primaryButton,
}: EmptyStateProps) => (
  <Flex fill='both' align='center' justify='center' direction='column' gap='xs'>
    {banner && <S.ContainerBanner>{banner}</S.ContainerBanner>}
    <Heading as='h5'>{title}</Heading>
    <Text align='center' size='nano' color='mutted' weight='medium'>
      {description}
    </Text>
    {primaryButton && (
      <Button onClick={primaryButton.onClick}>{primaryButton.label}</Button>
    )}
  </Flex>
)
