import React from 'react'
import './TasksPage.css'

function TasksPage() {
  return (
    <>
      <div className="panel">
        <div className="tasks-toolbar">
          <input placeholder="Поиск по задаче, тексту или ответственному" />

          <select className="field-select">
            <option>Статус</option>
          </select>

          <select className="field-select">
            <option>Ответственный</option>
          </select>

          <select className="field-select">
            <option>Тип задачи</option>
          </select>

          <select className="field-select">
            <option value="">Дедлайн: все</option>
            <option value="today">Сегодня</option>
            <option value="week">На неделе</option>
            <option value="overdue">Просроченные</option>
          </select>

          <label className="task-closed-filter">
            <input className="nice-check" type="checkbox" />
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
          <button className="main-btn">+ Добавить задачу</button>

          <button className="main-btn secondary">
            Включить ежедневную проверку
          </button>

          <button className="main-btn secondary">↻ Обновить</button>
        </div>
      </div>

      <div className="task-form-panel">
        <h3 style={{ margin: '0 0 12px' }}>Добавить / изменить задачу</h3>

        <div className="task-form-grid">
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
            <select className="field-select">
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
            <div className="task-user-select">
              <div className="label">
                Пользователи загрузятся при открытии вкладки.
              </div>
            </div>
          </label>
        </div>

        <div className="task-form-actions">
          <button className="main-btn">Сохранить задачу</button>

          <button className="main-btn secondary">Очистить</button>

          <button className="main-btn secondary">Закрыть</button>
        </div>

        <div className="acts-status" style={{ marginTop: '12px' }}>
          Заполните поля задачи.
        </div>
      </div>

      <div className="tasks-grid">
        <div className="empty task-empty">
          Откройте вкладку для загрузки задач.
        </div>
      </div>
    </>
  )
}

export default TasksPage
