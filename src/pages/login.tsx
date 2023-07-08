import type { NextPage } from 'next'
import { LoginForm } from 'components/Login/LoginForm'
import { LoginPage } from 'components/Login/LoginPage'

const Login = () => (
  <LoginPage>
    <LoginForm />
  </LoginPage>
)

export default Login
