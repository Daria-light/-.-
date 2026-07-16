// src/shared/api/mocks/index.js
import { API_PATHS } from '../config'

// Генерация UUID
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Генерация ID
let idCounter = 1000
const generateId = () => ++idCounter

// Базовые мок-данные - РАСШИРЕННЫЕ
export const mockData = {
  accounts: [
    {
      id: generateUUID(),
      type: 'user',
      login: 'admin',
      sha256: 'admin',
      salt: 'salt123',
      access_id: 1,
    },
    {
      id: generateUUID(),
      type: 'user',
      login: 'manager',
      sha256: 'manager',
      salt: 'salt456',
      access_id: 2,
    },
    {
      id: generateUUID(),
      type: 'user',
      login: 'viewer',
      sha256: 'viewer',
      salt: 'salt789',
      access_id: 3,
    },
  ],
  users: [
    {
      id: generateUUID(),
      last_name: 'Иванов',
      first_name: 'Иван',
      patronomyc: 'Иванович',
      email: 'admin@mail.ru',
      position: 'Администратор системы',
      departament: 'IT',
      role: 'admin',
      account_id: null,
    },
    {
      id: generateUUID(),
      last_name: 'Петров',
      first_name: 'Петр',
      patronomyc: 'Петрович',
      email: 'manager@mail.ru',
      position: 'Менеджер проекта',
      departament: 'Проектный офис',
      role: 'manager',
      account_id: null,
    },
    {
      id: generateUUID(),
      last_name: 'Сидорова',
      first_name: 'Мария',
      patronomyc: 'Ивановна',
      email: 'viewer@mail.ru',
      position: 'Специалист',
      departament: 'Отдел контроля',
      role: 'user',
      account_id: null,
    },
    {
      id: generateUUID(),
      last_name: 'Козлов',
      first_name: 'Дмитрий',
      patronomyc: 'Сергеевич',
      email: 'd.kozlov@mail.ru',
      position: 'Главный инженер',
      departament: 'Производственный отдел',
      role: 'user',
      account_id: null,
    },
    {
      id: generateUUID(),
      last_name: 'Соколова',
      first_name: 'Елена',
      patronomyc: 'Алексеевна',
      email: 'e.sokolova@mail.ru',
      position: 'Ведущий специалист',
      departament: 'Отдел планирования',
      role: 'user',
      account_id: null,
    },
  ],
  tasks: [
    {
      id: generateUUID(),
      type: 'regular',
      name: 'Обновить статусы работ по КБУ',
      description: 'Проверить и актуализировать статусы всех объектов КБУ',
      start: Date.now() - 86400000 * 2,
      deadline: Date.now() + 86400000 * 5,
      commentary: 'Особое внимание уделить объектам с просрочкой',
      responsible_id: 'user-uuid-1',
      author_id: 'user-uuid-2',
      status: 'Активна',
    },
    {
      id: generateUUID(),
      type: 'urgent',
      name: 'Загрузить акты по району САО',
      description: 'Необходимо загрузить все акты за прошлый месяц по САО',
      start: Date.now() - 86400000 * 3,
      deadline: Date.now() + 86400000 * 2,
      commentary: null,
      responsible_id: 'user-uuid-2',
      author_id: 'user-uuid-1',
      status: 'Скоро дедлайн',
    },
    {
      id: generateUUID(),
      type: 'regular',
      name: 'Проверить карточки титула 2026',
      description: 'Актуализировать карточки объектов по титулу 2026 года',
      start: Date.now() - 86400000 * 5,
      deadline: Date.now() - 86400000 * 1,
      commentary: 'Просрочено!',
      responsible_id: 'user-uuid-3',
      author_id: 'user-uuid-1',
      status: 'Просрочена',
    },
    {
      id: generateUUID(),
      type: 'regular',
      name: 'Сформировать дорожную карту 2027',
      description: 'Подготовить проект дорожной карты на 2027 год',
      start: Date.now() - 86400000 * 1,
      deadline: Date.now() + 86400000 * 10,
      commentary: null,
      responsible_id: 'user-uuid-1',
      author_id: 'user-uuid-2',
      status: 'Активна',
    },
    {
      id: generateUUID(),
      type: 'regular',
      name: 'Актуализировать статус объекта №142',
      description: 'Проверить геометрию и статус объекта №142',
      start: Date.now() - 86400000 * 2,
      deadline: Date.now() + 86400000 * 1,
      commentary: 'Срочно!',
      responsible_id: 'user-uuid-2',
      author_id: 'user-uuid-1',
      status: 'Скоро дедлайн',
    },
  ],
  files: [
    {
      id: generateUUID(),
      folder: '/acts/2026/01',
      file_name: 'Акт_КБУ_ул_Ленина.pdf',
      url: 'https://drive.google.com/file/d/xxx1/view',
      mime: 'application/pdf',
      load_date: Date.now() - 86400000 * 2,
      size: 2457600,
      type: 'act',
    },
    {
      id: generateUUID(),
      folder: '/acts/2026/01',
      file_name: 'Акт_КБУ_пр_Мира.pdf',
      url: 'https://drive.google.com/file/d/xxx2/view',
      mime: 'application/pdf',
      load_date: Date.now() - 86400000 * 3,
      size: 1824000,
      type: 'act',
    },
    {
      id: generateUUID(),
      folder: '/acts/2026/02',
      file_name: 'Акт_ТекРем_ул_Гагарина.pdf',
      url: 'https://drive.google.com/file/d/xxx3/view',
      mime: 'application/pdf',
      load_date: Date.now() - 86400000 * 1,
      size: 1250000,
      type: 'act',
    },
    {
      id: generateUUID(),
      folder: '/acts/2026/02',
      file_name: 'Акт_ТекРем_бул_Победы.pdf',
      url: 'https://drive.google.com/file/d/xxx4/view',
      mime: 'application/pdf',
      load_date: Date.now() - 86400000 * 4,
      size: 980000,
      type: 'act',
    },
  ],
  metaList: [
    {
      id: generateUUID(),
      name: 'Сводка по КБУ 2026',
      content: { total: 45, completed: 12, inProgress: 25, pending: 8 },
    },
    {
      id: generateUUID(),
      name: 'Сводка по ТекРем 2026',
      content: { total: 38, completed: 15, inProgress: 18, pending: 5 },
    },
    {
      id: generateUUID(),
      name: 'Сводка по КБУ 2027',
      content: { total: 52, completed: 0, inProgress: 0, pending: 52 },
    },
  ],
  legalEntities: [
    { id: 1, name: 'ГБУ "Автомобильные Дороги"', tax_code: '7712345678' },
    { id: 2, name: 'ООО "ДорСтрой"', tax_code: '7723456789' },
    { id: 3, name: 'ЗАО "Городские дороги"', tax_code: '7734567890' },
    { id: 4, name: 'ООО "СтройИнвест"', tax_code: '7745678901' },
  ],
  contracts: [
    {
      id: 1,
      contract_num: 'К-2026-001',
      start_date: '2026-01-15',
      end_date: '2026-12-31',
      bargaing_date: '2026-01-10',
      subject_matter: 'Капитальный ремонт дорог ЦАО',
      contractor_id: 2,
      employer_id: 1,
    },
    {
      id: 2,
      contract_num: 'К-2026-002',
      start_date: '2026-02-01',
      end_date: '2026-11-30',
      bargaing_date: '2026-01-25',
      subject_matter: 'Текущий ремонт дорог САО',
      contractor_id: 3,
      employer_id: 1,
    },
    {
      id: 3,
      contract_num: 'К-2026-003',
      start_date: '2026-03-01',
      end_date: '2026-10-31',
      bargaing_date: '2026-02-20',
      subject_matter: 'Ремонт дворовых территорий ЮАО',
      contractor_id: 4,
      employer_id: 1,
    },
  ],
  hardWorks: [
    {
      id: 1,
      type: 'КБУ',
      status: 'В работе',
      working_area: 1250.5,
      working_cost: 4580000.0,
      start_date: '2026-01-15',
      deadline_date: '2026-06-30',
      staff_count: 15,
      technic_count: 5,
      object_id: 101,
      contract_id: 1,
      year: 2026,
    },
    {
      id: 2,
      type: 'КБУ',
      status: 'Завершен',
      working_area: 890.0,
      working_cost: 3250000.0,
      start_date: '2026-01-10',
      deadline_date: '2026-04-15',
      staff_count: 12,
      technic_count: 4,
      object_id: 102,
      contract_id: 1,
      year: 2026,
    },
    {
      id: 3,
      type: 'КБУ',
      status: 'Планирование',
      working_area: 2100.0,
      working_cost: 7800000.0,
      start_date: '2026-03-01',
      deadline_date: '2026-09-30',
      staff_count: 20,
      technic_count: 8,
      object_id: 103,
      contract_id: 1,
      year: 2026,
    },
    {
      id: 4,
      type: 'КБУ',
      status: 'В работе',
      working_area: 560.0,
      working_cost: 2150000.0,
      start_date: '2026-02-15',
      deadline_date: '2026-07-15',
      staff_count: 10,
      technic_count: 3,
      object_id: 104,
      contract_id: 1,
      year: 2026,
    },
    {
      id: 5,
      type: 'КБУ',
      status: 'Завершен',
      working_area: 430.0,
      working_cost: 1680000.0,
      start_date: '2026-01-20',
      deadline_date: '2026-03-20',
      staff_count: 8,
      technic_count: 2,
      object_id: 105,
      contract_id: 1,
      year: 2026,
    },
    // 2027 год
    {
      id: 6,
      type: 'КБУ',
      status: 'Планирование',
      working_area: 1500.0,
      working_cost: 5500000.0,
      start_date: '2027-01-15',
      deadline_date: '2027-06-30',
      staff_count: 18,
      technic_count: 6,
      object_id: 301,
      contract_id: 1,
      year: 2027,
    },
    {
      id: 7,
      type: 'КБУ',
      status: 'Планирование',
      working_area: 820.0,
      working_cost: 3200000.0,
      start_date: '2027-02-01',
      deadline_date: '2027-07-31',
      staff_count: 12,
      technic_count: 4,
      object_id: 302,
      contract_id: 1,
      year: 2027,
    },
    // 2028 год (для демонстрации)
    {
      id: 8,
      type: 'КБУ',
      status: 'Планирование',
      working_area: 2000.0,
      working_cost: 7200000.0,
      start_date: '2028-01-15',
      deadline_date: '2028-06-30',
      staff_count: 20,
      technic_count: 7,
      object_id: 101,
      contract_id: 1,
      year: 2028,
    },
    // 2029 год (для демонстрации)
    {
      id: 9,
      type: 'КБУ',
      status: 'Планирование',
      working_area: 1800.0,
      working_cost: 6500000.0,
      start_date: '2029-01-15',
      deadline_date: '2029-06-30',
      staff_count: 18,
      technic_count: 6,
      object_id: 102,
      contract_id: 1,
      year: 2029,
    },
  ],
  regularWorks: [
    {
      id: 101, // было 1
      type: 'ТекРем',
      status: 'Планирование',
      working_area: 680.0,
      working_cost: 1850000.0,
      start: '2026-03-01',
      deadline: '2026-08-31',
      program: 'Городская программа благоустройства',
      object_id: 201,
      contract_id: 2,
      year: 2026,
    },
    {
      id: 102, // было 2
      type: 'ТекРем',
      status: 'В работе',
      working_area: 450.5,
      working_cost: 1250000.0,
      start: '2026-02-15',
      deadline: '2026-07-15',
      program: 'Ремонт дворовых территорий',
      object_id: 202,
      contract_id: 2,
      year: 2026,
    },
    {
      id: 103, // было 3
      type: 'ТекРем',
      status: 'Завершен',
      working_area: 320.0,
      working_cost: 950000.0,
      start: '2026-01-10',
      deadline: '2026-04-10',
      program: 'Текущий ремонт дорог',
      object_id: 203,
      contract_id: 2,
      year: 2026,
    },
    {
      id: 104, // было 4
      type: 'ТекРем',
      status: 'Планирование',
      working_area: 780.0,
      working_cost: 2200000.0,
      start: '2026-04-01',
      deadline: '2026-09-30',
      program: 'Благоустройство общественных пространств',
      object_id: 204,
      contract_id: 3,
      year: 2026,
    },
    {
      id: 105, // было 5
      type: 'ТекРем',
      status: 'В работе',
      working_area: 295.0,
      working_cost: 820000.0,
      start: '2026-02-01',
      deadline: '2026-06-30',
      program: 'Ремонт тротуаров',
      object_id: 205,
      contract_id: 3,
      year: 2026,
    },
    // 2027 год
    {
      id: 106,
      type: 'ТекРем',
      status: 'Планирование',
      working_area: 600.0,
      working_cost: 1600000.0,
      start: '2027-03-15',
      deadline: '2027-08-31',
      program: 'Благоустройство 2027',
      object_id: 301,
      contract_id: 2,
      year: 2027,
    },
    {
      id: 107,
      type: 'ТекРем',
      status: 'Планирование',
      working_area: 400.0,
      working_cost: 1100000.0,
      start: '2027-04-01',
      deadline: '2027-09-30',
      program: 'Ремонт тротуаров 2027',
      object_id: 302,
      contract_id: 2,
      year: 2027,
    },
    // 2028 год
    {
      id: 108,
      type: 'ТекРем',
      status: 'Планирование',
      working_area: 550.0,
      working_cost: 1500000.0,
      start: '2028-03-01',
      deadline: '2028-08-31',
      program: 'Благоустройство 2028',
      object_id: 201,
      contract_id: 2,
      year: 2028,
    },
    // 2029 год
    {
      id: 109,
      type: 'ТекРем',
      status: 'Планирование',
      working_area: 480.0,
      working_cost: 1300000.0,
      start: '2029-03-01',
      deadline: '2029-08-31',
      program: 'Благоустройство 2029',
      object_id: 202,
      contract_id: 2,
      year: 2029,
    },
  ],
  jobs: [
    {
      id: 1,
      name: 'Ремонт покрытия асфальтобетонного',
      description: 'Укладка асфальтобетонного покрытия',
      units: 'м²',
    },
    {
      id: 2,
      name: 'Ремонт бортового камня',
      description: 'Замена и ремонт бортового камня',
      units: 'м',
    },
    {
      id: 3,
      name: 'Ремонт люков колодцев',
      description: 'Ремонт смотровых колодцев',
      units: 'шт',
    },
    {
      id: 4,
      name: 'Устройство газона',
      description: 'Посев газона и подготовка почвы',
      units: 'м²',
    },
    {
      id: 5,
      name: 'Установка павильонов',
      description: 'Монтаж остановочных павильонов',
      units: 'шт',
    },
  ],
  workJobs: [
    { count: 1200.0, job_id: 1, work_id: 1 },
    { count: 250.0, job_id: 2, work_id: 1 },
    { count: 15.0, job_id: 3, work_id: 1 },
    { count: 800.0, job_id: 1, work_id: 2 },
    { count: 180.0, job_id: 2, work_id: 2 },
    { count: 500.0, job_id: 4, work_id: 3 },
    { count: 450.0, job_id: 1, work_id: 4 },
    { count: 120.0, job_id: 2, work_id: 4 },
  ],
  objects: [
    // 2026 год
    {
      id: 101,
      id_odx: 'ODX-001-2026',
      name: 'ул. Ленина от д.1 до д.50',
      total_area: 1250.5,
      street_id: 1,
      district_id: 1,
    },
    {
      id: 102,
      id_odx: 'ODX-002-2026',
      name: 'пр. Мира от д.10 до д.30',
      total_area: 890.0,
      street_id: 2,
      district_id: 2,
    },
    {
      id: 103,
      id_odx: 'ODX-003-2026',
      name: 'ул. Гагарина д.5-15',
      total_area: 2100.0,
      street_id: 3,
      district_id: 1,
    },
    {
      id: 104,
      id_odx: 'ODX-004-2026',
      name: 'бул. Победы д.20-40',
      total_area: 560.0,
      street_id: 4,
      district_id: 3,
    },
    {
      id: 105,
      id_odx: 'ODX-005-2026',
      name: 'ул. Тверская д.30-50',
      total_area: 430.0,
      street_id: 5,
      district_id: 1,
    },
    {
      id: 201,
      id_odx: 'ODX-006-2026',
      name: 'ул. Новослободская д.1-20',
      total_area: 680.0,
      street_id: 6,
      district_id: 1,
    },
    {
      id: 202,
      id_odx: 'ODX-007-2026',
      name: 'пр. Вернадского д.15-35',
      total_area: 450.5,
      street_id: 7,
      district_id: 4,
    },
    {
      id: 203,
      id_odx: 'ODX-008-2026',
      name: 'ул. Профсоюзная д.50-70',
      total_area: 320.0,
      street_id: 8,
      district_id: 3,
    },
    {
      id: 204,
      id_odx: 'ODX-009-2026',
      name: 'ул. Академика Янгеля д.10-30',
      total_area: 780.0,
      street_id: 9,
      district_id: 3,
    },
    {
      id: 205,
      id_odx: 'ODX-010-2026',
      name: 'ул. Варшавское шоссе д.50-70',
      total_area: 295.0,
      street_id: 10,
      district_id: 3,
    },
    // 2027 год
    {
      id: 301,
      id_odx: 'ODX-011-2027',
      name: 'ул. Ленинградское шоссе д.1-40',
      total_area: 1500.0,
      street_id: 11,
      district_id: 2,
    },
    {
      id: 302,
      id_odx: 'ODX-012-2027',
      name: 'ул. Садовое кольцо д.10-30',
      total_area: 820.0,
      street_id: 12,
      district_id: 1,
    },
    // 2028 год (для демонстрации)
    {
      id: 401,
      id_odx: 'ODX-013-2028',
      name: 'ул. Кутузовский проспект д.20-50',
      total_area: 2000.0,
      street_id: 15,
      district_id: 4,
    },
    // 2029 год (для демонстрации)
    {
      id: 501,
      id_odx: 'ODX-014-2029',
      name: 'ул. Новый Арбат д.10-30',
      total_area: 1800.0,
      street_id: 14,
      district_id: 1,
    },
  ],
  lastRepairs: [
    { last_repair_year: 2020, id: 101 },
    { last_repair_year: 2019, id: 102 },
    { last_repair_year: null, id: 103 },
    { last_repair_year: 2021, id: 104 },
    { last_repair_year: 2020, id: 105 },
    { last_repair_year: 2018, id: 201 },
    { last_repair_year: null, id: 202 },
    { last_repair_year: 2019, id: 203 },
    { last_repair_year: null, id: 204 },
    { last_repair_year: 2021, id: 205 },
    { last_repair_year: null, id: 301 },
    { last_repair_year: null, id: 302 },
  ],
  districts: [
    { id: 1, name: 'Центральный' },
    { id: 2, name: 'Северный' },
    { id: 3, name: 'Южный' },
    { id: 4, name: 'Западный' },
    { id: 5, name: 'Восточный' },
    { id: 6, name: 'Северо-Западный' },
    { id: 7, name: 'Северо-Восточный' },
    { id: 8, name: 'Юго-Западный' },
    { id: 9, name: 'Юго-Восточный' },
    { id: 10, name: 'Зеленоградский' },
  ],
  streets: [
    { id: 1, name: 'ул. Ленина' },
    { id: 2, name: 'пр. Мира' },
    { id: 3, name: 'ул. Гагарина' },
    { id: 4, name: 'бул. Победы' },
    { id: 5, name: 'ул. Тверская' },
    { id: 6, name: 'ул. Новослободская' },
    { id: 7, name: 'пр. Вернадского' },
    { id: 8, name: 'ул. Профсоюзная' },
    { id: 9, name: 'ул. Академика Янгеля' },
    { id: 10, name: 'Варшавское шоссе' },
    { id: 11, name: 'Ленинградское шоссе' },
    { id: 12, name: 'Садовое кольцо' },
    { id: 13, name: 'ул. Арбат' },
    { id: 14, name: 'ул. Новый Арбат' },
    { id: 15, name: 'Кутузовский проспект' },
  ],
}

