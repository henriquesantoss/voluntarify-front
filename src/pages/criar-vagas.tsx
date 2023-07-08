import axios from 'axios'
import { Card } from 'components/Card'
import { Flex } from 'components/Flex'
import { Heading, Text } from 'components/Typography'
import { ROUTES, createRoute } from 'constants/routes'
import { useWindowSize } from 'hooks/useWindowsSize'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import jwt from 'jsonwebtoken'
import { Button } from 'components/Button'
import { Sidebar } from 'components/Layout/Sidebar'

interface TaskFormData {
  titulo: string
  descricao: string
}

interface Task {
  id: number
  titulo: string
  descricao: string
}

const CreatedVaga = () => {
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
      const response = await axios.get('http://localhost:8050/vaga', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      setTasks(response.data)
      console.log(tasks)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFormSubmit: SubmitHandler<TaskFormData> = async (data) => {
    try {
      await axios.post('http://localhost:8050/vaga', data)
      fetchTasks()
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Flex direction='column' gap={10}>
        <Sidebar />
        <Flex
          gap={44}
          direction={width && width > breakpoints.lg ? 'row' : 'column'}
        >
          <Flex fill='both' direction='column'>
            <Heading as='h2'>Criar vaga</Heading>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Flex direction='column' gap='sm'>
                <input
                  {...register('titulo', { required: true })}
                  type='text'
                  placeholder='titulo'
                />
                <input
                  {...register('descricao', { required: true })}
                  type='text'
                  placeholder='descricao'
                />
                <Button type='submit'>Adicionar</Button>
              </Flex>
            </form>
          </Flex>
          <Flex
            fill='both'
            gap={'md'}
            direction='column'
            overflow='auto'
            fixedSize={{ vertical: '850px' }}
          >
            <Heading as='h2'>Vagas</Heading>
            {tasks.map((vaga) => (
              <Card
                title={`titulo: ${vaga.titulo}`}
                sizeTitle='big'
                key={vaga.id}
              >
                <Text>Descrição: {vaga.descricao}</Text>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default CreatedVaga
