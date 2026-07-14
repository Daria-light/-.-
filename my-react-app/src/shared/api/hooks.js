// src/shared/api/hooks.js
import { useState, useEffect, useCallback } from 'react'
import { ApiError } from './client'

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
            const apiError =
               err instanceof ApiError
                  ? err
                  : new ApiError({
                       title: 'Error',
                       detail: err.message || 'Unknown error',
                       status: 500,
                    })
            setError(apiError)
            if (onError) onError(apiError)
            throw apiError
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

// Хук для CRUD операций
export function useCrud(api, options = {}) {
   const [items, setItems] = useState([])
   const [total, setTotal] = useState(0)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const find = useCallback(
      async (filter, columns, limit, offset, sortingBy, descendingOrder) => {
         setLoading(true)
         setError(null)
         try {
            const result = await api.find(
               filter,
               columns,
               limit,
               offset,
               sortingBy,
               descendingOrder,
            )
            const data = result?.data || result
            setItems(data.items || [])
            setTotal(data.total || 0)
            return data
         } catch (err) {
            const apiError =
               err instanceof ApiError
                  ? err
                  : new ApiError({
                       title: 'Error',
                       detail: err.message || 'Unknown error',
                       status: 500,
                    })
            setError(apiError)
            throw apiError
         } finally {
            setLoading(false)
         }
      },
      [api],
   )

   const add = useCallback(
      async (newItems) => {
         setLoading(true)
         setError(null)
         try {
            const result = await api.add(newItems)
            const added = result?.data || result
            setItems((prev) => [
               ...prev,
               ...(Array.isArray(added) ? added : [added]),
            ])
            return added
         } catch (err) {
            const apiError =
               err instanceof ApiError
                  ? err
                  : new ApiError({
                       title: 'Error',
                       detail: err.message || 'Unknown error',
                       status: 500,
                    })
            setError(apiError)
            throw apiError
         } finally {
            setLoading(false)
         }
      },
      [api],
   )

   const update = useCallback(
      async (updatedItems) => {
         setLoading(true)
         setError(null)
         try {
            const result = await api.update(updatedItems)
            const updated = result?.data || result
            setItems((prev) =>
               prev.map((item) => {
                  const match = Array.isArray(updated)
                     ? updated.find((u) => u.id === item.id)
                     : updated.id === item.id
                       ? updated
                       : null
                  return match || item
               }),
            )
            return updated
         } catch (err) {
            const apiError =
               err instanceof ApiError
                  ? err
                  : new ApiError({
                       title: 'Error',
                       detail: err.message || 'Unknown error',
                       status: 500,
                    })
            setError(apiError)
            throw apiError
         } finally {
            setLoading(false)
         }
      },
      [api],
   )

   const remove = useCallback(
      async (ids) => {
         setLoading(true)
         setError(null)
         try {
            const result = await api.delete(ids)
            const deleted = result?.data?.deleted || result?.data || []
            setItems((prev) =>
               prev.filter((item) => !deleted.includes(item.id)),
            )
            return deleted
         } catch (err) {
            const apiError =
               err instanceof ApiError
                  ? err
                  : new ApiError({
                       title: 'Error',
                       detail: err.message || 'Unknown error',
                       status: 500,
                    })
            setError(apiError)
            throw apiError
         } finally {
            setLoading(false)
         }
      },
      [api],
   )

   return { items, total, loading, error, find, add, update, remove }
}
