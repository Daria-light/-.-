// src/shared/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI, apiClient } from '../api'

const AuthContext = createContext()

export default function AuthProvider({ children }) {
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   // Проверка сохраненной сессии при загрузке
   useEffect(() => {
      const savedTokens = localStorage.getItem('auth_tokens')
      if (savedTokens) {
         try {
            const { accessToken, refreshToken } = JSON.parse(savedTokens)
            apiClient.setTokens(accessToken, refreshToken)
            const savedUser = localStorage.getItem('auth_user')
            if (savedUser) {
               setUser(JSON.parse(savedUser))
            }
         } catch (e) {
            console.warn('Failed to restore session:', e)
         }
      }
      setLoading(false)
   }, [])

   const login = async (login, password) => {
      // 👉 ЗАЩИТА ОТ ПОВТОРНЫХ ВЫЗОВОВ
      if (user) {
         console.log('🟡 User already logged in, skipping...')
         return user
      }

      setLoading(true)
      setError(null)
      try {
         const response = await authAPI.userLogin(login, password)
         const { accessToken, refreshToken, user: userData } = response.data

         apiClient.setTokens(accessToken, refreshToken)

         localStorage.setItem(
            'auth_tokens',
            JSON.stringify({ accessToken, refreshToken }),
         )
         localStorage.setItem('auth_user', JSON.stringify(userData))

         setUser(userData)
         return userData
      } catch (err) {
         setError(err)
         throw err
      } finally {
         setLoading(false)
      }
   }

   const logout = () => {
      apiClient.clearTokens()
      localStorage.removeItem('auth_tokens')
      localStorage.removeItem('auth_user')
      setUser(null)
      setError(null)
   }

   const value = {
      user,
      loading,
      error,
      login,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      isManager: user?.role === 'manager' || user?.role === 'admin',
   }

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
   const context = useContext(AuthContext)
   if (!context) {
      throw new Error('useAuth must be used within AuthProvider')
   }
   return context
}
