import { useState, useEffect } from 'react'
import { authApi, UserLogin, UserCreate } from '../lib/api'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  const login = async (data: UserLogin) => {
    try {
      const response = await authApi.login(data)
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', response.data.access_token)
      }
      setIsAuthenticated(true)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.response?.data?.detail || 'Login failed' }
    }
  }

  const signup = async (data: UserCreate) => {
    try {
      const response = await authApi.signup(data)
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', response.data.access_token)
      }
      setIsAuthenticated(true)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.response?.data?.detail || 'Signup failed' }
    }
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
    }
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
  }
}