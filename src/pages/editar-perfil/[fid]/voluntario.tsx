import axios from 'axios'
import { ROUTES } from 'constants/routes'
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

interface VolunteerData {
  name: string
  email: string
  cpf: string
  celular: string
  password: string
}

const Perfil = () => {
  const router = useRouter()
  const [a, setA] = useState()
  const [userId] = useState()
  const id = router.query.fid

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VolunteerData>()

  const onSubmit = async (data: VolunteerData) => {
    try {
      if (
        !data.name &&
        !data.email &&
        !data.cpf &&
        !data.password &&
        !data.celular
      ) {
        toast.error('Dados nao preenchidos.', {
          icon: <Icon color='error' as='error' />,
          autoClose: 1500,
        })
      }
      const token: string | null = localStorage.getItem('accessToken')
      console.log('token=> ', token)
      if (token) {
        const decodedToken: any = jwt.decode(token)
        console.log(decodedToken)
        const id = decodedToken.id
        const response = await axios.get(
          `http://localhost:8050/voluntario/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          },
        )
        const dataR = response.data
        setA(dataR.cpf)
        console.log(a)
        const updatedData = {
          name: data.name || dataR.name,
          email: data.email || dataR.email,
          cpf: data.cpf || dataR.cpf,
          password: data.password || dataR.password,
          celular: data.celular || dataR.celular,
        }
        console.log(dataR.password)
        await axios.put(`http://localhost:8050/voluntario/${id}`, updatedData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        if (
          !data.name &&
          !data.email &&
          !data.cpf &&
          !data.password &&
          !data.celular
        ) {
        } else {
          toast.success('Dados atualizados com sucesso.', {
            icon: <Icon color='success' as='error' />,
            autoClose: 1500,
          })
        }
      }
    } catch (error) {
      toast.error('Dados nao atualizados com sucesso.', {
        icon: <Icon color='error' as='error' />,
        autoClose: 1500,
      })
    }
  }
  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:8050/voluntario/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      toast.success('Dados deletados com sucesso.', {
        icon: <Icon color='success' as='error' />,
        autoClose: 1500,
      }),
        router.push(ROUTES.LOGIN.url)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const token: string | null = localStorage.getItem('accessToken')

    if ((!token && userId === undefined) || userId === null) {
      toast.error('Acesso negado.', {
        icon: <Icon color='error' as='error' />,
        autoClose: 1500,
      })
      router.push(ROUTES.HOME_COMPANY.url)
    }
    if (token === null) {
      toast.error('Acesso negado.', {
        icon: <Icon color='error' as='error' />,
        autoClose: 1500,
      })
      router.push(ROUTES.HOME.url)
    }
  }, [])

  return (
    <Flex direction='column' gap='sm'>
      <Sidebar />
      <Flex direction='column' align='center' justify='center'>
        <h1>Editar Voluntário</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '400px' }}>
          <Flex direction='column'>
            <label htmlFor='name'>Nome:</label>
            <input
              type='text'
              id='name'
              {...register('name', { required: false })}
            />
            {errors.name && <span>Nome é obrigatório</span>}
          </Flex>

          <Flex direction='column'>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              id='email'
              {...register('email', { required: false })}
            />
            {errors.email && <span>Email é obrigatório</span>}
          </Flex>
          <Flex direction='column'>
            <label htmlFor='celular'>telefone:</label>
            <input
              type='text'
              id='celular'
              {...register('celular', { required: false })}
            />
            {errors.celular && <span>telefone é obrigatório</span>}
          </Flex>

          <Flex direction='column'>
            <label htmlFor='cpf'>CPF:</label>
            <input
              type='text'
              id='cpf'
              {...register('cpf', { required: false })}
            />
            {errors.cpf && <span>CPF é obrigatório</span>}
          </Flex>

          <Flex direction='column'>
            <label htmlFor='passwrd'>Senha:</label>
            <input
              type='password'
              id='password'
              {...register('password', { required: false })}
            />
            {errors.password && <span>Senha é obrigatória</span>}
          </Flex>

          <Flex align='center' justify='center' margin={{ top: 'md' }}>
            <Button type='submit'>Atualizar</Button>
          </Flex>
        </form>
        <form onSubmit={handleSubmit(onDelete)} style={{ marginTop: '30px' }}>
          <Flex align='center' justify='center'>
            <Button type='submit'>Deletar</Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  )
}

export default Perfil
