import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

interface ResetPasswordFormData {
  email: string
  newPassword: string
  confirmPassword: string
}

const ResetPasswordCompany = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>()
  const [message, setMessage] = useState('')

  const handleResetPassword = handleSubmit(async (data) => {
    const { newPassword: senha, confirmPassword } = data

    if (senha !== confirmPassword) {
      setMessage('As senhas não coincidem. Por favor, tente novamente.')
      return
    }

    try {
      await axios.post('http://localhost:8050/empresa/red-senha', {
        newPassword: senha,
      })
      setMessage('Senha redefinida com sucesso!')
      reset()
    } catch (error) {
      console.error(error)
      setMessage(
        'Ocorreu um erro ao redefinir a senha. Por favor, tente novamente.',
      )
    }
  })

  return (
    <div>
      <h1>Redefinir Senha</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type='email'
          {...register('email', { required: true })}
          placeholder='Novo email'
        />
        {errors.email && <p>Por favor, insira a nova senha.</p>}
        <input
          type='password'
          {...register('newPassword', { required: true })}
          placeholder='Nova Senha'
        />
        {errors.newPassword && <p>Por favor, insira a nova senha.</p>}

        <input
          type='password'
          {...register('confirmPassword', { required: true })}
          placeholder='Confirme a Nova Senha'
        />
        {errors.confirmPassword && <p>Por favor, confirme a nova senha.</p>}

        <button type='submit'>Redefinir Senha</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default ResetPasswordCompany
