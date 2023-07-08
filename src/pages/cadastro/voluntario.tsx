import type { NextPage } from 'next'
import { LoginForm } from 'components/Login/LoginForm'
import { LoginPage } from 'components/Login/LoginPage'
import { RegisterFormVoluntary } from 'components/Register/RegisterFormVoluntary'
import { RegisterPage } from 'components/Register/RegisterPage'

const RegisterVoluntary: NextPage = () => (
  <RegisterPage>
    <RegisterFormVoluntary />
  </RegisterPage>
)

export default RegisterVoluntary
