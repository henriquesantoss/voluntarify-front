import axios from 'axios'
import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import jwt from 'jsonwebtoken'
import { Flex } from 'components/Flex'
import { Card } from 'components/Card'
import { Button } from 'components/Button'
import { Text } from 'components/Typography'
import { Sidebar } from 'components/Layout/Sidebar'
import { toast } from 'react-toastify'
import { Icon } from 'components/Icon'

interface VolunteerData {
  razao_social: string
  nome_fantasia: string
  email: string
  password: string
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

const PerfilCompany = () => {
  const router = useRouter()
  const id = router.query.fid

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VolunteerData>()

  const onSubmit = async (data: VolunteerData) => {
    try {
      if (
        !data.razao_social &&
        !data.nome_fantasia &&
        !data.email &&
        !data.cnpj &&
        !data.password &&
        !data.cep &&
        !data.uf &&
        !data.cidade &&
        !data.end_num &&
        !data.bairro &&
        !data.descricao &&
        !data.telefone &&
        !data.endereco
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
          `https://voluntarify-api.onrender.com/empresa/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          },
        )
        const dataR = response.data
        console.log(dataR)
        const updatedData = {
          razao_social: data.razao_social || dataR.razao_social,
          password: data.password || dataR.password,
          cnpj: data.cnpj || dataR.cnpj,
          endereco: data.endereco || dataR.endereco,
          cep: data.cep || dataR.cep,
          email: data.email || dataR.email,
          nome_fantasia: data.nome_fantasia || dataR.nome_fantasia,
          bairro: data.bairro || dataR.bairro,
          cidade: data.cidade || dataR.cidade,
          end_num: data.end_num || dataR.end_num,
          descricao: data.descricao || dataR.descricao,
          telefone: data.telefone || dataR.telefone,
          uf: data.uf || dataR.uf,
        }
        console.log(dataR.password)
        await axios.put(`https://voluntarify-api.onrender.com/empresa/${id}`, updatedData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })

        toast.success('Dados atualizados com sucesso.', {
          icon: <Icon color='success' as='error' />,
          autoClose: 1500,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
  const onDelete = async () => {
    try {
      await axios.delete(`https://voluntarify-api.onrender.com/empresa/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      alert('Conta deletada com sucesso!')
      localStorage.removeItem('accessToken')
      router.push(ROUTES.LOGIN.url)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Flex fill='horizontal' style={{ position: 'fixed' }}>
        <Sidebar />
      </Flex>
      <Flex align='center' justify='center' direction='column'>
        <h1>Editar Empresa/Ong</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction='column' margin={{ top: 20 }}>
            <label htmlFor='razao_social'>razao social:</label>
            <input
              type='text'
              id='razao_social'
              {...register('razao_social', { required: false })}
            />
            {errors.razao_social && <span>razao_social é obrigatório</span>}
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
            <label htmlFor='cep'>cep:</label>
            <input
              type='text'
              id='cep'
              {...register('cep', { required: false })}
            />
            {errors.cep && <span>cep é obrigatório</span>}
          </Flex>
          <Flex direction='column'>
            <label htmlFor='endereco'>endereco:</label>
            <input
              type='text'
              id='endereco'
              {...register('endereco', { required: false })}
            />
            {errors.cnpj && <span>cnpj é obrigatório</span>}
          </Flex>

          <Flex direction='column'>
            <label htmlFor='telefone'>telefone:</label>
            <input
              type='text'
              id='telefone'
              {...register('telefone', { required: false })}
            />
            {errors.telefone && <span>telefone é obrigatório</span>}
          </Flex>

          <Flex direction='column'>
            <label htmlFor='2'>nome_fantasia:</label>
            <input
              type='text'
              id='nome_fantasia'
              {...register('nome_fantasia', { required: false })}
            />
            {errors.endereco && <span>endereco é obrigatório</span>}
          </Flex>

          <Flex direction='column'>
            <label htmlFor='cidade'>cidade:</label>
            <input
              type='text'
              id='cidade'
              {...register('cidade', { required: false })}
            />
            {errors.cidade && <span>cidade é obrigatório</span>}
          </Flex>

          <Flex direction='column'>
            <label htmlFor='bairro'>bairro:</label>
            <input
              type='text'
              id='bairro'
              {...register('bairro', { required: false })}
            />
            {errors.bairro && <span>bairro é obrigatório</span>}
          </Flex>

          <Flex direction='column'>
            <label htmlFor='numero'>numero:</label>
            <input
              type='text'
              id='numero'
              {...register('end_num', { required: false })}
            />
            {errors.end_num && <span>numero é obrigatório</span>}
          </Flex>

          <Flex direction='column'>
            <label htmlFor='uf'>uf:</label>
            <input
              type='text'
              id='uf'
              {...register('uf', { required: false })}
            />
            {errors.uf && <span>uf é obrigatório</span>}
          </Flex>

          <Flex direction='column'>
            <label htmlFor='descricao'>descricao:</label>
            <input
              type='text'
              id='descricao'
              {...register('descricao', { required: false })}
            />
            {errors.descricao && <span>descricao é obrigatório</span>}
          </Flex>

          <Flex direction='column'>
            <label htmlFor='password'>Senha:</label>
            <input
              type='password'
              id='password'
              {...register('password', { required: false })}
            />
            {errors.password && <span>Senha é obrigatória</span>}
          </Flex>

          <Flex align='center' justify='center'>
            <Button style={{ marginTop: '25px' }} type='submit'>
              Atualizar
            </Button>
          </Flex>
        </form>
        <form onSubmit={handleSubmit(onDelete)} style={{ marginTop: '50px' }}>
          <Button type='submit'>Deletar</Button>
        </form>
      </Flex>
    </>
  )
}

export default PerfilCompany
