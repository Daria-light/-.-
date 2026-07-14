import React from 'react'
import styles from './TitlesPage.module.css'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'
import { useState, useEffect } from 'react'

const source = [{ value: '', label: 'Источники' }]

const state = [{ value: '', label: 'Состояния' }]

function TitlesPage() {
  const years = [2026, 2027, 2028, 2029]

  const [selectedYear, setSelectedYear] = useState(2026)

  const [roadmapItems, setRoadmapItems] = useState([])

  const [stats, setStats] = useState({
    total: 0,
    update: 0,
    delete: 0,
    add: 0,
    ready: 0,
  })
  const loadRoadmap = async (year) => {
    /*
    Backend

    POST /api/v1/objects/find

    filter:
    {
        "$year":{
            "is":year
        }
    }

    Затем при необходимости:

    POST /api/v1/works/hard/find

    или

    POST /api/v1/works/regular.find

    Далее объединить данные и вывести.
  */

    const total = Math.floor(Math.random() * 300 + 200)

    const update = Math.floor(Math.random() * 50)

    const remove = Math.floor(Math.random() * 20)

    const add = Math.floor(Math.random() * 30)

    setStats({
      total,
      update,
      delete: remove,
      add,
      ready: Math.floor(((total - update) / total) * 100),
    })

    setRoadmapItems(
      Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        name: `${year} • Объект №${index + 1}`,
        odx: `ODX-${year}-${1000 + index}`,
        status: ['Актуально', 'Добавить', 'Исключить'][
          Math.floor(Math.random() * 3)
        ],
      })),
    )
  }

  useEffect(() => {
    // POST /api/v1/objects/find
    // POST /api/v1/works/hard/find
    // POST /api/v1/works/regular/find

    // setRoadmapItems(response.data.items)
    // setStats(calculateStats(response.data.items))

    loadRoadmap(selectedYear)
  }, [selectedYear])
  return (
    <div className={styles['roadmap-panel']}>
      <div className={styles['roadmap-hero']}>
        <div className={styles['roadmap-main-card']}>
          <div className={styles['roadmap-year']}>
            Выбранный год: {selectedYear}
          </div>

          <h2>Формирование дорожной карты</h2>

          <p>Сравнение листов ДК и листов обновления.</p>

          <div className={styles['roadmap-years']}>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={
                  selectedYear === year
                    ? `${styles['title-year-chip']} ${styles['active']}`
                    : styles['title-year-chip']
                }
              >
                {year}
              </button>
            ))}
          </div>

          <div className={styles['roadmap-stats']}>
            <div className={styles['title-stat-card']}>
              <span>Всего</span>
              <b>{stats.total}</b>
            </div>

            <div className={`${styles['title-stat-card']} ${styles['warn']}`}>
              <span>Актуализация</span>
              <b>{stats.update}</b>
            </div>

            <div className={`${styles['title-stat-card']} ${styles['danger']}`}>
              <span>Исключить</span>
              <b>{stats.delete}</b>
            </div>

            <div className={`${styles['title-stat-card']} ${styles['good']}`}>
              <span>Добавить</span>
              <b>{stats.add}</b>
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
                <b id="roadmapReadyPercent">{stats.ready}%</b>
                <span>готово</span>
              </div>
            </div>
          </div>
          <div className={styles['title-readiness-meta']}>
            <div>
              <span>Осталось обработать</span>
              <b id="roadmapNeedWorkCount">{stats.update}</b>
            </div>
            <div>
              <span>Всего за год</span>
              <b id="roadmapReadinessTotal">{stats.total}</b>
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
        {roadmapItems.map((item) => (
          <div className={styles['roadmap-card']} key={item.odx}>
            <div>
              <h4>{item.name}</h4>

              <p>{item.odx}</p>

              <span>{item.status}</span>
            </div>

            <span
              className={`${styles.roadmapBadge}
    ${
      item.status === 'Добавить'
        ? styles.good
        : item.status === 'Исключить'
          ? styles.danger
          : styles.warn
    }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TitlesPage
