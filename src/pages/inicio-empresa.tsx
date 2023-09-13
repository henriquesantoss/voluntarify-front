import axios from 'axios'
import { Card } from 'components/Card'
import { Flex } from 'components/Flex'
import { Page } from 'components/Page'
import { Heading, Text } from 'components/Typography'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import { ROUTES, createRoute } from 'constants/routes'
import { toast } from 'react-toastify'
import { Icon } from 'components/Icon'
import { Sidebar } from 'components/Layout/Sidebar'
import { useWindowSize } from 'hooks/useWindowsSize'
import * as S from 'components/Page/Page.styles'

import { Button } from 'components/Button'
import Image from 'next/image'
import { Avatar } from 'components/Avatar'
interface TaskFormData {
  titulo: string
  tarefa: string
}

interface Task {
  id: number
  titulo: string
  tarefa: string
}

const a3: NextPage = () => {
  const { width, breakpoints } = useWindowSize()

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [userId, setUserId] = useState('')
  const [val, setVal] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const token: string | null = localStorage.getItem('accessToken')

      try {
        console.log('token=> ', token)
        if (token) {
          const decodedToken: any = jwt.decode(token)
          console.log(decodedToken)
          const id = decodedToken.id
          const response = await axios.get(
            `http://localhost:8050/empresa/${id}`,
          )
          const data = response.data
          setUserId(data.id)
          setVal(data.razao_social)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8050/vagas')
      setTasks(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFormSubmit: SubmitHandler<TaskFormData> = async (data) => {
    try {
      await axios.post('http://localhost:8050/vagas', data)
      fetchTasks()
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  if (userId === undefined || userId === null) {
    toast.error('Acesso negado.', {
      icon: <Icon color='error' as='error' />,
      autoClose: 1500,
    })
    router.push('/inicio')
  }

  return (
    <>
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
              {userId === undefined ||
                (userId === null && (
                  <Flex
                    gap='sm'
                    justify={
                      width && width >= breakpoints.md ? 'flex-start' : 'center'
                    }
                  >
                    <Button>Login</Button>
                    <Button styleType='outlined'>Sign Up</Button>
                  </Flex>
                ))}
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
              <Text align='center'>Design</Text>
            </Flex>
          </Flex>
        </S.backgroundImage>
      </Flex>
    </>
  )
}

export default a3
