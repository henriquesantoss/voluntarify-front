import { ReactNode } from 'react'
import { Text } from 'components/Typography'
import * as S from './Bubble.styles'

interface BubbleProps {
  children: ReactNode
  backgroundLight?: boolean
}

export const Bubble = ({ children, backgroundLight }: BubbleProps) => (
  <S.Wrapper $backgroundLight={!!backgroundLight}>
    <Text size='small' weight='bold'>
      {children}
    </Text>
  </S.Wrapper>
)
