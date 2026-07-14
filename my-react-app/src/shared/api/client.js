// src/shared/api/client.js
import { API_CONFIG, API_PATHS } from './config'

// Класс для обработки ошибок API
export class ApiError extends Error {
   constructor(response) {
      super(response.detail || response.title || 'Unknown API error')
      this.name = 'ApiError'
      this.type = response.type || 'about:blank'
      this.title = response.title || 'Unknown error'
      this.status = response.status || 500
      this.detail = response.detail || ''
      this.instance = response.instance || ''
      this.originalResponse = response
   }

   toString() {
      return `[${this.status}] ${this.title}: ${this.detail}`
   }
}

// Основной HTTP клиент
export class ApiClient {
   constructor() {
      this.baseUrl = API_CONFIG.BASE_URL
      this.timeout = API_CONFIG.TIMEOUT
      this.accessToken = null
      this.refreshToken = null
      this.isRefreshing = false
      this.pendingRequests = []
   }

   setTokens(accessToken, refreshToken) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken || this.refreshToken
   }

   clearTokens() {
      this.accessToken = null
      this.refreshToken = null
   }

   getAuthHeader() {
      if (!this.accessToken) return {}
      return { Authorization: `Bearer ${this.accessToken}` }
   }

   // Core request method
   async request(endpoint, body = {}, options = {}) {
      const {
         method = 'POST',
         headers = {},
         requireAuth = true,
         timeout = this.timeout,
      } = options

      const url = `${this.baseUrl}${endpoint}`
      const requestHeaders = {
         'Content-Type': 'application/json',
         ...headers,
      }

      if (requireAuth) {
         Object.assign(requestHeaders, this.getAuthHeader())
      }

      const fetchOptions = {
         method,
         headers: requestHeaders,
         body: JSON.stringify(body),
         signal: AbortSignal.timeout(timeout),
      }

      try {
         const response = await fetch(url, fetchOptions)
         const data = await response.json()

         if (!response.ok) {
            if (response.status === 401 && requireAuth) {
               return await this.handleTokenRefresh(endpoint, body, options)
            }
            throw new ApiError(data)
         }

         return data
      } catch (error) {
         if (error.name === 'TimeoutError') {
            throw new ApiError({
               title: 'Timeout',
               detail: `Request timeout after ${timeout}ms`,
               status: 408,
            })
         }
         if (error instanceof ApiError) {
            throw error
         }
         throw new ApiError({
            title: 'Network Error',
            detail: error.message || 'Network request failed',
            status: 500,
         })
      }
   }

   // Обработка обновления токена
   async handleTokenRefresh(endpoint, body, options) {
      if (!this.refreshToken) {
         throw new ApiError({
            title: 'Unauthorized',
            detail: 'No refresh token available',
            status: 401,
         })
      }

      if (this.isRefreshing) {
         return new Promise((resolve, reject) => {
            this.pendingRequests.push({
               endpoint,
               body,
               options,
               resolve,
               reject,
            })
         })
      }

      this.isRefreshing = true

      try {
         const refreshResponse = await this.request(
            API_PATHS.REFRESH,
            { refreshToken: this.refreshToken },
            { requireAuth: false },
         )

         this.setTokens(
            refreshResponse.data.accessToken,
            refreshResponse.data.refreshToken,
         )

         const result = await this.request(endpoint, body, {
            ...options,
            requireAuth: true,
         })

         this.pendingRequests.forEach((pending) => {
            this.request(pending.endpoint, pending.body, pending.options)
               .then(pending.resolve)
               .catch(pending.reject)
         })
         this.pendingRequests = []

         return result
      } catch (error) {
         this.pendingRequests.forEach((pending) => {
            pending.reject(error)
         })
         this.pendingRequests = []
         this.clearTokens()
         throw error
      } finally {
         this.isRefreshing = false
      }
   }
}

// Создаем экземпляр клиента
export const apiClient = new ApiClient()

// Утилиты для обработки ответов
export function extractData(response) {
   return response?.data || null
}

export function extractItems(response) {
   return response?.data?.items || []
}

export function extractTotal(response) {
   return response?.data?.total || 0
}

export function extractDeleted(response) {
   return response?.data?.deleted || []
}
