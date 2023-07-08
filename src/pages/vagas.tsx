import axios from 'axios'
import { Card } from 'components/Card'
import { Flex } from 'components/Flex'
import { Page } from 'components/Page'
import { Heading, Text } from 'components/Typography'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import { ROUTES, createRoute } from 'constants/routes'
import { toast } from 'react-toastify'
import { Icon } from 'components/Icon'
import { Wrapper } from 'components/Input/Input.styles'
import { Sidebar } from 'components/Layout/Sidebar'
interface TaskFormData {
  titulo: string
  tarefa: string
}

interface Task {
  id: number
  titulo: string
  descricao: string
}

const Vacancies: NextPage = () => {
  const router = useRouter()

  const [tasks, setTasks] = useState<Task[]>([])
  const [userId, setUserId] = useState('')
  const [val, setVal] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

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
      const response = await axios.get('http://localhost:8050/vaga ', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      setTasks(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  if (!tasks) {
    return <p>Carregando...</p>
  }

  return (
    <Flex fill='both' gap={'md'} direction='column'>
      <Flex fill='horizontal'>
        <Sidebar />
      </Flex>

      <Wrapper direction='column'>
        <Text>Busque a vaga</Text>
        <input
          type='text'
          value={searchValue}
          placeholder='Busque sua vaga'
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Wrapper>

      <Heading as='h2'>Vagas</Heading>
      <Flex
        fill='both'
        direction='column'
        gap='sm'
        overflow='auto'
        fixedSize={{ vertical: '850px' }}
      >
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
            </Card>
          ))
        )}
      </Flex>
    </Flex>
  )
}

export default Vacancies
