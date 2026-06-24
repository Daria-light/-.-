import React from 'react'
import './TitlesPage.css'

function TitlesPage() {
  return (
    <div className="roadmap-panel">
      <div className="roadmap-hero">
        <div className="roadmap-main-card">
          <div className="roadmap-year">Выбранный год: 2026</div>

          <h2>Формирование дорожной карты</h2>

          <p>Сравнение листов ДК и листов обновления.</p>

          <div className="roadmap-years">
            <button className="year-chip active">2026</button>

            <button className="year-chip">2027</button>

            <button className="year-chip">2028</button>

            <button className="year-chip">2029</button>
          </div>

          <div className="roadmap-stats">
            <div className="title-stat-card">
              <span>Всего</span>
              <b>458</b>
            </div>

            <div className="title-stat-card warn">
              <span>Актуализация</span>
              <b>36</b>
            </div>

            <div className="title-stat-card danger">
              <span>Исключить</span>
              <b>12</b>
            </div>

            <div className="title-stat-card good">
              <span>Добавить</span>
              <b>18</b>
            </div>
          </div>
        </div>

        <div className="roadmap-readiness">
          <div className="roadmap-donut">
            <div className="roadmap-center">
              <b>84%</b>
              <span>готово</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card roadmap-dynamics">
        <h3>Динамика показателей</h3>

        <div className="title-template-empty">Здесь позже будут графики</div>
      </div>

      <div className="card roadmap-filter-panel">
        <div className="roadmap-filters">
          <input placeholder="Поиск..." />

          <select>
            <option>Источник</option>
          </select>

          <select>
            <option>Состояние</option>
          </select>

          <button className="main-btn">Сбросить</button>
        </div>
      </div>

      <div className="roadmap-list">
        {[1, 2, 3].map((item) => (
          <div className="roadmap-card" key={item}>
            <div>
              <h4>ул. Ленина {item}</h4>
              <p>ID ODX 12345</p>
            </div>

            <span className="roadmap-badge">Актуально</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TitlesPage
