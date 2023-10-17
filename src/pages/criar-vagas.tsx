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
  titulo?: string
  descricao?: string
}

interface Task {
  id: number
  titulo: string
  descricao: string
  empresaId: string
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
  const [userId, setUserId] = useState<string>('')
  const [val, setVal] = useState<string>('')
  const [editingVaga, setEditingVaga] = useState<Task | null>(null) // Adicionado para controle de edição

  useEffect(() => {
    const fetchData = async () => {
      const token: string | null = localStorage.getItem('accessToken')

      try {
        console.log('token=> ', token)
        if (token) {
          const decodedToken: any = jwt.decode(token)
          console.log(decodedToken)
          setUserId(decodedToken.id)
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
      const response = await axios.get('https://voluntarify-api.onrender.com/vaga', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      setTasks(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFormSubmit: SubmitHandler<TaskFormData> = async (data) => {
    try {
      const vagaData = {
        ...data,
        empresaId: userId,
      }
      await axios.post('https://voluntarify-api.onrender.com/vaga', vagaData)
      fetchTasks()
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditClick = (vaga: Task) => {
    if (vaga.empresaId === userId) {
      setEditingVaga(vaga)
    } else {
      // Você pode exibir uma mensagem de erro ou fazer o que preferir quando o usuário não tem permissão para editar esta vaga.
    }
  }

  const handleCancelEdit = () => {
    setEditingVaga(null)
  }

  const handleUpdateVaga = async (updatedData: TaskFormData) => {
    try {
      if (editingVaga && editingVaga.empresaId === userId) {
        await axios.put(
          `https://voluntarify-api.onrender.com/vaga/${editingVaga.id}`,
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          },
        )
        fetchTasks()
        setEditingVaga(null)
      } else {
        // Mensagem de erro se o usuário não tem permissão para editar esta vaga.
      }
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
                {editingVaga === vaga ? (
                  <form onSubmit={handleSubmit(handleUpdateVaga)}>
                    <Flex gap='md' direction='column'>
                      <input
                        {...register('titulo', { required: true })}
                        type='text'
                        placeholder='titulo'
                        defaultValue={vaga.titulo}
                      />
                      <input
                        {...register('descricao', { required: true })}
                        type='text'
                        placeholder='descricao'
                        defaultValue={vaga.descricao}
                      />
                      <Button type='submit'>Atualizar</Button>
                      <Button onClick={handleCancelEdit}>Cancelar</Button>
                    </Flex>
                  </form>
                ) : (
                  <>
                    <Text>Descrição: {vaga.descricao}</Text>
                    {vaga.empresaId === userId ? (
                      <Button onClick={() => handleEditClick(vaga)}>
                        Editar
                      </Button>
                    ) : null}
                  </>
                )}
              </Card>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default CreatedVaga
