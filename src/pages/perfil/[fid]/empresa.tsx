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

interface User {
  razao_social: string
  nome_fantasia: string
  email: string
  telefone: string
  cnpj: string
  endereco: string
  cidade: string
  bairro: string
  end_num: string
  cep: string
  uf: string
  descricao: string
}

const Perfil = () => {
  const router = useRouter()
  const { fid } = router.query
  const index = router.query.fid
  const [user, setUser] = useState<User | null>(null)
  const [userId, setUserId] = useState<string | undefined>(
    index as string | undefined,
  )
  const { width, breakpoints } = useWindowSize()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8050/empresa/${index}`,
        )
        const userData = response.data
        setUser(userData)
      } catch (error) {
        console.error('Erro ao obter informações do usuário.', error)
      }
    }

    fetchUser()
  }, [index])

  return (
    <Flex direction='column' fill='horizontal' gap='md'>
      <Sidebar />
      <Flex direction='column' gap='md' align='center' justify='center'>
        <h1>Perfil</h1>
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
          <Avatar
            size={10}
            alt='image
          '
          />
          {user ? (
            <p>Nome: {user.razao_social}</p>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
          {user ? (
            <p>email: {user.email}</p>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
          {user ? (
            <p>apelido: {user.nome_fantasia}</p>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
          {user ? (
            <p>celular: {user.telefone}</p>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
          {user ? (
            <p>cidade: {user.cidade}</p>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
          {user ? (
            <p>bairro: {user.bairro}</p>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
          {user ? <p>cep: {user.cep}</p> : <p>Nenhum usuário encontrado.</p>}
          {user ? (
            <p>endereço: {user.endereco}</p>
          ) : (
            <p>Nenhum endereco encontrado.</p>
          )}
          {user ? (
            <p>numero: {user.end_num}</p>
          ) : (
            <p>Nenhum numero encontrado.</p>
          )}
          {user ? <p>uf: {user.uf}</p> : <p>Nenhum usuário encontrado.</p>}
          {user ? (
            <p>descrção: {user.descricao}</p>
          ) : (
            <p>Nenhum descricao encontrado.</p>
          )}
          <Link
            href={
              index ? createRoute(index, ROUTES.EDIT_PERFIL_COMPANY.url) : '#'
            }
          >
            <Button>Editar Perfil</Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Perfil
