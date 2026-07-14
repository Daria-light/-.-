import React from 'react'
import styles from './CardsTitlePage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'
import { hardWorksAPI, regularWorksAPI, objectsAPI } from '../../shared/api'

const years = [2026, 2027, 2028, 2029]

const sourceOptions = [
   { value: '', label: 'Источник: все' },
   { value: 'KBU', label: 'КБУ' },
   { value: 'TR', label: 'ТекРем' },
]

const stateOptions = [
   { value: '', label: 'Состояние карточки: все' },
   { value: 'actualize', label: 'Требуется актуализация' },
   { value: 'exclude', label: 'Исключить объект' },
   { value: 'create', label: 'Создать новый объект' },
   { value: 'unable', label: 'Карточка не создана' },
   { value: 'ok', label: 'Актуально' },
]

const loadStatusOptions = [
   { value: '', label: 'Статус загрузки: все' },
   { value: 'new_version', label: 'Создана новая версия карточки ОДХ' },
   { value: 'new_card', label: 'Создана новая карточка' },
   { value: 'not_created', label: 'Карточка не создана' },
]

function CardsTitlePage() {
   const navigate = useNavigate()
   const { year } = useParams()
   const currentYear = Number(year) || 2026

   const [loading, setLoading] = useState(true)
   const [cards, setCards] = useState([])
   const [filteredCards, setFilteredCards] = useState([])
   const [searchTerm, setSearchTerm] = useState('')
   const [sourceFilter, setSourceFilter] = useState('')
   const [stateFilter, setStateFilter] = useState('')
   const [loadStatusFilter, setLoadStatusFilter] = useState('')

   const [stats, setStats] = useState({
      total: 0,
      actualize: 0,
      exclude: 0,
      create: 0,
      unable: 0,
      filtered: 0,
      needWork: 0,
      readyPercent: 0,
   })

   const changeYear = (year) => {
      navigate(`/cards-title/${year}`)
   }

   const loadCards = async (year) => {
      setLoading(true)
      try {
         console.log('🔄 Загрузка карточек для года:', year)

         const [hardRes, regularRes, objectsRes] = await Promise.all([
            hardWorksAPI.find({ year: { is: year } }, [
               'id',
               'object_id',
               'status',
               'working_area',
               'working_cost',
               'start_date',
               'deadline_date',
            ]),
            regularWorksAPI.find({ year: { is: year } }, [
               'id',
               'object_id',
               'status',
               'working_area',
               'working_cost',
               'start',
               'deadline',
            ]),
            objectsAPI.find({}, ['id', 'id_odx', 'name', 'district_id']),
         ])

         console.log('📊 hardWorks:', hardRes.data.items?.length || 0)
         console.log('📊 regularWorks:', regularRes.data.items?.length || 0)
         console.log('📊 objects:', objectsRes.data.items?.length || 0)

         const objectsMap = {}
         objectsRes.data.items?.forEach((o) => {
            objectsMap[o.id] = o
         })

         const hardCards = (hardRes.data.items || []).map((w) => {
            const obj = objectsMap[w.object_id] || {}
            return {
               id: `kbu-${w.id}`,
               source: 'KBU',
               sourceLabel: 'КБУ',
               name: obj.name || `КБУ - Объект ${w.object_id}`,
               odx: obj.id_odx || `ODX-${year}-${w.id}`,
               status: w.status || 'Планирование',
               area: w.working_area || 0,
               cost: w.working_cost || 0,
               startDate: w.start_date || '',
               endDate: w.deadline_date || '',
               cardState:
                  w.status === 'В работе' || w.status === 'Завершен'
                     ? 'actualize'
                     : 'ok',
               cardStateLabel:
                  w.status === 'В работе' || w.status === 'Завершен'
                     ? 'Требуется актуализация'
                     : 'Актуально',
               needAction: w.status === 'В работе' || w.status === 'Завершен',
               district: obj.district_id || '',
            }
         })

         const regularCards = (regularRes.data.items || []).map((w) => {
            const obj = objectsMap[w.object_id] || {}
            return {
               id: `tr-${w.id}`,
               source: 'TR',
               sourceLabel: 'ТекРем',
               name: obj.name || `ТекРем - Объект ${w.object_id}`,
               odx: obj.id_odx || `ODX-${year}-${w.id}`,
               status: w.status || 'Планирование',
               area: w.working_area || 0,
               cost: w.working_cost || 0,
               startDate: w.start || '',
               endDate: w.deadline || '',
               cardState:
                  w.status === 'В работе' || w.status === 'Завершен'
                     ? 'actualize'
                     : 'ok',
               cardStateLabel:
                  w.status === 'В работе' || w.status === 'Завершен'
                     ? 'Требуется актуализация'
                     : 'Актуально',
               needAction: w.status === 'В работе' || w.status === 'Завершен',
               district: obj.district_id || '',
            }
         })

         const allCards = [...hardCards, ...regularCards]
         console.log('📊 Всего карточек:', allCards.length)
         setCards(allCards)
         setFilteredCards(allCards)

         const total = allCards.length
         const actualize = allCards.filter(
            (c) => c.cardState === 'actualize',
         ).length
         const needWork = allCards.filter((c) => c.needAction).length
         const readyPercent =
            total > 0 ? Math.floor(((total - needWork) / total) * 100) : 0
         setStats({
            total,
            actualize,
            exclude: 0,
            create: 0,
            unable: 0,
            filtered: total,
            needWork,
            readyPercent,
         })
      } catch (error) {
         console.error('❌ Ошибка загрузки карточек:', error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      loadCards(currentYear)
   }, [currentYear])

   // Применяем фильтры при изменении searchTerm, sourceFilter, stateFilter или cards
   useEffect(() => {
      let filtered = cards
      if (searchTerm) {
         filtered = filtered.filter(
            (c) =>
               c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               c.odx.toLowerCase().includes(searchTerm.toLowerCase()),
         )
      }
      if (sourceFilter) {
         filtered = filtered.filter((c) => c.source === sourceFilter)
      }
      if (stateFilter) {
         filtered = filtered.filter((c) => c.cardState === stateFilter)
      }
      setFilteredCards(filtered)
      setStats((prev) => ({ ...prev, filtered: filtered.length }))
   }, [searchTerm, sourceFilter, stateFilter, cards])

   return (
      <div>
         <div className={styles['title-panel']}>
            <div className={styles['title-hero']}>
               <div className={styles['title-dashboard']}>
                  <div className={styles['title-main-card']}>
                     <div className={styles['title-current-year']}>
                        Выбранный год:
                        <span>{currentYear}</span>
                     </div>
                     <h2>Формирование Дорожной карты</h2>
                     <p id="titleHeroText">
                        Сравнение текущих листов ДК с листами обновления. КБУ
                        собирается по наименованию улицы с суммированием площади
                        и стоимости, ТекРем — по ID ODX с суммированием
                        повторяющихся строк.
                     </p>
                     <div className={styles['title-year-switch']}>
                        {years.map((item) => (
                           <button
                              key={item}
                              className={
                                 currentYear === item
                                    ? `${styles['title-year-chip']} ${styles.active}`
                                    : styles['title-year-chip']
                              }
                              onClick={() => changeYear(item)}
                           >
                              {item}
                           </button>
                        ))}
                     </div>
                     <div className={styles['title-stat-row']}>
                        <div className={styles['title-stat-card']}>
                           <span>Всего карточек</span>
                           <b id="titleTotalCount">{stats.total}</b>
                        </div>
                        <div
                           className={`${styles['title-stat-card']} ${styles['warn']}`}
                        >
                           <span>Требуют актуализации</span>
                           <b id="titleActualizeCount">{stats.actualize}</b>
                        </div>
                        <div
                           className={`${styles['title-stat-card']} ${styles['danger']}`}
                        >
                           <span>Исключить объект</span>
                           <b id="titleExcludeCount">{stats.exclude}</b>
                        </div>
                        <div
                           className={`${styles['title-stat-card']} ${styles['good']}`}
                        >
                           <span>Создать новый объект</span>
                           <b id="titleCreateCount">{stats.create}</b>
                        </div>
                        <div
                           className={`${styles['title-stat-card']} ${styles['violet']}`}
                        >
                           <span>Карточка не создана</span>
                           <b id="titleUnableCount">{stats.unable}</b>
                        </div>
                        <div className={styles['title-stat-card']}>
                           <span>После фильтрации</span>
                           <b id="titleFilteredCount">{stats.filtered}</b>
                        </div>
                     </div>
                  </div>
                  <div className={styles['title-readiness-card']}>
                     <div className={styles['title-readiness-card-head']}>
                        <h3>Готовность карточек</h3>
                        <div
                           className={styles['title-readiness-donut']}
                           id="titleReadinessDonut"
                        >
                           <div className={styles['title-readiness-center']}>
                              <b id="titleReadyPercent">
                                 {stats.readyPercent}%
                              </b>
                              <span>готово</span>
                           </div>
                        </div>
                     </div>
                     <div className={styles['title-readiness-meta']}>
                        <div>
                           <span>Осталось обработать</span>
                           <span
                              className={styles['title-readiness-meta-span']}
                              id="titleNeedWorkCount"
                           >
                              {stats.needWork}
                           </span>
                        </div>
                        <div>
                           <span>Всего за год</span>
                           <span
                              className={styles['title-readiness-meta-span']}
                              id="titleReadinessTotal"
                           >
                              {stats.total}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className={styles['title-top-tools']}>
               <div className={['panel']}>
                  <div className={styles['title-filters']}>
                     <input
                        id="titleSearch"
                        placeholder="Поиск по улице, объекту или ID ODX"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles['title-search-input']}
                     />
                     <AppSelect
                        options={sourceOptions}
                        value={sourceOptions.find(
                           (o) => o.value === sourceFilter,
                        )}
                        onChange={(option) =>
                           setSourceFilter(option?.value || '')
                        }
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        placeholder="Источник: все"
                     />
                     <AppSelect
                        options={stateOptions}
                        value={stateOptions.find(
                           (o) => o.value === stateFilter,
                        )}
                        onChange={(option) =>
                           setStateFilter(option?.value || '')
                        }
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        placeholder="Состояние карточки: все"
                     />
                     <AppSelect
                        options={loadStatusOptions}
                        value={loadStatusOptions.find(
                           (o) => o.value === loadStatusFilter,
                        )}
                        onChange={(option) =>
                           setLoadStatusFilter(option?.value || '')
                        }
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        placeholder="Статус загрузки: все"
                     />
                     <button
                        className={['main-btn']}
                        type="button"
                        onClick={() => {
                           setSearchTerm('')
                           setSourceFilter('')
                           setStateFilter('')
                           setLoadStatusFilter('')
                        }}
                     >
                        ⎚ Сбросить
                     </button>
                  </div>
               </div>

               <div className={styles['title-justification-panel']}>
                  <div className={styles['title-justification-head']}>
                     <div>
                        <h3>Документ обоснования адресного перечня</h3>
                        <p>
                           PDF формируется по выбранному году из листа
                           обновления. Для КБУ группировка идет по уникальным
                           улицам, для ТекРем — по уникальным объектам.
                        </p>
                     </div>
                     <div className={styles['title-justification-actions']}>
                        <button
                           className={`${['main-btn']} ${styles['admin-action']}`}
                           type="button"
                           disabled
                           title="Доступно только администратору"
                        >
                           PDF обоснование КБУ
                        </button>
                        <button
                           className={`${['main-btn']} ${styles['admin-action']}`}
                           type="button"
                           disabled
                           title="Доступно только администратору"
                        >
                           PDF обоснование ТекРем
                        </button>
                     </div>
                  </div>
                  <div
                     id="titleJustificationStatus"
                     className={styles['title-justification-status']}
                  >
                     Выберите год выше и нажмите нужную программу для
                     формирования PDF.
                  </div>
               </div>
            </div>

            <div className={styles['title-workspace']}>
               <div
                  id="titleTemplatePanel"
                  className={styles['title-template-panel']}
               >
                  <div className={styles['title-template-head']}>
                     <div>
                        <h3>Шаблон заполнения</h3>
                        <p>
                           Статичные значения из листа «Титул_вспомогательное»
                           для выбранного года и программы. Используйте их при
                           заполнении карточек в АИС ЦД.
                        </p>
                     </div>
                  </div>
                  <div
                     id="titleTemplateRoot"
                     className={styles['title-template-grid']}
                  >
                     <div className={styles['title-template-empty']}>
                        Данные шаблона загрузятся вместе с карточками.
                     </div>
                  </div>
               </div>

               <div id="titleCardsRoot" className={styles['title-cards']}>
                  {loading ? (
                     Array.from({ length: 3 }).map((_, index) => (
                        <div
                           key={index}
                           className={`skeleton panel ${styles['title-card-skeleton']}`}
                        />
                     ))
                  ) : filteredCards.length === 0 ? (
                     <div
                        className={`${styles.empty} ${styles['title-empty']}`}
                     >
                        Нет данных для отображения
                     </div>
                  ) : (
                     filteredCards.map((card) => (
                        <div
                           key={card.id}
                           className={`${styles['title-card']} ${styles['panel']}`}
                        >
                           <div className={styles['title-card-header']}>
                              <h4>{card.name}</h4>
                              <span
                                 className={
                                    card.needAction
                                       ? styles['status-warn']
                                       : styles['status-ok']
                                 }
                              >
                                 {card.cardStateLabel}
                              </span>
                           </div>
                           <div className={styles['title-card-body']}>
                              <p>
                                 <strong>ODX:</strong> {card.odx}
                              </p>
                              <p>
                                 <strong>Статус:</strong> {card.status}
                              </p>
                              <p>
                                 <strong>Источник:</strong> {card.sourceLabel}
                              </p>
                              {card.area > 0 && (
                                 <p>
                                    <strong>Площадь:</strong> {card.area} м²
                                 </p>
                              )}
                              {card.cost > 0 && (
                                 <p>
                                    <strong>Стоимость:</strong>{' '}
                                    {card.cost.toLocaleString()} руб.
                                 </p>
                              )}
                              {card.startDate && (
                                 <p>
                                    <strong>Начало:</strong> {card.startDate}
                                 </p>
                              )}
                              {card.endDate && (
                                 <p>
                                    <strong>Окончание:</strong> {card.endDate}
                                 </p>
                              )}
                           </div>
                        </div>
                     ))
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default CardsTitlePage
