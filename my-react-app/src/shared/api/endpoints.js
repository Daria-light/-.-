const API_OUT = '/api-out/v1'
const API = '/api/v1'

export const ENDPOINTS = {
  USER_AUTH: `${API_OUT}/user-auth`,
  AGENT_AUTH: `${API_OUT}/agent-auth`,
  REFRESH: `${API_OUT}/refresh`,

  ACCOUNTS_ADD: `${API}/accounts/add`,
  ACCOUNTS_FIND: `${API}/accounts/find`,
  ACCOUNTS_UPDATE: `${API}/accounts/update`,
  ACCOUNTS_DELETE: `${API}/accounts/delete`,

  ACCOUNTS_GET_AUTH: `${API}/accounts/get-auth`,
  ACCOUNTS_GET_TOKEN_META: `${API}/accounts/get-token-meta`,

  USERS_ADD: `${API}/users/add`,
  USERS_FIND: `${API}/users/find`,
  USERS_UPDATE: `${API}/users/update`,
  USERS_DELETE: `${API}/users/delete`,

  TASKS_ADD: `${API}/tasks/add`,
  TASKS_FIND: `${API}/tasks/find`,
  TASKS_UPDATE: `${API}/tasks/update`,
  TASKS_DELETE: `${API}/tasks/delete`,

  TASKS_FIND_ASSIGNED: `${API}/tasks/find-assigned`,
  TASKS_FIND_GIVEN: `${API}/tasks/find-given`,
  TASKS_FINISH_ASSIGNED: `${API}/tasks/finish-assigned`,
  TASKS_SET_END_TIME: `${API}/tasks/set-end-time`,

  FILES_ADD: `${API}/file-list/add`,
  FILES_FIND: `${API}/file-list/find`,
  FILES_UPDATE: `${API}/file-list/update`,
  FILES_DELETE: `${API}/file-list/delete`,

  META_ADD: `${API}/meta-list/add`,
  META_FIND: `${API}/meta-list/find`,
  META_UPDATE: `${API}/meta-list/update`,
  META_DELETE: `${API}/meta-list/delete`,

  // ===========================
  // Legal entities
  // ===========================

  LEGAL_ENTITIES_ADD: `${API}/legal-entities/add`,
  LEGAL_ENTITIES_FIND: `${API}/legal-entities/find`,
  LEGAL_ENTITIES_UPDATE: `${API}/legal-entities/update`,
  LEGAL_ENTITIES_DELETE: `${API}/legal-entities/delete`,

  // ===========================
  // Contracts
  // ===========================

  CONTRACTS_ADD: `${API}/contracts/add`,
  CONTRACTS_FIND: `${API}/contracts/find`,
  CONTRACTS_UPDATE: `${API}/contracts/update`,
  CONTRACTS_DELETE: `${API}/contracts/delete`,

  // ===========================
  // Works
  // ===========================

  HARD_WORKS_ADD: `${API}/works/hard/add`,
  HARD_WORKS_FIND: `${API}/works/hard/find`,
  HARD_WORKS_UPDATE: `${API}/works/hard/update`,
  HARD_WORKS_DELETE: `${API}/works/hard/delete`,

  REGULAR_WORKS_ADD: `${API}/works/regular/add`,
  REGULAR_WORKS_FIND: `${API}/works/regular/find`,
  REGULAR_WORKS_UPDATE: `${API}/works/regular/update`,
  REGULAR_WORKS_DELETE: `${API}/works/regular/delete`,

  // ===========================
  // Jobs
  // ===========================

  JOBS_ADD: `${API}/jobs/add`,
  JOBS_FIND: `${API}/jobs/find`,
  JOBS_UPDATE: `${API}/jobs/update`,
  JOBS_DELETE: `${API}/jobs/delete`,

  WORK_JOBS_ADD: `${API}/works/jobs/add`,
  WORK_JOBS_FIND: `${API}/works/jobs/find`,
  WORK_JOBS_UPDATE: `${API}/works/jobs/update`,
  WORK_JOBS_DELETE: `${API}/works/jobs/delete`,

  // ===========================
  // Objects
  // ===========================

  OBJECTS_ADD: `${API}/objects/add`,
  OBJECTS_FIND: `${API}/objects/find`,
  OBJECTS_UPDATE: `${API}/objects/update`,
  OBJECTS_DELETE: `${API}/objects/delete`,

  OBJECTS_LAST_REPAIR_FIND: `${API}/objects/last-repair/find`,
  OBJECTS_LAST_REPAIR_UPDATE: `${API}/objects/last-repair/update`,

  // ===========================
  // Districts
  // ===========================

  DISTRICTS_ADD: `${API}/districts/add`,
  DISTRICTS_FIND: `${API}/districts/find`,
  DISTRICTS_UPDATE: `${API}/districts/update`,
  DISTRICTS_DELETE: `${API}/districts/delete`,

  // ===========================
  // Streets
  // ===========================

  STREETS_ADD: `${API}/streets/add`,
  STREETS_FIND: `${API}/streets/find`,
  STREETS_UPDATE: `${API}/streets/update`,
  STREETS_DELETE: `${API}/streets/delete`,
}
