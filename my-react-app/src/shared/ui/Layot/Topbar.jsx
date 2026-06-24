import React from 'react'
import './Topbar.css'

function Topbar() {
  return (
    <div className="topbarWrapper">
      <div className="topbarTitle">
        <h1 className="topbarTitleHeader">
          Обработка и ввод данных в информационные системы
        </h1>
        <p className="topbarTitleParagraph">
          Единая платформа для мониторинга объектов УДС, актуализации статусов,
          работы с актами и внесения данных в АИС
        </p>
      </div>
      <div className="topbarFunction">
        <input placeholder="Поиск объекта по наименованию" type="text" />
        <button className="icon-btn">i</button>
        <button className="icon-btn">i</button>
      </div>
    </div>
  )
}

export default Topbar
