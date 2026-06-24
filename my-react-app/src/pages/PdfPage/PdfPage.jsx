import React from 'react'
import './PdfPage.css'

function PdfPage() {
  return (
    <>
      <div className="panel">
        <div className="filters">
          <select className="field-select">
            <option>Геометрия</option>
          </select>

          <select className="field-select">
            <option>Акты</option>
          </select>

          <select className="field-select">
            <option>Загрузка в СОК</option>
          </select>

          <select className="field-select">
            <option>Обновление АИС</option>
          </select>

          <select className="field-select">
            <option>Карточки</option>
          </select>

          <select className="field-select">
            <option>Программа</option>
          </select>

          <select className="field-select">
            <option>Исполнитель</option>
          </select>

          <select className="field-select">
            <option>Подрядчик</option>
          </select>
        </div>

        <div className="search-row">
          <input type="text" placeholder="Поиск объекта по наименованию" />

          <select className="field-select">
            <option>Район</option>
          </select>

          <button className="main-btn">⎚ Сбросить фильтры</button>
        </div>

        <div className="charts">
          <div className="chart-card">
            <h3>Статус геометрии</h3>
          </div>

          <div className="chart-card">
            <h3>Статус актов</h3>
          </div>

          <div className="chart-card">
            <h3>Загрузка в СОК</h3>
          </div>

          <div className="chart-card">
            <h3>Карточки объектов</h3>
          </div>

          <div className="chart-card">
            <h3>Исполнители</h3>
          </div>
        </div>

        <div className="cards">
          <div className="empty">
            Данные мониторинга будут отображаться здесь
          </div>
        </div>

        <div className="pager">
          <button className="page-btn">←</button>

          <button className="page-btn active">1</button>

          <button className="page-btn">2</button>

          <button className="page-btn">3</button>

          <button className="page-btn">→</button>
        </div>
      </div>
    </>
  )
}

export default PdfPage
