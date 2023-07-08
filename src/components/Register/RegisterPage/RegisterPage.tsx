import { ReactNode, useEffect } from 'react'
import { Flex } from 'components/Flex'
import { TextLogo } from 'components/Logo'
import { INITIAL_PAGE, ROUTES } from 'constants/routes'
import * as S from './RegisterPage.styles'
import { Heading, Text } from 'components/Typography'
import Link from 'next/link'
import Image from 'next/image'
import { useWindowSize } from 'hooks/useWindowsSize'

export const RegisterPage = ({ children }: { children: ReactNode }) => {
  const { width, breakpoints } = useWindowSize()
  return (
    <Flex fill='both'>
      {/* {width && width <= breakpoints.sm ? (
        ''
      ) : (
        <Flex fill='both' fixedSize={{ horizontal: '500px' }}>
          <Image
            src='/login-image.jpg'
            width='500'
            height='300px'
            objectFit='cover'
          />
        </Flex>
      )} */}
      <S.Wrapper fill='both' align='center' justify='center' direction='column'>
        <S.FormContainer fill='horizontal' direction='column' gap={12}>
          <Flex direction='column' gap='sm'>
            <Heading as='h1' weight='bold'>
              Comece agora mesmo!
            </Heading>
            <Flex direction='column' gap='xs'>
              <Text size='small' weight='light' color='main'>
                Você faz a diferença
              </Text>
            </Flex>
          </Flex>
          {children}
        </S.FormContainer>
        <Link href={ROUTES.LOGIN.url}>
          <S.TextContainer size='small' weight='bold'>
            Voltar para login
          </S.TextContainer>
        </Link>
      </S.Wrapper>
    </Flex>
  )
}
