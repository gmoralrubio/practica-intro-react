import { AuthContext } from '@features/Auth/context/AuthContext'
import { authRepository } from '@features/Auth/services/authRepository'
import type { AuthState } from '@features/Auth/types/auth.type'
import { useState, useEffect } from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const token = await authRepository.loginUser(email, password)
      localStorage.setItem('accessToken', token.accessToken)
      const user = await authRepository.getUserInfo(token.accessToken)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        user,
      }))
    } catch (error: unknown) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }))
      throw error
    }
  }

  const logout = () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      user: null,
    }))
    localStorage.removeItem('accessToken')
    setState(() => ({
      error: null,
      isLoading: false,
      user: null,
    }))
  }

  const checkAuth = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const token = localStorage.getItem('accessToken') as string
      if (!token) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }))
        return
      }
      const user = await authRepository.getUserInfo(token)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        user,
      }))
    } catch (error: unknown) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error',
      }))
      throw error
    }
  }

  return (
    <AuthContext
      value={{
        user: state.user,
        isAuthenticated: state.user !== null,
        isLoading: state.isLoading,
        error: state.error,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext>
  )
}
