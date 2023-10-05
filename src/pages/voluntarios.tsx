import axios from 'axios'
import { ROUTES, createRoute } from 'constants/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import jwt from 'jsonwebtoken'
import { Page } from 'components/Page'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Icon } from 'components/Icon'
import a3 from 'pages/inicio-empresa'
import { Flex } from 'components/Flex'
import { Button } from 'components/Button'
import { Sidebar } from 'components/Layout/Sidebar'
import { Avatar } from 'components/Avatar'
import { useWindowSize } from 'hooks/useWindowsSize'
import { Card } from 'components/Card'

interface User {
  name: string
  email: string
  celular: string
}

const Perfil = () => {
  const router = useRouter()
  const [user, setUser] = useState<[User]>()

  const { width, breakpoints } = useWindowSize()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8050/voluntario`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        const userData = response.data
        setUser(userData)
      } catch (error) {
        console.error('Erro ao obter informações do usuário.', error)
      }
    }

    fetchUser()
  }, [])

  return (
    <Flex direction='column' fill='horizontal' gap='md'>
      <Sidebar />
      <Flex direction='column' gap='md' align='center' justify='center'>
        <h1>VOLUNTARIOS</h1>

        <Flex
          justify='center'
          align='center'
          fixedSize={
            width && width >= breakpoints.sm
              ? { horizontal: '500px' }
              : { horizontal: '300px' }
          }
          direction='column'
          gap={'sm'}
          style={{ border: '1px solid #000', padding: '30px' }}
        >
          {user &&
            user.map((use) => (
              <Card>
                <p>{`Nome: ${use.name} `}</p>
                <p>{`E-mail: ${use.email} `}</p>
                <p>{`Telefone: ${use.celular} `}</p>
              </Card>
            ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Perfil
