// src/shared/api/auth.js
import { authAPI, apiClient } from './index'

// Эти данные используются только как fallback, если моки не работают
export const users = [
   {
      login: 'admin',
      password: 'admin',
      user: {
         id: 1,
         fullName: 'Администратор',
         email: 'admin@mail.ru',
         role: 'admin',
      },
   },
   {
      login: 'viewer',
      password: 'viewer',
      user: {
         id: 2,
         fullName: 'Пользователь',
         email: 'viewer@mail.ru',
         role: 'viewer',
      },
   },
]

// Флаг для предотвращения повторных вызовов
let isLoggingIn = false

export async function login(login, password) {
   console.log('🔵 LOGIN CALLED:', login, password)

   // Защита от повторных вызовов
   if (isLoggingIn) {
      console.log('🟡 Login already in progress, skipping...')
      return
   }

   isLoggingIn = true

   try {
      // Пытаемся использовать API через моки или реальный бэкенд
      const response = await authAPI.userLogin(login, password)
      console.log('🔵 LOGIN RESPONSE:', response)

      const userData = response.data.user
      const { accessToken, refreshToken } = response.data

      apiClient.setTokens(accessToken, refreshToken)
      localStorage.setItem(
         'auth_tokens',
         JSON.stringify({ accessToken, refreshToken }),
      )
      localStorage.setItem('auth_user', JSON.stringify(userData))

      isLoggingIn = false
      return userData
   } catch (error) {
      console.error('🔴 LOGIN ERROR:', error)

      // Fallback на старые моки
      console.log('🟡 Using fallback auth')
      await new Promise((resolve) => setTimeout(resolve, 500))

      const account = users.find(
         (u) => u.login === login && u.password === password,
      )

      isLoggingIn = false

      if (!account) {
         throw new Error('Неверный логин или пароль')
      }

      return account.user
   }
}
