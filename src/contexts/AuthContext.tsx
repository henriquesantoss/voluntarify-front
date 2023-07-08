import { ReactNode, createContext } from 'react'

interface Props {
  children: ReactNode
}

type AuthContextType = {
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: Props) {
  const isAuthenticated = false

  async function signIn() {}

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