// Имитация задержки
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

// Поиск с фильтрацией
function filterData(data, filter) {
  if (!filter || Object.keys(filter).length === 0) return data

  return data.filter((item) => {
    for (const [key, condition] of Object.entries(filter)) {
      if (key === 'and') {
        return condition.every((c) => filterData([item], c).length > 0)
      }
      if (key === 'or') {
        return condition.some((c) => filterData([item], c).length > 0)
      }
      if (key === 'not') {
        return !filterData([item], condition).length > 0
      }

      if (condition.is !== undefined) {
        if (item[key] !== condition.is) return false
      }
      if (condition.in !== undefined) {
        if (!condition.in.includes(item[key])) return false
      }
      if (condition.like !== undefined) {
        const pattern = condition.like.replace(/%/g, '')
        if (!String(item[key]).includes(pattern)) return false
      }
    }
    return true
  })
}

// Сортировка
function sortData(data, sortingBy, descendingOrder) {
  if (!sortingBy) return data
  return [...data].sort((a, b) => {
    const valA = a[sortingBy] ?? ''
    const valB = b[sortingBy] ?? ''
    if (valA < valB) return descendingOrder ? 1 : -1
    if (valA > valB) return descendingOrder ? -1 : 1
    return 0
  })
}

// Главный обработчик мок-запросов
export async function mockRequest(endpoint, body = {}, method = 'POST') {
  console.log('🔵 MOCK REQUEST:', endpoint, body)
  await delay(300 + Math.random() * 300)

  // ==================== АУТЕНТИФИКАЦИЯ ====================
  if (endpoint === API_PATHS.USER_AUTH) {
    console.log('🔵 USER AUTH:', body)
    const { login, password } = body

    // Валидные пары логин/пароль для моков
    const validUsers = {
      admin: {
        password: 'admin',
        role: 'admin',
        email: 'admin@mail.ru',
        name: 'Администратор',
      },
      manager: {
        password: 'manager',
        role: 'manager',
        email: 'manager@mail.ru',
        name: 'Менеджер',
      },
      viewer: {
        password: 'viewer',
        role: 'viewer',
        email: 'viewer@mail.ru',
        name: 'Пользователь',
      },
    }

    const userData = validUsers[login]
    console.log('🔵 USER DATA:', userData)

    if (!userData || userData.password !== password) {
      console.log('🔴 INVALID CREDENTIALS')
      throw {
        type: 'about:blank',
        title: 'Authentication failed',
        status: 401,
        detail: 'Неверный логин или пароль',
        instance: endpoint,
      }
    }

    // Находим пользователя в мок-данных
    let user = mockData.users.find((u) => u.email === userData.email)
    if (!user) {
      user = {
        id: generateUUID(),
        last_name: userData.name,
        first_name: '',
        patronomyc: null,
        email: userData.email,
        position: 'Пользователь',
        departament: 'Отдел',
        role: userData.role,
        account_id: null,
      }
      mockData.users.push(user)
    }

    const response = {
      data: {
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        tokenType: 'Bearer',
        expiresIn: 3600,
        user: {
          id: user.id,
          full_name: userData.name,
          email: userData.email,
          role: userData.role,
        },
      },
    }
    console.log('🔵 LOGIN SUCCESS:', response)
    return response
  }

  if (endpoint === API_PATHS.AGENT_AUTH) {
    const { login, password } = body
    if (login === 'agent' && password === 'agent123') {
      return {
        data: {
          accessToken: 'mock-agent-token-' + Date.now(),
          tokenType: 'Bearer',
          expiresIn: 3600,
        },
      }
    }
    throw {
      type: 'about:blank',
      title: 'Authentication failed',
      status: 401,
      detail: 'Неверный логин или пароль агента',
      instance: endpoint,
    }
  }

  if (endpoint === API_PATHS.REFRESH) {
    return {
      data: {
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        tokenType: 'Bearer',
        expiresIn: 3600,
      },
    }
  }

  // ==================== CRUD ОПЕРАЦИИ ====================
  const getDataMap = () => {
    if (endpoint.includes('/accounts'))
      return { data: mockData.accounts, idField: 'id' }
    if (endpoint.includes('/users'))
      return { data: mockData.users, idField: 'id' }
    if (endpoint.includes('/tasks'))
      return { data: mockData.tasks, idField: 'id' }
    if (endpoint.includes('/file-list'))
      return { data: mockData.files, idField: 'id' }
    if (endpoint.includes('/meta-list'))
      return { data: mockData.metaList, idField: 'id' }
    if (endpoint.includes('/legal-entities'))
      return { data: mockData.legalEntities, idField: 'id' }
    if (endpoint.includes('/contracts'))
      return { data: mockData.contracts, idField: 'id' }
    if (endpoint.includes('/works/hard'))
      return { data: mockData.hardWorks, idField: 'id' }
    if (endpoint.includes('/works/regular'))
      return { data: mockData.regularWorks, idField: 'id' }
    if (endpoint.includes('/jobs'))
      return { data: mockData.jobs, idField: 'id' }
    if (endpoint.includes('/works/jobs'))
      return { data: mockData.workJobs, idField: ['job_id', 'work_id'] }
    if (endpoint.includes('/objects/last-repair'))
      return { data: mockData.lastRepairs, idField: 'id' }
    if (endpoint.includes('/objects'))
      return { data: mockData.objects, idField: 'id' }
    if (endpoint.includes('/districts'))
      return { data: mockData.districts, idField: 'id' }
    if (endpoint.includes('/streets'))
      return { data: mockData.streets, idField: 'id' }
    return null
  }

  const mapResult = getDataMap()
  if (!mapResult) {
    throw {
      type: 'about:blank',
      title: 'Not found',
      status: 404,
      detail: `Endpoint ${endpoint} not implemented in mocks`,
      instance: endpoint,
    }
  }

  const { data, idField } = mapResult
  const idFields = Array.isArray(idField) ? idField : [idField]

  // FIND
  if (endpoint.endsWith('/find')) {
    const { columns, filter, limit, offset, sorting_by, descending_order } =
      body
    let result = filterData(data, filter)
    result = sortData(result, sorting_by, descending_order)
    const total = result.length
    const items = result.slice(offset || 0, (offset || 0) + (limit || 100))

    const processedItems =
      columns?.length > 0
        ? items.map((item) => {
            const filtered = {}
            columns.forEach((col) => (filtered[col] = item[col]))
            return filtered
          })
        : items

    return {
      data: {
        items: processedItems,
        total,
        offset: offset || 0,
        limit: limit || 100,
        hasMore: (offset || 0) + (limit || 100) < total,
      },
    }
  }

  // ADD
  if (endpoint.endsWith('/add')) {
    const items = Array.isArray(body) ? body : [body]
    const added = items.map((item) => {
      const newItem = { ...item }
      idFields.forEach((field) => {
        if (!newItem[field] || newItem[field] === '') {
          newItem[field] =
            idFields.length === 1 && typeof idFields[0] === 'string'
              ? data.some((d) => typeof d.id === 'number')
                ? generateId()
                : generateUUID()
              : generateUUID()
        }
      })
      data.push(newItem)
      return newItem
    })
    return { data: added.length === 1 ? added[0] : added }
  }

  // UPDATE
  if (endpoint.endsWith('/update')) {
    const items = Array.isArray(body) ? body : [body]
    const updated = items
      .map((item) => {
        const index = data.findIndex((d) => {
          return idFields.every((field) => d[field] === item[field])
        })
        if (index === -1) return null
        data[index] = { ...data[index], ...item }
        return data[index]
      })
      .filter(Boolean)
    return { data: updated.length === 1 ? updated[0] : updated }
  }

  // DELETE
  if (endpoint.endsWith('/delete')) {
    const ids = Array.isArray(body) ? body : [body]
    const deleted = []
    ids.forEach((id) => {
      const index = data.findIndex((d) => {
        return idFields.every((field) => d[field] === id)
      })
      if (index !== -1) {
        deleted.push(data[index])
        data.splice(index, 1)
      }
    })
    return { data: { deleted: deleted.map((d) => d.id) } }
  }

  // ==================== СПЕЦИАЛЬНЫЕ ЭНДПОИНТЫ ====================
  if (endpoint === API_PATHS.ACCOUNTS_GET_AUTH) {
    const { login } = body
    const account = mockData.accounts.find((a) => a.login === login)
    if (!account) {
      throw {
        type: 'about:blank',
        title: 'Not found',
        status: 404,
        detail: 'Account not found',
        instance: endpoint,
      }
    }
    return {
      data: {
        id: account.id,
        sha256: account.sha256,
        salt: account.salt,
      },
    }
  }

  if (endpoint === API_PATHS.ACCOUNTS_GET_TOKEN_META) {
    const { id } = body
    const account = mockData.accounts.find((a) => a.id === id)
    if (!account) {
      throw {
        type: 'about:blank',
        title: 'Not found',
        status: 404,
        detail: 'Account not found',
        instance: endpoint,
      }
    }
    return {
      data: {
        sub: account.login,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        aid: account.access_id,
      },
    }
  }

  // Tasks special endpoints
  if (endpoint === API_PATHS.TASKS_FIND_ASSIGNED) {
    const assignedTasks = data.filter((t) => t.responsible_id === 'user-uuid-1')
    return {
      data: {
        items: assignedTasks,
        total: assignedTasks.length,
        offset: 0,
        limit: 100,
        hasMore: false,
      },
    }
  }

  if (endpoint === API_PATHS.TASKS_FIND_GIVEN) {
    const givenTasks = data.filter((t) => t.author_id === 'user-uuid-1')
    return {
      data: {
        items: givenTasks,
        total: givenTasks.length,
        offset: 0,
        limit: 100,
        hasMore: false,
      },
    }
  }

  if (endpoint === API_PATHS.TASKS_FINISH_ASSIGNED) {
    const { id } = body
    const task = data.find((t) => t.id === id)
    if (!task) {
      throw {
        type: 'about:blank',
        title: 'Not found',
        status: 404,
        detail: 'Task not found',
        instance: endpoint,
      }
    }
    task.status = 'completed'
    const endTime = Date.now()
    return { data: { id: task.id, end_time: endTime } }
  }

  if (endpoint === API_PATHS.TASKS_SET_END_TIME) {
    const { id, end_time } = body
    const task = data.find((t) => t.id === id)
    if (!task) {
      throw {
        type: 'about:blank',
        title: 'Not found',
        status: 404,
        detail: 'Task not found',
        instance: endpoint,
      }
    }
    task.end_time = end_time
    return { data: { id: task.id, end_time: end_time } }
  }

  // Objects last repair endpoints
  if (endpoint === API_PATHS.OBJECTS_LAST_REPAIR_FIND) {
    return {
      data: {
        items: mockData.lastRepairs,
        total: mockData.lastRepairs.length,
        offset: 0,
        limit: 100,
        hasMore: false,
      },
    }
  }

  if (endpoint === API_PATHS.OBJECTS_LAST_REPAIR_UPDATE) {
    const items = Array.isArray(body) ? body : [body]
    const updated = items.map((item) => {
      const index = mockData.lastRepairs.findIndex((d) => d.id === item.id)
      if (index === -1) {
        mockData.lastRepairs.push(item)
        return item
      }
      mockData.lastRepairs[index] = {
        ...mockData.lastRepairs[index],
        ...item,
      }
      return mockData.lastRepairs[index]
    })
    return { data: updated.length === 1 ? updated[0] : updated }
  }

  // Если ничего не подошло - ошибка
  throw {
    type: 'about:blank',
    title: 'Not implemented',
    status: 501,
    detail: `Endpoint ${endpoint} not implemented in mocks`,
    instance: endpoint,
  }
}
