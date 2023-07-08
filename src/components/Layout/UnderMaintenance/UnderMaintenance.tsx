import Image from 'next/image'
import { useWindowSize } from 'hooks/useWindowsSize'
import { Flex } from 'components/Flex'
import { TextLogo } from 'components/Logo'
import { Text } from 'components/Typography'
import { Hyperlink } from 'components/Typography/Hyperlink'
import * as S from './UnderMaintenance.styles'

export const UnderMaintenance = () => {
  const { width, breakpoints } = useWindowSize()
  return (
    <Flex fill='both'>
      <S.Wrapper fill='both' align='center' justify='center' direction='column'>
        <S.TextContainer align='center' direction='column' gap={12}>
          <Flex justify='center'>
            <TextLogo />
          </Flex>
          <Flex gap='xs' direction='column' align='center'>
            <Text size='small' weight='bold'>
              Estamos implementando melhorias no Portal.
            </Text>
            <Text align='center' size='small'>
              O acesso ao nosso sistema ficará indisponível por um período. Para
              mais informações entre em contato pelo e-mail
              <Hyperlink href='mailto:alpa@alpargatas.com.br'>
                {' '}
                alpa@alpargatas.com.br.
              </Hyperlink>
            </Text>
          </Flex>
        </S.TextContainer>
      </S.Wrapper>
      {width && width >= breakpoints.md && (
        <Flex fill='horizontal' style={{ position: 'relative' }}>
          <Image
            layout='fill'
            objectFit='cover'
            objectPosition='left'
            alt='Muitas sandálias havainas roxas'
            src={`/banner-maintenance.jpg`}
          />
        </Flex>
      )}
    </Flex>
  )
}
