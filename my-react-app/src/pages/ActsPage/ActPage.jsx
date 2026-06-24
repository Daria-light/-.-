import React from 'react'
import './ActPage.css'

function ActPage() {
  return (
    <div className="acts-panel">
      <section className="acts-hero">
        <h2>Работа с актами</h2>

        <p className="muted-note">
          Обновление списка актов, массовое формирование документов и связывание
          PDF-файлов.
        </p>

        <div className="acts-kpi-row">
          <div className="acts-kpi">
            <span>Основные акты</span>
            <b>3 стр.</b>
          </div>

          <div className="acts-kpi">
            <span>Приложение</span>
            <b>4 стр.</b>
          </div>

          <div className="acts-kpi">
            <span>Источник</span>
            <b>Drive</b>
          </div>
        </div>
      </section>

      <section className="acts-grid">
        <div className="acts-box">
          <h3>Синхронизация с Google Drive</h3>

          <div className="acts-actions">
            <button className="main-btn">Обновить список актов</button>

            <button className="main-btn secondary">Сопоставить акты</button>
          </div>
        </div>

        <div className="acts-box">
          <h3>Формирование акта</h3>

          <div className="acts-create">
            <input placeholder="Поиск объектов для формирования актов" />

            <div className="act-selected-panel">
              <span>Выбрано объектов: 0</span>

              <div className="act-mini-actions">
                <button className="small-btn">Выбрать найденные</button>

                <button className="small-btn">Снять выбор</button>
              </div>
            </div>

            <div className="act-list">
              <div className="label">Здесь будет список объектов</div>
            </div>

            <button className="main-btn">Сформировать акт</button>

            <button className="main-btn secondary">Экспорт PDF</button>

            <div className="acts-status">
              Выберите объекты для формирования акта
            </div>
          </div>
        </div>
      </section>

      <section className="pdf-tools-grid">
        <div className="acts-box">
          <h3>Обработка PDF</h3>

          <div className="acts-create">
            <div className="pdf-help">
              Загрузите один или несколько PDF файлов.
            </div>

            <label className="drop-zone">
              <span className="drop-zone-icon">⇪</span>

              <strong>Перетащите PDF сюда</strong>

              <span>Можно выбрать несколько файлов</span>

              <input type="file" multiple accept=".pdf" />
            </label>

            <div className="pdf-file-list">
              <div className="label">PDF ещё не загружены</div>
            </div>

            <div className="pdf-actions-row">
              <button className="main-btn">Оставить 3 страницы</button>

              <button className="main-btn secondary">Сохранить</button>
            </div>
          </div>
        </div>

        <div className="acts-box">
          <h3>Статус обработки</h3>

          <div className="acts-status">Загрузите PDF для начала работы</div>
        </div>
      </section>

      <section className="drive-link-panel">
        <div className="drive-link-head">
          <div>
            <h3>Связать PDF между собой</h3>

            <p>Выберите основной PDF и PDF-приложение.</p>
          </div>

          <button className="small-btn">Обновить</button>
        </div>

        <div className="drive-columns">
          <div className="drive-column">
            <div className="drive-column-title">
              <b>Основные PDF</b>
              <span>0 файлов</span>
            </div>

            <input className="drive-search" placeholder="Поиск PDF..." />

            <div className="drive-file-list">
              <div className="label">Загрузка...</div>
            </div>
          </div>

          <div className="drive-column">
            <div className="drive-column-title">
              <b>PDF приложение</b>
              <span>0 файлов</span>
            </div>

            <input className="drive-search" placeholder="Поиск PDF..." />

            <div className="drive-file-list">
              <div className="label">Загрузка...</div>
            </div>
          </div>
        </div>

        <div className="merge-name-panel">
          <label>Имя итогового PDF</label>

          <input placeholder="Название итогового файла" />

          <div className="merge-name-hint">
            Если поле пустое — имя будет создано автоматически.
          </div>
        </div>

        <div className="drive-connect-footer">
          <div className="selected-pair">Выберите файлы для объединения</div>

          <button className="main-btn wide">Связать PDF</button>
        </div>
      </section>
    </div>
  )
}

export default ActPage
