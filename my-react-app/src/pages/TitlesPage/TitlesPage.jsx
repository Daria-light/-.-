import React from 'react'
import styles from './TitlesPage.module.css'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'

const source = [{ value: '', label: 'Источники' }]

const state = [{ value: '', label: 'Состояния' }]

function TitlesPage() {
  return (
    <div className={styles['roadmap-panel']}>
      <div className={styles['roadmap-hero']}>
        <div className={styles['roadmap-main-card']}>
          <div className={styles['roadmap-year']}>Выбранный год: 2026</div>

          <h2>Формирование дорожной карты</h2>

          <p>Сравнение листов ДК и листов обновления.</p>

          <div className={styles['roadmap-years']}>
            <button
              className={`${styles['title-year-chip']} ${styles['active']}`}
            >
              2026
            </button>

            <button className={styles['title-year-chip']}>2027</button>

            <button className={styles['title-year-chip']}>2028</button>

            <button className={styles['title-year-chip']}>2029</button>
          </div>

          <div className={styles['roadmap-stats']}>
            <div className={styles['title-stat-card']}>
              <span>Всего</span>
              <b>458</b>
            </div>

            <div className={`${styles['title-stat-card']} ${styles['warn']}`}>
              <span>Актуализация</span>
              <b>36</b>
            </div>

            <div className={`${styles['title-stat-card']} ${styles['danger']}`}>
              <span>Исключить</span>
              <b>12</b>
            </div>

            <div className={`${styles['title-stat-card']} ${styles['good']}`}>
              <span>Добавить</span>
              <b>18</b>
            </div>
          </div>
        </div>
        <div className={styles['title-readiness-card']}>
          <div>
            <h3>Готовность ДК</h3>
            <div
              className={styles['title-readiness-donut']}
              id="roadmapReadinessDonut"
            >
              <div className={styles['title-readiness-center']}>
                <b id="roadmapReadyPercent">0%</b>
                <span>готово</span>
              </div>
            </div>
          </div>
          <div className={styles['title-readiness-meta']}>
            <div>
              <span>Осталось обработать</span>
              <b id="roadmapNeedWorkCount">0</b>
            </div>
            <div>
              <span>Всего за год</span>
              <b id="roadmapReadinessTotal">0</b>
            </div>
          </div>
        </div>
      </div>

      <div className={`${['card']} ${styles['roadmap-dynamics']}`}>
        <h3>Динамика показателей</h3>

        <div className={styles['title-template-empty']}>
          Здесь позже будут графики
        </div>
      </div>

      <div className={`${['card']} ${styles['roadmap-filter-panel']}`}>
        <div className={styles['roadmap-filters']}>
          <input placeholder="Поиск..." />
          <AppSelect
            // value={sourceOptions.find((o) => o.value === sourceFilter)}
            // onChange={(option) => setSourceFilter(option?.value ?? '')}
            options={source}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            placeholder="Источники.."
          ></AppSelect>
          <AppSelect
            // value={sourceOptions.find((o) => o.value === sourceFilter)}
            // onChange={(option) => setSourceFilter(option?.value ?? '')}
            options={state}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            placeholder="Состояния.."
          ></AppSelect>

          <button className={['main-btn']}>Сбросить</button>
        </div>
      </div>

      <div className={styles['roadmap-list']}>
        {[1, 2, 3].map((item) => (
          <div className={styles['roadmap-card']} key={item}>
            <div>
              <h4>ул. Ленина {item}</h4>
              <p>ID ODX 12345</p>
            </div>

            <span className={styles['roadmap-badge']}>Актуально</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TitlesPage
