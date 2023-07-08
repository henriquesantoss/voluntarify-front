import { ReactNode, useEffect } from 'react'
import { Flex } from 'components/Flex'
import { TextLogo } from 'components/Logo'
import { INITIAL_PAGE, ROUTES } from 'constants/routes'
import * as S from './LoginPage.styles'
import { Text } from 'components/Typography'
import Link from 'next/link'
import Image from 'next/image'
import { theme } from 'styles/theme/main'
import { useWindowSize } from 'hooks/useWindowsSize'

export const LoginPage = ({ children }: { children: ReactNode }) => {
  const { width, breakpoints } = useWindowSize()

  return (
    <>
      <Flex fill='both'>
        {/* {width && width <= breakpoints.sm ? (
          ''
        ) : (
          <Flex fill='both' fixedSize={{ horizontal: '500px' }}>
            <Image
              src='/login-image.jpg'
              width='500'
              height='200'
              objectFit='cover'
            />
          </Flex>
        )} */}
        <S.Wrapper
          fill='both'
          align='center'
          justify='center'
          direction='column'
        >
          <S.FormContainer fill='horizontal' direction='column' gap={12}>
            <Flex direction='column' align='flex-start' gap='sm'>
              <TextLogo />
              <Flex direction='column' gap='xs'>
                <Text size='small' align='left' weight='medium'>
                  Novo por aqui?
                </Text>
                <Flex direction='column'>
                  <Link href={ROUTES.CADASTRO_VOLUNTARY.url}>
                    <S.TextContainer size='small' weight='bold'>
                      Crie sua conta Voluntario agora
                    </S.TextContainer>
                  </Link>
                  <Link href={ROUTES.CADASTRO_COMPANY.url}>
                    <S.TextContainer size='small' weight='bold'>
                      Crie sua conta Empresa/Ong agora
                    </S.TextContainer>
                  </Link>
                </Flex>
              </Flex>
            </Flex>
            {children}
            <Flex direction='column'>
              <Link href={ROUTES.EMAIL.url}>
                <S.TextContainer size='small' weight='bold'>
                  Esqueci a senha{' '}
                </S.TextContainer>
              </Link>
            </Flex>
          </S.FormContainer>
        </S.Wrapper>
      </Flex>
    </>
  )
}
