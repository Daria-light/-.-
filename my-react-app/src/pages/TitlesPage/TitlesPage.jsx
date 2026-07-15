import React from 'react'
import styles from './TitlesPage.module.css'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'
import { useState, useEffect } from 'react'
import { hardWorksAPI, regularWorksAPI, objectsAPI } from '../../shared/api'
import { API_CONFIG } from '../../shared/api/config'

const sourceOptions = [
   { value: '', label: 'Источник: все' },
   { value: 'КБУ', label: 'КБУ' },
   { value: 'ТекРем', label: 'ТекРем' },
]

const stateOptions = [
   { value: '', label: 'Состояние: все' },
   { value: 'active', label: 'В работе' },
   { value: 'done', label: 'Завершен' },
   { value: 'plan', label: 'Планирование' },
]

function TitlesPage() {
   const years = [2026, 2027, 2028, 2029]
   const [selectedYear, setSelectedYear] = useState(2026)
   const [roadmapItems, setRoadmapItems] = useState([])
   const [filteredItems, setFilteredItems] = useState([])
   const [loading, setLoading] = useState(true)
   const [searchTerm, setSearchTerm] = useState('')
   const [sourceFilter, setSourceFilter] = useState('')
   const [stateFilter, setStateFilter] = useState('')
   const [error, setError] = useState(null)

   const [stats, setStats] = useState({
      total: 0,
      update: 0,
      delete: 0,
      add: 0,
      ready: 0,
   })

   const loadRoadmap = async (year) => {
      setLoading(true)
      setError(null)
      try {
         console.log('🔄 Загрузка дорожной карты для года:', year)

         const [hardRes, regularRes, objectsRes] = await Promise.all([
            hardWorksAPI.find({ year: { is: year } }, [
               'id',
               'object_id',
               'status',
               'working_area',
               'working_cost',
               'type',
            ]),
            regularWorksAPI.find({ year: { is: year } }, [
               'id',
               'object_id',
               'status',
               'working_area',
               'working_cost',
               'type',
            ]),
            objectsAPI.find({}, ['id', 'id_odx', 'name']),
         ])

         console.log('📊 hardWorks:', hardRes.data.items?.length || 0)
         console.log('📊 regularWorks:', regularRes.data.items?.length || 0)
         console.log('📊 objects:', objectsRes.data.items?.length || 0)

         const objectsMap = {}
         objectsRes.data.items?.forEach((o) => {
            objectsMap[o.id] = o
         })

         const hardItems = (hardRes.data.items || []).map((w) => ({
            id: w.id,
            name:
               objectsMap[w.object_id]?.name || `КБУ - Объект ${w.object_id}`,
            odx: objectsMap[w.object_id]?.id_odx || `ODX-${year}-${w.id}`,
            status: w.status || 'Планирование',
            type: 'КБУ',
            area: w.working_area || 0,
            cost: w.working_cost || 0,
         }))

         const regularItems = (regularRes.data.items || []).map((w) => ({
            id: w.id,
            name:
               objectsMap[w.object_id]?.name ||
               `ТекРем - Объект ${w.object_id}`,
            odx: objectsMap[w.object_id]?.id_odx || `ODX-${year}-${w.id}`,
            status: w.status || 'Планирование',
            type: 'ТекРем',
            area: w.working_area || 0,
            cost: w.working_cost || 0,
         }))

         const allItems = [...hardItems, ...regularItems]
         console.log('📊 Всего объектов:', allItems.length)
         console.log('📊 Пример объекта:', allItems[0])

         setRoadmapItems(allItems)
         setFilteredItems(allItems)

         const total = allItems.length
         const update = allItems.filter((w) => w.status === 'В работе').length
         const remove = allItems.filter(
            (w) => w.status === 'Приостановлен' || w.status === 'Исключить',
         ).length
         const add = allItems.filter(
            (w) => w.status === 'Планирование' || w.status === 'Добавить',
         ).length
         const ready =
            total > 0
               ? Math.floor(((total - update - remove) / total) * 100)
               : 0
         setStats({ total, update, delete: remove, add, ready })
      } catch (error) {
         console.error('❌ Ошибка загрузки:', error)

         // 👇 ЕСЛИ МОКИ ВЫКЛЮЧЕНЫ - НЕ ПОКАЗЫВАТЬ ФЕЙКОВЫЕ ДАННЫЕ
         if (!API_CONFIG.USE_MOCKS) {
            setError(
               'Не удалось загрузить данные. Проверьте подключение к серверу.',
            )
            setRoadmapItems([])
            setFilteredItems([])
            setStats({ total: 0, update: 0, delete: 0, add: 0, ready: 0 })
         } else {
            // 👇 ЕСЛИ МОКИ ВКЛЮЧЕНЫ - ПОКАЗЫВАТЬ ФЕЙКОВЫЕ ДАННЫЕ
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
                  type: index % 2 === 0 ? 'КБУ' : 'ТекРем',
                  area: Math.random() * 1000,
                  cost: Math.random() * 5000000,
               })),
            )
            setFilteredItems(roadmapItems)
         }
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      loadRoadmap(selectedYear)
   }, [selectedYear])

   useEffect(() => {
      let filtered = roadmapItems
      if (searchTerm) {
         filtered = filtered.filter(
            (item) =>
               item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.odx.toLowerCase().includes(searchTerm.toLowerCase()),
         )
      }
      if (sourceFilter) {
         filtered = filtered.filter((item) => item.type === sourceFilter)
      }
      if (stateFilter === 'active') {
         filtered = filtered.filter((item) => item.status === 'В работе')
      } else if (stateFilter === 'done') {
         filtered = filtered.filter((item) => item.status === 'Завершен')
      } else if (stateFilter === 'plan') {
         filtered = filtered.filter((item) => item.status === 'Планирование')
      }
      setFilteredItems(filtered)
   }, [searchTerm, sourceFilter, stateFilter, roadmapItems])

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
                  <div
                     className={`${styles['title-stat-card']} ${styles['warn']}`}
                  >
                     <span>Актуализация</span>
                     <b>{stats.update}</b>
                  </div>
                  <div
                     className={`${styles['title-stat-card']} ${styles['danger']}`}
                  >
                     <span>Исключить</span>
                     <b>{stats.delete}</b>
                  </div>
                  <div
                     className={`${styles['title-stat-card']} ${styles['good']}`}
                  >
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
                     <b id="roadmapNeedWorkCount">
                        {stats.update + stats.delete}
                     </b>
                  </div>
                  <div>
                     <span>Всего за год</span>
                     <b id="roadmapReadinessTotal">{stats.total}</b>
                  </div>
               </div>
            </div>
         </div>

         <div className={`card ${styles['roadmap-dynamics']}`}>
            <h3>Динамика показателей</h3>
            <div className={styles['title-template-empty']}>
               Здесь позже будут графики
            </div>
         </div>

         <div className={`card ${styles['roadmap-filter-panel']}`}>
            <div className={styles['roadmap-filters']}>
               <input
                  placeholder="Поиск..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
               <AppSelect
                  options={sourceOptions}
                  value={sourceOptions.find((o) => o.value === sourceFilter)}
                  onChange={(option) => setSourceFilter(option?.value || '')}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  placeholder="Источник.."
               />
               <AppSelect
                  options={stateOptions}
                  value={stateOptions.find((o) => o.value === stateFilter)}
                  onChange={(option) => setStateFilter(option?.value || '')}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  placeholder="Состояние.."
               />
               <button
                  className="main-btn"
                  onClick={() => {
                     setSearchTerm('')
                     setSourceFilter('')
                     setStateFilter('')
                  }}
               >
                  Сбросить
               </button>
            </div>
         </div>

         <div className={styles['roadmap-list']}>
            {loading ? (
               <div className={styles['roadmap-card']}>
                  <div>Загрузка данных...</div>
               </div>
            ) : error ? (
               <div className={styles['roadmap-card']}>
                  <div
                     style={{
                        textAlign: 'center',
                        padding: '20px',
                     }}
                  >
                     {error}
                  </div>
               </div>
            ) : filteredItems.length === 0 ? (
               <div className={styles['roadmap-card']}>
                  <div
                     style={{
                        textAlign: 'center',
                        padding: '20px',
                        color: '#7a7f93',
                     }}
                  >
                     {API_CONFIG.USE_MOCKS
                        ? 'Нет данных для отображения (моки включены)'
                        : 'Нет данных от сервера'}
                  </div>
               </div>
            ) : (
               filteredItems.map((item) => (
                  <div className={styles['roadmap-card']} key={item.id}>
                     <div>
                        <h4>{item.name}</h4>
                        <p>{item.odx}</p>
                        <span>{item.type}</span>
                        {item.area > 0 && (
                           <span> | Площадь: {item.area.toFixed(2)} м²</span>
                        )}
                        {item.cost > 0 && (
                           <span>
                              {' '}
                              | Стоимость: {item.cost.toLocaleString()} руб.
                           </span>
                        )}
                     </div>
                     <span
                        className={`${styles.roadmapBadge} ${
                           item.status === 'Планирование' ||
                           item.status === 'Добавить'
                              ? styles.good
                              : item.status === 'В работе'
                                ? styles.warn
                                : item.status === 'Завершен'
                                  ? styles.success
                                  : item.status === 'Исключить'
                                    ? styles.danger
                                    : styles.warn
                        }`}
                     >
                        {item.status || 'Актуально'}
                     </span>
                  </div>
               ))
            )}
         </div>
      </div>
   )
}

export default TitlesPage
