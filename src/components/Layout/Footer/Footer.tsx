import { ReactNode } from 'react'
import { Flex } from 'components/Flex'
import { Button, ButtonProps } from 'components/Button'
import * as S from './Footer.styles'

export interface FooterButtonProps extends ButtonProps {
  label: string
}

export interface FooterProps {
  content?: ReactNode
  primaryButton?: FooterButtonProps
  secundaryButton?: FooterButtonProps
  shadow?: boolean
}

export const Footer = ({
  content,
  primaryButton,
  secundaryButton,
  shadow,
}: FooterProps) => (
  <S.Wrapper shadow={shadow}>
    <Flex align='center' gap='xl'>
      {!!secundaryButton && (
        <Button styleType='text' size='lg' {...secundaryButton}>
          {secundaryButton.label}
        </Button>
      )}
      {!!primaryButton && (
        <Button size='lg' {...primaryButton}>
          {primaryButton.label}
        </Button>
      )}
    </Flex>
    {content}
  </S.Wrapper>
)
