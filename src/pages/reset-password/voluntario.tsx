import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Flex } from 'components/Flex'
import { Heading, Text } from 'components/Typography'
import { Button } from 'components/Button'
import { Card } from 'components/Card'
import { useWindowSize } from 'hooks/useWindowsSize'

interface ResetPasswordFormData {
  newPassword: string
  confirmPassword: string
}

export default function ResetPasswordVoluntary() {
  const { width, breakpoints } = useWindowSize()
  const router = useRouter()
  const { query } = router
  const token = typeof query.token === 'string' ? query.token : ''
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordFormData>()
  const [error, setError] = useState('')

  const handleResetPassword = handleSubmit(
    async (data: ResetPasswordFormData) => {
      if (data.newPassword !== data.confirmPassword) {
        setError('As senhas não correspondem')
        return
      }

      try {
        await axios.post('http://localhost:8050/reset-password/voluntario', {
          token,
          newPassword: data.newPassword,
        })

        router.push('/login')
      } catch (error) {
        console.error(error)
      }
    },
  )

  return (
    <Flex direction='column' fill='both' justify='center' align='center'>
      <Heading as='h1'>Redefinir senha</Heading>

      <form onSubmit={handleResetPassword}>
        <Flex
          direction='column'
          gap={10}
          fill='both'
          align='center'
          justify='center'
        >
          <Card backgroundColor='dark'>
            <Flex
              direction='column'
              fixedSize={
                width && width >= breakpoints.sm
                  ? { vertical: '500px', horizontal: '500px' }
                  : { vertical: '250px', horizontal: '250px' }
              }
            >
              <Text>Nova Senha</Text>
              <input
                type='password'
                {...register('newPassword', { required: true })}
              />
              {errors.newPassword && <p>Este campo é obrigatório</p>}

              <Text>Confirmar Senha</Text>
              <input
                type='password'
                {...register('confirmPassword', { required: true })}
              />
              {errors.confirmPassword && <p>Este campo é obrigatório</p>}
            </Flex>
            {error && <p>{error}</p>}
            <Button styleType='outlined' type='submit'>
              Redefinir Senha
            </Button>
          </Card>
        </Flex>
      </form>
    </Flex>
  )
}
