import React from 'react'
import styles from './ActPage.module.css'

function ActPage() {
  return (
    <div className={styles['acts-panel']}>
      <section className={styles['acts-hero']}>
        <h2>Работа с актами</h2>

        <p className={styles['muted-note']}>
          Обновление списка актов, массовое формирование документов и связывание
          PDF-файлов.
        </p>

        <div className={styles['acts-kpi-row']}>
          <div className={styles['acts-kpi']}>
            <span>Основные акты</span>
            <b>3 стр.</b>
          </div>

          <div className={styles['acts-kpi']}>
            <span>Приложение</span>
            <b>4 стр.</b>
          </div>

          <div className={styles['acts-kpi']}>
            <span>Источник</span>
            <b>Drive</b>
          </div>
        </div>
      </section>

      <section className={styles['acts-grid']}>
        <div className={styles['acts-box']}>
          <h3>Синхронизация с Google Drive</h3>

          <div className={styles['acts-actions']}>
            <button className={['main-btn']}>Обновить список актов</button>

            <button className={['main-btn'] + ' ' + ['secondary']}>
              Сопоставить акты
            </button>
          </div>
        </div>

        <div className={styles['acts-box']}>
          <h3>Формирование акта</h3>

          <div className={styles['acts-create']}>
            <input placeholder="Поиск объектов для формирования актов" />

            <div className={styles['act-selected-panel']}>
              <span>Выбрано объектов: 0</span>

              <div className={styles['act-mini-actions']}>
                <button className={['small-btn']}>Выбрать найденные</button>

                <button className={['small-btn']}>Снять выбор</button>
              </div>
            </div>

            <div className={styles['act-list']}>
              <div className={styles['label']}>Здесь будет список объектов</div>
            </div>

            <button className={['main-btn']}>Сформировать акт</button>

            <button className={['main-btn'] + ' ' + ['secondary']}>
              Экспорт PDF
            </button>

            <div className={styles['acts-status']}>
              Выберите объекты для формирования акта
            </div>
          </div>
        </div>
      </section>

      <section className={styles['pdf-tools-grid']}>
        <div className={styles['acts-box']}>
          <h3>Обработка PDF</h3>

          <div className={styles['acts-create']}>
            <div className={styles['pdf-help']}>
              Загрузите один или несколько PDF файлов.
            </div>

            <label className={styles['drop-zone']}>
              <span className={styles['drop-zone-icon']}>⇪</span>

              <strong>Перетащите PDF сюда</strong>

              <span>Можно выбрать несколько файлов</span>

              <input type="file" multiple accept=".pdf" />
            </label>

            <div className={styles['pdf-file-list']}>
              <div className={styles['label']}>PDF ещё не загружены</div>
            </div>

            <div className={styles['pdf-actions-row']}>
              <button className={['main-btn']}>Оставить 3 страницы</button>

              <button className={['main-btn'] + ' ' + ['secondary']}>
                Сохранить
              </button>
            </div>
          </div>
        </div>

        <div className={styles['acts-box']}>
          <h3>Статус обработки</h3>

          <div className={styles['acts-status']}>
            Загрузите PDF для начала работы
          </div>
        </div>
      </section>

      <section className={styles['drive-link-panel']}>
        <div className={styles['drive-link-head']}>
          <div>
            <h3>Связать PDF между собой</h3>

            <p>Выберите основной PDF и PDF-приложение.</p>
          </div>

          <button className={['small-btn']}>Обновить</button>
        </div>

        <div className={styles['drive-columns']}>
          <div className={styles['drive-column']}>
            <div className={styles['drive-column-title']}>
              <b>Основные PDF</b>
              <span>0 файлов</span>
            </div>

            <input
              className={styles['drive-search']}
              placeholder="Поиск PDF..."
            />

            <div className={styles['drive-file-list'] + ' ' + 'skeleton'}>
              <div className={styles['label']}></div>
            </div>
          </div>

          <div className={styles['drive-column']}>
            <div className={styles['drive-column-title']}>
              <b>PDF приложение</b>
              <span>0 файлов</span>
            </div>

            <input
              className={styles['drive-search']}
              placeholder="Поиск PDF..."
            />

            <div className={styles['drive-file-list'] + ' ' + 'skeleton'}>
              <div className={styles['label']}></div>
            </div>
          </div>
        </div>

        <div className={styles['merge-name-panel']}>
          <label>Имя итогового PDF</label>

          <input placeholder="Название итогового файла" />

          <div className={styles['merge-name-hint']}>
            Если поле пустое — имя будет создано автоматически.
          </div>
        </div>

        <div className={styles['drive-connect-footer']}>
          <div className={styles['selected-pair']}>
            Выберите файлы для объединения
          </div>

          <button className={['main-btn'] + ' ' + styles['wide']}>
            Связать PDF
          </button>
        </div>
      </section>
    </div>
  )
}

export default ActPage
