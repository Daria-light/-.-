// src/shared/api/index.js
export { API_CONFIG, API_PATHS } from './config'
export {
   apiClient,
   ApiError,
   extractData,
   extractItems,
   extractTotal,
   extractDeleted,
} from './client'
export { mockData, mockRequest } from './mocks'

export {
   authAPI,
   accountsAPI,
   usersAPI,
   tasksAPI,
   filesAPI,
   metaAPI,
   legalEntitiesAPI,
   contractsAPI,
   hardWorksAPI,
   regularWorksAPI,
   jobsAPI,
   workJobsAPI,
   objectsAPI,
   districtsAPI,
   streetsAPI,
} from './requestHandlers'
