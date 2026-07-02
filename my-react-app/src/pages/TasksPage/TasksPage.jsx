import React from 'react'
import styles from './TasksPage.module.css'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'

const status = [{ value: '', label: 'Статус' }]
const admin = [{ value: '', label: 'Ответственный' }]
const type = [{ value: '', label: 'Тип задачи' }]
const deadline = [
  { value: '', label: 'Дедлайн: все' },
  { value: 'TD', label: 'Сегодня' },
  { value: 'TW', label: 'На неделе' },
  { value: 'D', label: 'Просроченные' },
]

function TasksPage() {
  return (
    <div className={styles['tasks-panel']}>
      <div className={styles['tasks-hero']}>
        <h2>Задачи</h2>
        <p>
          Контроль поручений, ответственных пользователей, дедлайнов и
          регламентных напоминаний по актуализации статусов работ каждый вторник
          и четверг.
        </p>
        <div className={styles['task-stat-row']}>
          <div className={styles['task-stat-card']}>
            <span>Активные задачи</span>
            <b id="taskActiveCount">0</b>
          </div>
          <div className={`${styles['task-stat-card']} ${styles['warn']}`}>
            <span>Скоро дедлайн</span>
            <b id="taskSoonCount">0</b>
          </div>
          <div className={`${styles['task-stat-card']} ${styles['danger']}`}>
            <span>Просрочено</span>
            <b id="taskOverdueCount">0</b>
          </div>
          <div className={styles['task-stat-card']}>
            <span>Выполнено за неделю</span>
            <b id="taskDoneWeekCount">0</b>
          </div>
        </div>
      </div>
      <div className={['panel']}>
        <div className={styles['tasks-toolbar']}>
          <input placeholder="Поиск по задаче, тексту или ответственному" />
          <AppSelect
            // value={sourceOptions.find((o) => o.value === sourceFilter)}
            // onChange={(option) => setSourceFilter(option?.value ?? '')}
            options={status}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            placeholder="Статус.."
          ></AppSelect>
          <AppSelect
            // value={sourceOptions.find((o) => o.value === sourceFilter)}
            // onChange={(option) => setSourceFilter(option?.value ?? '')}
            options={admin}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            placeholder="Ответственный.."
          ></AppSelect>
          <AppSelect
            // value={sourceOptions.find((o) => o.value === sourceFilter)}
            // onChange={(option) => setSourceFilter(option?.value ?? '')}
            options={type}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            placeholder="Тип задачи.."
          ></AppSelect>
          <AppSelect
            // value={sourceOptions.find((o) => o.value === sourceFilter)}
            // onChange={(option) => setSourceFilter(option?.value ?? '')}
            options={deadline}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            placeholder="Дедлайн.."
          ></AppSelect>

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

          <button className={`${['main-btn']} ${['secondary']}`}>
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

        <div className={styles['acts-status']} style={{ marginTop: '12px' }}>
          Заполните поля задачи.
        </div>
      </div>

      <div className={styles['tasks-grid']}>
        <div className={`${styles['empty']} ${styles['task-empty']}`}>
          Откройте вкладку для загрузки задач.
        </div>
      </div>
    </div>
  )
}

export default TasksPage
