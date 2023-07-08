import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ROUTES } from 'constants/routes'
import { Button } from 'components/Button'
import { Flex } from 'components/Flex'
import { Text } from 'components/Typography'
import { Card } from 'components/Card'
import { toast } from 'react-toastify'
import { Icon } from 'components/Icon'
import { useWindowSize } from 'hooks/useWindowsSize'
import Link from 'next/link'
import * as S from 'components/Register/RegisterPage/RegisterPage.styles'
interface ResetPasswordEmailFormData {
  email: string
}

export default function Company() {
  const { width, breakpoints } = useWindowSize()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordEmailFormData>()

  const onSubmit = async (data: ResetPasswordEmailFormData) => {
    try {
      await axios.post(
        'http://localhost:8050/empresa/reset-password-email',
        data,
      )
      toast.success('E-mail enviado com sucesso.', {
        icon: <Icon color='success' as='error' />,
        autoClose: 1500,
      })
    } catch (error) {
      toast.error(
        'Erro ao enviar o E-mail. Verifique suas credenciais e tente novamente.',
        {
          icon: <Icon color='error' as='error' />,
          autoClose: 1500,
        },
      )
    }
  }

  return (
    <Flex
      direction='column'
      gap={10}
      fill='both'
      align='center'
      justify='center'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
              gap={10}
              justify='center'
              fixedSize={
                width && width >= breakpoints.sm
                  ? { vertical: '500px', horizontal: '500px' }
                  : { vertical: '250px', horizontal: '250px' }
              }
            >
              <div>
                <Text>Email</Text>
                <input type='text' {...register('email')} />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <Button styleType='outlined' type='submit'>
                Enviar
              </Button>
              <Link href={ROUTES.LOGIN.url}>
                <S.TextContainer size='small' weight='bold'>
                  Voltar para login
                </S.TextContainer>
              </Link>
            </Flex>
          </Card>
        </Flex>
      </form>
    </Flex>
  )
}
