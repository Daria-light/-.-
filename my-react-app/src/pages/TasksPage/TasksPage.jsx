import React from 'react'
import styles from './TasksPage.module.css'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'
import { useState, useEffect } from 'react'
import { tasksAPI } from '../../shared/api'

const statusOptions = [
   { value: '', label: 'Статус: все' },
   { value: 'Активна', label: 'Активна' },
   { value: 'Скоро дедлайн', label: 'Скоро дедлайн' },
   { value: 'Просрочена', label: 'Просрочена' },
   { value: 'Выполнена', label: 'Выполнена' },
]
const adminOptions = [{ value: '', label: 'Ответственный: все' }]
const typeOptions = [
   { value: '', label: 'Тип задачи: все' },
   { value: 'regular', label: 'Обычная' },
   { value: 'urgent', label: 'Срочная' },
]
const deadlineOptions = [
   { value: '', label: 'Дедлайн: все' },
   { value: 'TD', label: 'Сегодня' },
   { value: 'TW', label: 'На неделе' },
   { value: 'D', label: 'Просроченные' },
]

function TasksPage() {
   const [tasks, setTasks] = useState([])
   const [filteredTasks, setFilteredTasks] = useState([])
   const [loading, setLoading] = useState(false)
   const [stats, setStats] = useState({
      active: 0,
      soon: 0,
      overdue: 0,
      doneWeek: 0,
   })

   const loadTasks = async () => {
      setLoading(true)
      try {
         console.log('🔄 Загрузка задач...')
         const response = await tasksAPI.findAssigned()
         const tasksData = response.data.items || []
         console.log('📊 Загружено задач:', tasksData.length)
         setTasks(tasksData)
         setFilteredTasks(tasksData)

         const active = tasksData.filter(
            (t) => t.status === 'Активна' || !t.status,
         ).length
         const soon = tasksData.filter(
            (t) => t.status === 'Скоро дедлайн',
         ).length
         const overdue = tasksData.filter(
            (t) => t.status === 'Просрочена',
         ).length
         const doneWeek = tasksData.filter(
            (t) => t.status === 'Выполнена',
         ).length
         setStats({ active, soon, overdue, doneWeek })
      } catch (error) {
         console.error('❌ Ошибка загрузки задач:', error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      loadTasks()
   }, [])

   return (
      <div className={styles['tasks-panel']}>
         <div className={styles['tasks-hero']}>
            <h2>Задачи</h2>
            <p>
               Контроль поручений, ответственных пользователей, дедлайнов и
               регламентных напоминаний по актуализации статусов работ каждый
               вторник и четверг.
            </p>
            <div className={styles['task-stat-row']}>
               <div className={styles['task-stat-card']}>
                  <span>Активные задачи</span>
                  <b id="taskActiveCount">{stats.active}</b>
               </div>
               <div className={`${styles['task-stat-card']} ${styles['warn']}`}>
                  <span>Скоро дедлайн</span>
                  <b id="taskSoonCount">{stats.soon}</b>
               </div>
               <div
                  className={`${styles['task-stat-card']} ${styles['danger']}`}
               >
                  <span>Просрочено</span>
                  <b id="taskOverdueCount">{stats.overdue}</b>
               </div>
               <div className={styles['task-stat-card']}>
                  <span>Выполнено за неделю</span>
                  <b id="taskDoneWeekCount">{stats.doneWeek}</b>
               </div>
            </div>
         </div>

         <div className={['panel']}>
            <div className={styles['tasks-toolbar']}>
               <input
                  placeholder="Поиск по задаче, тексту или ответственному"
                  onChange={(e) => {
                     const value = e.target.value
                     if (!value.trim()) {
                        setFilteredTasks(tasks)
                        return
                     }
                     setFilteredTasks(
                        tasks.filter(
                           (t) =>
                              t.name
                                 ?.toLowerCase()
                                 .includes(value.toLowerCase()) ||
                              t.description
                                 ?.toLowerCase()
                                 .includes(value.toLowerCase()),
                        ),
                     )
                  }}
               />
               <AppSelect
                  options={statusOptions}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  placeholder="Статус.."
                  onChange={(option) => {
                     if (!option?.value) {
                        setFilteredTasks(tasks)
                        return
                     }
                     setFilteredTasks(
                        tasks.filter((t) => t.status === option.value),
                     )
                  }}
               />
               <AppSelect
                  options={adminOptions}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  placeholder="Ответственный.."
               />
               <AppSelect
                  options={typeOptions}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  placeholder="Тип задачи.."
               />
               <AppSelect
                  options={deadlineOptions}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  placeholder="Дедлайн.."
               />
               <label className={styles['task-closed-filter']}>
                  <input className={styles['nice-check']} type="checkbox" />
                  <span>Показывать закрытые</span>
               </label>
            </div>

            <div
               style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  marginTop: '12px',
               }}
            >
               <button className={['main-btn']}>+ Добавить задачу</button>
               <button className={`${['main-btn']} ${['secondary']}`}>
                  Включить ежедневную проверку
               </button>
               <button
                  className={`${['main-btn']} ${['secondary']}`}
                  onClick={loadTasks}
               >
                  ↻ Обновить
               </button>
            </div>
         </div>

         <div className={styles['task-form-panel']}>
            <h3 style={{ margin: '0 0 12px' }}>Добавить / изменить задачу</h3>
            <div className={styles['task-form-grid']}>
               <label>
                  Название задачи
                  <input placeholder="Например: Актуализировать статусы по КБУ" />
               </label>
               <label>
                  Дедлайн
                  <input type="datetime-local" />
               </label>
               <label>
                  Тип задачи
                  <select className={styles['field-select']}>
                     <option>Статусы работ</option>
                     <option>Акты</option>
                     <option>PDF</option>
                     <option>Другое</option>
                  </select>
               </label>
               <label>
                  Комментарий
                  <input placeholder="Дополнительный комментарий" />
               </label>
               <label style={{ gridColumn: '1 / -1' }}>
                  Текст задачи
                  <textarea placeholder="Опишите, что нужно сделать" />
               </label>
               <label style={{ gridColumn: '1 / -1' }}>
                  Ответственные пользователи
                  <input placeholder="Поиск пользователя" />
                  <div className={styles['task-user-select']}>
                     <div className={styles['label']}>
                        Пользователи загрузятся при открытии вкладки.
                     </div>
                  </div>
               </label>
            </div>
            <div className={styles['task-form-actions']}>
               <button className={['main-btn']}>Сохранить задачу</button>
               <button className={`${['main-btn']} ${['secondary']}`}>
                  Очистить
               </button>
               <button className={`${['main-btn']} ${['secondary']}`}>
                  Закрыть
               </button>
            </div>
            <div
               className={styles['acts-status']}
               style={{ marginTop: '12px' }}
            >
               Заполните поля задачи.
            </div>
         </div>

         <div className={styles['tasks-grid']}>
            {loading ? (
               <div className={`${styles['empty']} ${styles['task-empty']}`}>
                  Загрузка задач...
               </div>
            ) : filteredTasks.length === 0 ? (
               <div className={`${styles['empty']} ${styles['task-empty']}`}>
                  Нет задач для отображения
               </div>
            ) : (
               filteredTasks.map((task) => (
                  <div key={task.id} className={styles['task-card']}>
                     <div className={styles['task-card-header']}>
                        <h4>{task.name || 'Без названия'}</h4>
                        <span
                           className={`${styles['task-status-badge']} ${
                              task.status === 'Просрочена'
                                 ? styles['status-danger']
                                 : task.status === 'Скоро дедлайн'
                                   ? styles['status-warn']
                                   : styles['status-active']
                           }`}
                        >
                           {task.status || 'Активна'}
                        </span>
                     </div>
                     <div className={styles['task-card-body']}>
                        <p className={styles['task-description']}>
                           {task.description || 'Нет описания'}
                        </p>
                        <div className={styles['task-meta']}>
                           <span className={styles['task-deadline']}>
                              Дедлайн:{' '}
                              {task.deadline
                                 ? new Date(task.deadline).toLocaleDateString()
                                 : 'Не указан'}
                           </span>
                           <span className={styles['task-type']}>
                              Тип: {task.type || 'Обычная'}
                           </span>
                        </div>
                        {task.commentary && (
                           <div className={styles['task-comment']}>
                              💬 {task.commentary}
                           </div>
                        )}
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   )
}

export default TasksPage
