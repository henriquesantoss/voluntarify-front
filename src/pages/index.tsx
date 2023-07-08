import { Flex } from 'components/Flex'
import { Page } from 'components/Page'
import { url } from 'inspector'
import * as S from 'components/Page/Page.styles'
import { Heading, Text } from 'components/Typography'
import { Button } from 'components/Button'
import Head from 'next/head'
import { Icon } from 'components/Icon'
import { LoginPage } from 'components/Login/LoginPage'
import { LoginForm } from 'components/Login/LoginForm'
import { useState, useEffect } from 'react'
import { Sidebar } from 'components/Layout/Sidebar'
import Image from 'next/image'
import { useWindowSize } from 'hooks/useWindowsSize'
import { Avatar } from 'components/Avatar'
import { ROUTES } from 'constants/routes'
import Link from 'next/link'
const Home = () => {
  const { width, breakpoints } = useWindowSize()
  const [userId] = useState()

  const [id, setId] = useState<string | null>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      setId(localStorage.getItem('accesstoken'))
    }
  }, [])

  return (
    // <LoginPage>
    //   <LoginForm />
    // </LoginPage>
    <Flex direction='column' gap={28} style={{ scrollBehavior: 'smooth' }}>
      <Flex fill='horizontal' style={{ position: 'fixed' }}>
        <Sidebar />
      </Flex>
      <Flex
        id='home'
        fill='horizontal'
        direction={width && width >= breakpoints.md ? 'row' : 'column'}
        justify={width && width >= breakpoints.md ? 'space-around' : 'center'}
        align='center'
        style={{ paddingBottom: '230px', paddingTop: '180px' }}
      >
        <Flex direction='column' gap={24}>
          <Text style={{ fontSize: '60px' }} weight='bold'>
            A voluntarify Startup Finder
          </Text>
          <Flex direction='column' gap={10}>
            <Text>
              A startup focada em ações sociais e obtenção de conhecimento na
              sua área de atuação.
            </Text>
            {!id && (
              <Flex
                gap='sm'
                justify={
                  width && width >= breakpoints.md ? 'flex-start' : 'center'
                }
              >
                <Link href={ROUTES.LOGIN.url}>
                  <Button styleType='outlined'>Sign Up</Button>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Image src='/home1.png' height='435px' width='530px' />
      </Flex>

      <Flex
        id='hability'
        fill='horizontal'
        direction='column'
        gap={40}
        style={{
          backgroundColor: '#2A3342',
          paddingBottom: '230px',
          paddingTop: '180px',
        }}
        justify='center'
        align='center'
      >
        <Flex
          direction='column'
          gap='sm'
          align='center'
          style={{ maxWidth: '700px' }}
        >
          <Heading as='h1' color='light'>
            Obtenha mais informações sobre o voluntarify{' '}
          </Heading>
          <Text color='main' align='center'>
            Evite o esgotamento e concentre-se em sua missão conectando-se com
            profissionais voluntários altamente qualificados que fornecerão
            trabalho pro empresas relacionados a obtenção de experiências e
            muito mais.
          </Text>
        </Flex>
        <Flex
          gap={20}
          direction={width && width >= breakpoints.xl ? 'row' : 'column'}
          justify='center'
          align='center'
        >
          <Flex
            fill='horizontal'
            direction='column'
            gap='sm'
            align='center'
            fixedSize={{ horizontal: '360px' }}
          >
            <S.backgroundIcon>
              <Icon color='light' as='arrow-all' />
            </S.backgroundIcon>
            <Heading as='h2' color='light'>
              Simples de se comunicar{' '}
            </Heading>
          </Flex>
          <Flex
            fill='horizontal'
            direction='column'
            gap='sm'
            align='center'
            fixedSize={{ horizontal: '380px' }}
          >
            <S.backgroundIcon>
              <Icon color='light' as='arrow-all' />
            </S.backgroundIcon>
            <Heading color='light' as='h2'>
              Aprimore seus conhecimentos{' '}
            </Heading>
          </Flex>
          <Flex
            fill='horizontal'
            direction='column'
            gap='sm'
            align='center'
            fixedSize={{ horizontal: '360px' }}
          >
            <S.backgroundIcon>
              <Icon color='light' as='arrow-all' />
            </S.backgroundIcon>
            <Heading as='h2' color='light'>
              Pessoas Qualificadas{' '}
            </Heading>
          </Flex>
        </Flex>
        <Flex
          gap={20}
          direction={width && width >= breakpoints.xl ? 'row' : 'column'}
          justify='center'
          align='center'
        >
          <Flex
            fill='horizontal'
            direction='column'
            gap='sm'
            align='center'
            fixedSize={{ horizontal: '360px' }}
          >
            <S.backgroundIcon>
              <Icon color='light' as='arrow-all' />
            </S.backgroundIcon>
            <Heading as='h2' color='light'>
              Ações sociais{' '}
            </Heading>
          </Flex>
          <Flex
            fill='horizontal'
            direction='column'
            gap='sm'
            align='center'
            fixedSize={{ horizontal: '360px' }}
          >
            <S.backgroundIcon>
              <Icon color='light' as='arrow-all' />
            </S.backgroundIcon>
            <Heading as='h2' color='light'>
              Mar de oportunidades{' '}
            </Heading>
          </Flex>
          <Flex
            fill='horizontal'
            direction='column'
            gap='sm'
            align='center'
            fixedSize={{ horizontal: '360px' }}
          >
            <S.backgroundIcon>
              <Icon color='light' as='arrow-all' />
            </S.backgroundIcon>
            <Heading as='h2' color='light'>
              Interface auto-explicativa{' '}
            </Heading>
          </Flex>
        </Flex>
      </Flex>
      <S.backgroundImage
        id='about'
        fill='horizontal'
        direction='column'
        gap={40}
        justify='center'
        align='center'
      >
        <Flex
          direction='column'
          gap='sm'
          align='center'
          style={{ maxWidth: '700px' }}
        >
          <Heading as='h1'>Startup Founders</Heading>
        </Flex>
        <Flex
          gap={'md'}
          direction={width && width >= breakpoints.xl ? 'row' : 'column'}
          justify='center'
          align='center'
        >
          <Flex
            fill='horizontal'
            direction='column'
            gap='sm'
            align='center'
            fixedSize={{ horizontal: '260px' }}
          >
            <Avatar size='50px' alt='fewfw' />
            <Text align='center' size='big'>
              Henrique Santos
            </Text>
            <Text align='center'>CEO & Founder</Text>
          </Flex>
          <Flex
            fill='horizontal'
            direction='column'
            gap='sm'
            align='center'
            fixedSize={{ horizontal: '260px' }}
          >
            <Avatar size='50px' alt='fewfw' />
            <Text align='center' size='big'>
              Rhuan
            </Text>
            <Text align='center'>CEO & Founder</Text>
          </Flex>
          <Flex
            fill='horizontal'
            direction='column'
            gap='sm'
            align='center'
            fixedSize={{ horizontal: '260px' }}
          >
            <Avatar size='50px' alt='fewfw' />
            <Text align='center' size='big'>
              Maria Fernanda{' '}
            </Text>
            <Text align='center'>CPO</Text>
          </Flex>
          <Flex
            fill='horizontal'
            direction='column'
            gap='sm'
            align='center'
            fixedSize={{ horizontal: '260px' }}
          >
            <Avatar size='50px' alt='fewfw' />
            <Text align='center' size='big'>
              Icaro
            </Text>
            <Text align='center'>CTO</Text>
          </Flex>
          <Flex
            fill='horizontal'
            direction='column'
            gap='sm'
            align='center'
            fixedSize={{ horizontal: '260px' }}
          >
            <Avatar size='50px' alt='fewfw' />
            <Text align='center' size='big'>
              Luan{' '}
            </Text>
            <Text align='center'>Vagabundo</Text>
          </Flex>
        </Flex>
      </S.backgroundImage>
    </Flex>
  )
}

export default Home
