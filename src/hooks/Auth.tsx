import { createContext, useCallback, useState, useContext } from 'react'

import api from '../services/api'

interface IUser {
  name: string
  email: string
}

interface IAuthState {
  token: string
  user: IUser
}

interface ISingInCredentials {
  email: string
  password: string
}

interface IAuthContext {
  user: IUser
  signIn(credentials: ISingInCredentials): Promise<void>
  signOut(): void
  setUser(user: IUser): void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@VUTTR:token')
    const user = localStorage.getItem('@VUTTR:user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`

      return {
        token,
        user: JSON.parse(user)
      }
    }

    return {} as IAuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('session', { email, password })

    const { token, user } = response.data

    localStorage.setItem('@VUTTR:token', token)
    localStorage.setItem('@VUTTR:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@VUTTR:token')
    localStorage.removeItem('@VUTTR:user')

    setData({} as IAuthState)
  }, [])

  const setUser = useCallback((user: IUser) => {
    setData({
      token: data.token,
      user
    })

    localStorage.setItem('@VUTTR:user', JSON.stringify(user))
  }, [])

  return <AuthContext.Provider value={{ user: data.user, signIn, signOut, setUser }}>{children}</AuthContext.Provider>
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
