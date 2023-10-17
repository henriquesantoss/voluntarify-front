import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Input } from 'components/Input'
import { toast } from 'react-toastify'
import { Icon } from 'components/Icon'
import { Page } from 'components/Page'
import * as S from './RegisterFormVoluntary.styles.'
import { Button } from 'components/Button'
import { Text } from 'components/Typography'
import { Flex } from 'components/Flex'
import { cpf as isValidCPF } from 'cpf-cnpj-validator'

interface FormData {
  name: string
  password: string
  cpf: string
  email: string
  celular: string
}

const formatCPF = (value: string) => {
  const cpf = value.replace(/\D/g, '')
  if (cpf.length <= 11) {
    return cpf.replace(
      /(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/,
      (_, p1, p2, p3, p4) => {
        let formattedCPF = ''
        if (p1) {
          formattedCPF += p1
        }
        if (p2) {
          formattedCPF += `.${p2}`
        }
        if (p3) {
          formattedCPF += `.${p3}`
        }
        if (p4) {
          formattedCPF += `-${p4}`
        }
        return formattedCPF
      },
    )
  }
  return value
}

const formatPhoneNumber = (value: string) => {
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
  value = value.replace(/(\d)(\d{4})(\d{4})$/, '$1 $2-$3')
  return value
}

export const RegisterFormVoluntary = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const router = useRouter()

  const handleFormSubmit = async (data: FormData) => {
    try {
      // if (!isValidCPF.isValid(data.cpf)) {
      //   toast.error('CPF inválido', {
      //     icon: <Icon color='error' as='error' />,
      //     autoClose: 1500,
      //   })
      //   return
      // }

      await axios.post('https://voluntarify-api.onrender.com/voluntario', data)
      toast.success('Cadastro feito com sucesso.', {
        icon: <Icon color='success' as='error' />,
        autoClose: 1500,
      })
      router.push('/login')
    } catch (error) {
      console.error(error)
      toast.error(
        'Erro ao efetuar o cadastro. Verifique suas credenciais e tente novamente.',
        {
          icon: <Icon color='error' as='error' />,
          autoClose: 1500,
        },
      )

      console.log(data)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Flex direction='column' gap={10}>
          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              Nome
            </Text>
            <input
              type='text'
              placeholder='Nome'
              {...register('name', { required: true })}
            />
            {errors.name && (
              <Text size='small' color='error'>
                <span>Preencha o nome</span>
              </Text>
            )}
          </Flex>
          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              Senha
            </Text>
            <input
              type='password'
              placeholder='Senha'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <Text size='small' color='error'>
                <span>Preencha a senha</span>
              </Text>
            )}
          </Flex>

          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              CPF
            </Text>
            <input
              type='text'
              placeholder='CPF'
              maxLength={14}
              {...register('cpf', { required: true })}
              onChange={(e) => {
                e.target.value = formatCPF(e.target.value)
              }}
            />
            {errors.cpf && (
              <Text size='small' color='error'>
                <span>Preencha o CPF</span>
              </Text>
            )}
          </Flex>

          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              Email
            </Text>
            <input
              type='text'
              placeholder='Email'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <Text size='small' color='error'>
                <span>Preencha o email</span>
              </Text>
            )}
          </Flex>
          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              Celular
            </Text>
            <input
              type='text'
              placeholder='Celular'
              {...register('celular', { required: true })}
              maxLength={14}
              onChange={(e) => {
                e.target.value = formatPhoneNumber(e.target.value)
              }}
            />

            {errors.celular && (
              <Text size='small' color='error'>
                <span>Preencha o celular</span>
              </Text>
            )}
          </Flex>

          <Button type='submit'>Cadastrar</Button>
        </Flex>
      </form>
    </>
  )
}
