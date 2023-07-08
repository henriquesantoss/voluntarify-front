import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Button } from 'components/Button'
import { Flex } from 'components/Flex'
import { Text } from 'components/Typography'
import { toast } from 'react-toastify'
import { Icon } from 'components/Icon'
interface LoginForm {
  email: string
  password: string
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()
  const router = useRouter()

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8050/auth/login',
        data,
      )
      const { token } = response.data
      localStorage.setItem('accessToken', token)
      toast.success('Login feito com sucesso.', {
        icon: <Icon color='success' as='error' />,
        autoClose: 1500,
      })
      router.push('/inicio')
    } catch (error) {
      console.error(error)
      alert(
        'Erro ao efetuar login. Verifique suas credenciais e tente novamente.',
      )
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction='column' gap={10}>
          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              E-mail
            </Text>
            <input
              type='email'
              {...register('email', { required: true })}
              placeholder='Email'
            />
            {errors.email && (
              <Text size='small' color='error'>
                <span>Preencha o email</span>
              </Text>
            )}
          </Flex>
          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              Senha
            </Text>
            <input
              type='password'
              {...register('password', { required: true })}
              placeholder='Senha'
            />
            {errors.password && (
              <Text size='small' color='error'>
                <span>Preencha a senha</span>
              </Text>
            )}
          </Flex>

          <Button type='submit'>Entrar</Button>
        </Flex>
      </form>
    </>
  )
}
