// src/shared/api/config.js
export const API_CONFIG = {
   // Базовый URL для API
   BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',

   // Флаг использования моков (true - моки, false - реальный API)
   USE_MOCKS: process.env.REACT_APP_USE_MOCKS === 'true' || true, // по умолчанию true

   // Таймаут запроса в мс
   TIMEOUT: 30000,

   // Максимальное количество объектов в bulk операциях
   BULK_LIMIT: 1000,

   // Токен для agent-auth (заглушка для разработки)
   AGENT_LOGIN: process.env.REACT_APP_AGENT_LOGIN || 'agent',
   AGENT_PASSWORD: process.env.REACT_APP_AGENT_PASSWORD || 'agent123',
}

export const API_PATHS = {
   // Аутентификация
   USER_AUTH: '/api-out/v1/user-auth',
   AGENT_AUTH: '/api-out/v1/agent-auth',
   REFRESH: '/api-out/v1/refresh',

   // Accounts
   ACCOUNTS_ADD: '/api/v1/accounts/add',
   ACCOUNTS_FIND: '/api/v1/accounts/find',
   ACCOUNTS_UPDATE: '/api/v1/accounts/update',
   ACCOUNTS_DELETE: '/api/v1/accounts/delete',
   ACCOUNTS_GET_AUTH: '/api/v1/accounts/get-auth',
   ACCOUNTS_GET_TOKEN_META: '/api/v1/accounts/get-token-meta',

   // Users
   USERS_ADD: '/api/v1/users/add',
   USERS_FIND: '/api/v1/users/find',
   USERS_UPDATE: '/api/v1/users/update',
   USERS_DELETE: '/api/v1/users/delete',

   // Tasks
   TASKS_ADD: '/api/v1/tasks/add',
   TASKS_FIND: '/api/v1/tasks/find',
   TASKS_UPDATE: '/api/v1/tasks/update',
   TASKS_DELETE: '/api/v1/tasks/delete',
   TASKS_FIND_ASSIGNED: '/api/v1/tasks/find-assigned',
   TASKS_FIND_GIVEN: '/api/v1/tasks/find-given',
   TASKS_FINISH_ASSIGNED: '/api/v1/tasks/finish-assigned',
   TASKS_SET_END_TIME: '/api/v1/tasks/set-end-time',

   // Files
   FILES_ADD: '/api/v1/file-list/add',
   FILES_FIND: '/api/v1/file-list/find',
   FILES_UPDATE: '/api/v1/file-list/update',
   FILES_DELETE: '/api/v1/file-list/delete',

   // Meta
   META_ADD: '/api/v1/meta-list/add',
   META_FIND: '/api/v1/meta-list/find',
   META_UPDATE: '/api/v1/meta-list/update',
   META_DELETE: '/api/v1/meta-list/delete',

   // Legal entities
   LEGAL_ENTITIES_ADD: '/api/v1/legal-entities/add',
   LEGAL_ENTITIES_FIND: '/api/v1/legal-entities/find',
   LEGAL_ENTITIES_UPDATE: '/api/v1/legal-entities/update',
   LEGAL_ENTITIES_DELETE: '/api/v1/legal-entities/delete',

   // Contracts
   CONTRACTS_ADD: '/api/v1/contracts/add',
   CONTRACTS_FIND: '/api/v1/contracts/find',
   CONTRACTS_UPDATE: '/api/v1/contracts/update',
   CONTRACTS_DELETE: '/api/v1/contracts/delete',

   // Hard works
   HARD_WORKS_ADD: '/api/v1/works/hard/add',
   HARD_WORKS_FIND: '/api/v1/works/hard/find',
   HARD_WORKS_UPDATE: '/api/v1/works/hard/update',
   HARD_WORKS_DELETE: '/api/v1/works/hard/delete',

   // Regular works
   REGULAR_WORKS_ADD: '/api/v1/works/regular/add',
   REGULAR_WORKS_FIND: '/api/v1/works/regular/find',
   REGULAR_WORKS_UPDATE: '/api/v1/works/regular/update',
   REGULAR_WORKS_DELETE: '/api/v1/works/regular/delete',

   // Jobs
   JOBS_ADD: '/api/v1/jobs/add',
   JOBS_FIND: '/api/v1/jobs/find',
   JOBS_UPDATE: '/api/v1/jobs/update',
   JOBS_DELETE: '/api/v1/jobs/delete',

   // Work jobs
   WORK_JOBS_ADD: '/api/v1/works/jobs/add',
   WORK_JOBS_FIND: '/api/v1/works/jobs/find',
   WORK_JOBS_UPDATE: '/api/v1/works/jobs/update',
   WORK_JOBS_DELETE: '/api/v1/works/jobs/delete',

   // Objects
   OBJECTS_ADD: '/api/v1/objects/add',
   OBJECTS_FIND: '/api/v1/objects/find',
   OBJECTS_UPDATE: '/api/v1/objects/update',
   OBJECTS_DELETE: '/api/v1/objects/delete',
   OBJECTS_LAST_REPAIR_FIND: '/api/v1/objects/last-repair/find',
   OBJECTS_LAST_REPAIR_UPDATE: '/api/v1/objects/last-repair/update',

   // Districts
   DISTRICTS_ADD: '/api/v1/districts/add',
   DISTRICTS_FIND: '/api/v1/districts/find',
   DISTRICTS_UPDATE: '/api/v1/districts/update',
   DISTRICTS_DELETE: '/api/v1/districts/delete',

   // Streets
   STREETS_ADD: '/api/v1/streets/add',
   STREETS_FIND: '/api/v1/streets/find',
   STREETS_UPDATE: '/api/v1/streets/update',
   STREETS_DELETE: '/api/v1/streets/delete',
}
