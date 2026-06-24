import React from 'react'
import './WorkStatusPage.css'

function WorkStatusPage() {
  return (
    <div className="work-status-panel">
      <div className="work-hero">
        <h2>Статусы работ</h2>

        <p>Карточки объектов по листам «Статусы КБУ» и «Статусы ТекРем».</p>

        <div className="work-plan-row">
          <div className="work-plan-card">
            <span>Начало работ</span>
            <b>01.04.2026</b>
          </div>

          <div className="work-plan-card">
            <span>Окончание работ</span>
            <b>30.10.2026</b>
          </div>

          <div className="work-plan-card">
            <span>Всего объектов</span>
            <b>327</b>
          </div>

          <div className="work-plan-card">
            <span>После фильтрации</span>
            <b>102</b>
          </div>

          <div className="work-plan-card counter-warn">
            <span>Требуют актуализации</span>
            <b>18</b>
          </div>

          <div className="work-plan-card danger">
            <span>В работе / Завершен</span>
            <b>7</b>
          </div>
        </div>
      </div>

      <div className="card work-filter-panel">
        <div className="work-filters">
          <input placeholder="Поиск..." />

          <select>
            <option>Исполнитель</option>
          </select>

          <select>
            <option>Статус</option>
          </select>

          <label className="work-update-filter">
            <input type="checkbox" />
            <span>Требуют актуализации</span>
          </label>

          <label className="work-update-filter">
            <input type="checkbox" />
            <span>В работе / Завершен</span>
          </label>

          <button className="main-btn">Сбросить</button>
        </div>
      </div>

      <div className="work-cards">
        {[1, 2, 3, 4].map((item) => (
          <div className="work-card" key={item}>
            <h3>Объект №{item}</h3>
            <p>ул. Примерная</p>

            <div className="work-card-status">В работе</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkStatusPage
