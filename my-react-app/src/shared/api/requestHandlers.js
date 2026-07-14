// src/shared/api/requestHandlers.js
import { apiClient } from './client'
import { API_PATHS } from './config'
import { mockRequest } from './mocks'
import { API_CONFIG } from './config'

// Обертка для выбора между реальным API и моками
function apiCall(endpoint, body, options = {}) {
   if (API_CONFIG.USE_MOCKS) {
      return mockRequest(endpoint, body)
   }
   return apiClient.request(endpoint, body, options)
}

// ==================== AUTH ====================
export const authAPI = {
   userLogin: (login, password) => {
      return apiCall(API_PATHS.USER_AUTH, { login, password })
   },

   agentLogin: (login, password) => {
      return apiCall(API_PATHS.AGENT_AUTH, { login, password })
   },

   refreshToken: (refreshToken) => {
      return apiCall(API_PATHS.REFRESH, { refreshToken })
   },
}

// ==================== ACCOUNTS ====================
export const accountsAPI = {
   add: (items) => apiCall(API_PATHS.ACCOUNTS_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.ACCOUNTS_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.ACCOUNTS_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.ACCOUNTS_DELETE, ids),
   getAuth: (login) => apiCall(API_PATHS.ACCOUNTS_GET_AUTH, { login }),
   getTokenMeta: (id) => apiCall(API_PATHS.ACCOUNTS_GET_TOKEN_META, { id }),
}

// ==================== USERS ====================
export const usersAPI = {
   add: (items) => apiCall(API_PATHS.USERS_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.USERS_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.USERS_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.USERS_DELETE, ids),
}

// ==================== TASKS ====================
export const tasksAPI = {
   add: (items) => apiCall(API_PATHS.TASKS_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.TASKS_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.TASKS_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.TASKS_DELETE, ids),
   findAssigned: () => apiCall(API_PATHS.TASKS_FIND_ASSIGNED, {}),
   findGiven: () => apiCall(API_PATHS.TASKS_FIND_GIVEN, {}),
   finishAssigned: (id) => apiCall(API_PATHS.TASKS_FINISH_ASSIGNED, { id }),
   setEndTime: (id, endTime) =>
      apiCall(API_PATHS.TASKS_SET_END_TIME, { id, end_time: endTime }),
}

// ==================== FILES ====================
export const filesAPI = {
   add: (items) => apiCall(API_PATHS.FILES_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.FILES_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.FILES_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.FILES_DELETE, ids),
}

// ==================== META ====================
export const metaAPI = {
   add: (items) => apiCall(API_PATHS.META_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.META_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.META_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.META_DELETE, ids),
}

// ==================== LEGAL ENTITIES ====================
export const legalEntitiesAPI = {
   add: (items) => apiCall(API_PATHS.LEGAL_ENTITIES_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.LEGAL_ENTITIES_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.LEGAL_ENTITIES_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.LEGAL_ENTITIES_DELETE, ids),
}

// ==================== CONTRACTS ====================
export const contractsAPI = {
   add: (items) => apiCall(API_PATHS.CONTRACTS_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.CONTRACTS_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.CONTRACTS_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.CONTRACTS_DELETE, ids),
}

// ==================== HARD WORKS ====================
export const hardWorksAPI = {
   add: (items) => apiCall(API_PATHS.HARD_WORKS_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.HARD_WORKS_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.HARD_WORKS_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.HARD_WORKS_DELETE, ids),
}

// ==================== REGULAR WORKS ====================
export const regularWorksAPI = {
   add: (items) => apiCall(API_PATHS.REGULAR_WORKS_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.REGULAR_WORKS_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.REGULAR_WORKS_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.REGULAR_WORKS_DELETE, ids),
}

// ==================== JOBS ====================
export const jobsAPI = {
   add: (items) => apiCall(API_PATHS.JOBS_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.JOBS_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.JOBS_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.JOBS_DELETE, ids),
}

// ==================== WORK JOBS ====================
export const workJobsAPI = {
   add: (items) => apiCall(API_PATHS.WORK_JOBS_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.WORK_JOBS_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.WORK_JOBS_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.WORK_JOBS_DELETE, ids),
}

// ==================== OBJECTS ====================
export const objectsAPI = {
   add: (items) => apiCall(API_PATHS.OBJECTS_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.OBJECTS_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.OBJECTS_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.OBJECTS_DELETE, ids),
   findLastRepair: (
      filter,
      columns,
      limit,
      offset,
      sortingBy,
      descendingOrder,
   ) => {
      return apiCall(API_PATHS.OBJECTS_LAST_REPAIR_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   updateLastRepair: (items) =>
      apiCall(API_PATHS.OBJECTS_LAST_REPAIR_UPDATE, items),
}

// ==================== DISTRICTS ====================
export const districtsAPI = {
   add: (items) => apiCall(API_PATHS.DISTRICTS_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.DISTRICTS_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.DISTRICTS_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.DISTRICTS_DELETE, ids),
}

// ==================== STREETS ====================
export const streetsAPI = {
   add: (items) => apiCall(API_PATHS.STREETS_ADD, items),
   find: (filter, columns, limit, offset, sortingBy, descendingOrder) => {
      return apiCall(API_PATHS.STREETS_FIND, {
         columns: columns || [],
         filter: filter || {},
         limit: limit || 100,
         offset: offset || 0,
         sorting_by: sortingBy || '',
         descending_order: descendingOrder || false,
      })
   },
   update: (items) => apiCall(API_PATHS.STREETS_UPDATE, items),
   delete: (ids) => apiCall(API_PATHS.STREETS_DELETE, ids),
}
