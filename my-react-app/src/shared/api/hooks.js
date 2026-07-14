// src/shared/api/hooks.js
import { useState, useEffect, useCallback } from 'react'

// Хук для работы с API запросами
export function useApiRequest(apiFunction, options = {}) {
   const { immediate = false, onSuccess, onError } = options
   const [data, setData] = useState(null)
   const [loading, setLoading] = useState(immediate)
   const [error, setError] = useState(null)

   const execute = useCallback(
      async (...args) => {
         setLoading(true)
         setError(null)
         try {
            const result = await apiFunction(...args)
            setData(result)
            if (onSuccess) onSuccess(result)
            return result
         } catch (err) {
            const errorObj = err.detail
               ? err
               : { detail: err.message || 'Unknown error' }
            setError(errorObj)
            if (onError) onError(errorObj)
            throw err
         } finally {
            setLoading(false)
         }
      },
      [apiFunction, onSuccess, onError],
   )

   useEffect(() => {
      if (immediate) {
         execute()
      }
   }, [immediate, execute])

   return { data, loading, error, execute }
}
