import { createContext, useState, useEffect, useContext, ReactNode } from 'react'
import { AuthState, User } from '@/type/types'
import { authApi } from '@/services/api'
import Cookies from 'js-cookie'

interface AuthContextType extends AuthState {
  login: (token: string, user: User | null) => void
  logout: () => void
  updateUser: (user: User) => void
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState)

  const login = async (token: string, user: User | null = null) => {
    Cookies.set('token', token, { expires: 7, secure: true })

    if (user) {
      setState({ user, isAuthenticated: true, isLoading: false })
    } else {
      try {
        const response = await authApi.getCurrentUser()
        setState({ user: response.data, isAuthenticated: true, isLoading: false })
      } catch {
        logout()
      }
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const updateUser = (user: User) => {
    setState((prev) => ({
      ...prev,
      user,
    }))
  }

  useEffect(() => {
    const loadUser = async () => {
      const token = Cookies.get('token')

      if (!token) {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
        return
      }

      try {
        const response = await authApi.getCurrentUser()
        setState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch (error) {
        console.log('Error in authenticating:', error)
        Cookies.remove('token')
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
        window.location.href = '/login'
      }
    }

    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
