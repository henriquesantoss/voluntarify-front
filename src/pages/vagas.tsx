import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'
import { Card } from 'components/Card'
import { Flex } from 'components/Flex'
import { Text, Heading } from 'components/Typography'
import { Button } from 'components/Button'
import { Icon } from 'components/Icon'
import { Sidebar } from 'components/Layout/Sidebar'

interface Task {
  id: number
  titulo: string
  descricao: string
}

const Vacancies = () => {
  const router = useRouter()

  const [tasks, setTasks] = useState<Task[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [favoriteVagas, setFavoriteVagas] = useState<number[]>([])
  const [userId, setUserId] = useState('')
  const [isFavorited, setIsFavorited] = useState<{ [key: number]: boolean }>({})

  const [isSubscribed, setIsSubscribed] = useState<{ [key: number]: boolean }>(
    {},
  )

  useEffect(() => {
    const fetchData = async () => {
      const token: string | null = localStorage.getItem('accessToken')

      try {
        if (token) {
          const decodedToken: any = await jwt.decode(token)
          setUserId(decodedToken.id)
          console.log(userId)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
    fetchTasks()
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    const filteredTasks = tasks.filter((task) =>
      task.titulo.toLowerCase().includes(searchValue.toLowerCase()),
    )
    setFilteredTasks(filteredTasks)
  }, [searchValue, tasks])

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8050/vaga', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      setTasks(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCadasterClick = async (vagaId: number) => {
    try {
      if (isSubscribed[vagaId]) {
        await axios.delete(`http://localhost:8050/uservagas/${vagaId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })

        setIsSubscribed({ ...isSubscribed, [vagaId]: false })
      } else {
        await axios.post(
          `http://localhost:8050/uservagas/`,
          {
            vagaId: vagaId,
            voluntarioId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          },
        )

        setIsSubscribed({ ...isSubscribed, [vagaId]: true })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleFavoriteClick = async (vagaId: number) => {
    try {
      if (isFavorited[vagaId]) {
        await axios.delete(`http://localhost:8050/favoritos/${vagaId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        setIsFavorited({ ...isFavorited, [vagaId]: false })
      } else {
        await axios.post(
          `http://localhost:8050/favoritar`,
          {
            vagaId: vagaId,
            voluntarioId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          },
        )
        setIsFavorited({ ...isFavorited, [vagaId]: true })
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!tasks) {
    return <p>Carregando...</p>
  }

  return (
    <Flex fill='both' gap={24} direction='column'>
      <Flex fill='horizontal' style={{ position: 'fixed' }}>
        <Sidebar />
      </Flex>
      <Heading as='h2'>Vagas</Heading>
      <Flex
        fill='both'
        direction='column'
        gap='sm'
        overflow='auto'
        fixedSize={{ vertical: '850px' }}
      >
        <Text>Busque a vaga</Text>
        <input
          type='text'
          value={searchValue}
          placeholder='Busque sua vaga'
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {filteredTasks.length === 0 ? (
          <p>Nenhuma vaga encontrada.</p>
        ) : (
          filteredTasks.map((vaga) => (
            <Card
              title={`Vaga: ${vaga.titulo}`}
              sizeTitle='extra-large'
              key={vaga.id}
            >
              <Text>{`Descrição: ${vaga.descricao}`}</Text>
              <Flex margin={{ top: 10 }} align='center' gap='lg'>
                <Button onClick={() => handleCadasterClick(vaga.id)}>
                  {isSubscribed[vaga.id]
                    ? 'Desinscrever-se da Vaga'
                    : 'Cadastrar Vaga'}
                </Button>
                <Icon
                  color='error'
                  as={isFavorited[vaga.id] ? 'heart-filled' : 'heart'}
                  onClick={() => handleFavoriteClick(vaga.id)}
                />
              </Flex>
            </Card>
          ))
        )}
      </Flex>
    </Flex>
  )
}

export default Vacancies
