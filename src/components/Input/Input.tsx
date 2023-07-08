import { InputHTMLAttributes, ReactNode } from 'react'
import { Icon } from 'components/Icon'
import * as S from './Input.styles'
import { Text } from 'components/Typography'
import { Flex } from 'components/Flex'
import { WarningIcon } from 'components/Icons'
import { Tooltip } from 'components/Tooltip'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  titleWarning?: ReactNode
}

export const Input = ({ label, titleWarning, ...restProps }: InputProps) => {
  return (
    <>
      <Flex align='center' fill='vertical' justify='space-between'>
        <Text size='small' color='dark' weight='bold'>
          {label}
        </Text>
        {!!titleWarning && (
          <Tooltip content={titleWarning}>
            <Icon as='info' size='sm' color='dark-primary' />
          </Tooltip>
        )}
      </Flex>
      <S.Wrapper>
        <input {...restProps} />
      </S.Wrapper>
    </>
  )
}
