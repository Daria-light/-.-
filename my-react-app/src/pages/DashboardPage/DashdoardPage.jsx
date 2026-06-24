import React from 'react'
import './Dashboard.css'

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <section className="home-hero">
        <div>
          <div className="home-overline">АИС Мониторинг объектов</div>

          <h2>
            Единая рабочая среда для контроля объектов, актов, титулов и задач
          </h2>

          <p>
            Быстрый доступ к основным разделам системы, актуальным задачам и
            ключевым показателям.
          </p>

          <div className="home-hero-actions">
            <button className="primary-btn">Перейти к объектам</button>

            <button className="home-ghost-btn">Открыть задачи</button>
          </div>
        </div>

        <div className="home-hero-side">
          <div className="home-date-chip">Июнь 2026</div>

          <div className="home-side-panel">
            <span>Система</span>

            <b>Все данные под контролем</b>

            <p>
              Мониторинг объектов, актов, титулов и статусов работ в одном
              интерфейсе.
            </p>

            <div className="home-side-badges">
              <span>Объекты</span>
              <span>Акты</span>
              <span>Задачи</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-layout">
        <div className="home-card home-modules-card">
          <div className="home-card-head">
            <div>
              <h3>Рабочие разделы</h3>

              <p className="home-card-sub">Основные разделы платформы</p>
            </div>
          </div>

          <div className="home-module-grid">
            <button className="home-module">
              <div className="home-module-icon">⌂</div>

              <h4>Мониторинг объектов</h4>

              <p>Статусы геометрии, актов и карточек.</p>
            </button>

            <button className="home-module">
              <div className="home-module-icon">□</div>

              <h4>Работа с актами</h4>

              <p>Формирование и экспорт PDF.</p>
            </button>

            <button className="home-module">
              <div className="home-module-icon">▤</div>

              <h4>Статусы работ</h4>

              <p>КБУ, ТекРем и актуализация.</p>
            </button>

            <button className="home-module">
              <div className="home-module-icon">☑</div>

              <h4>Задачи</h4>

              <p>Контроль поручений и дедлайнов.</p>
            </button>
          </div>
        </div>

        <div className="home-card home-tasks-card">
          <div className="home-card-head">
            <div>
              <h3>Текущие задачи</h3>

              <p className="home-card-sub">Ближайшие дедлайны</p>
            </div>
          </div>

          <div className="home-task-list">
            <div className="home-task-item">
              <div className="home-task-title">Загрузка задач будет здесь</div>

              <div className="home-task-text">
                После подключения API появятся реальные данные.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
