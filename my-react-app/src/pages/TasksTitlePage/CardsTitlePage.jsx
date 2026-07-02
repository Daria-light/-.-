import React from 'react'
import styles from './CardsTitlePage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'

const years = [2026, 2027, 2028, 2029]

const sourceOptions = [
  { value: '', label: 'Источник: все' },
  { value: 'KBU', label: 'КБУ 2029 СМР' },
  { value: 'TR', label: 'ТекРем 2029' },
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
  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState([])

  const { year } = useParams()
  const changeYear = (year) => {
    navigate(`/cards-title/${year}`)
  }

  const [sourceFilter, setSourceFilter] = useState('')
  const [stateFilter, setStateFilter] = useState('')
  const [loadStatusFilter, setLoadStatusFilter] = useState('')

  // useEffect(() => {
  //   // Имитация загрузки данных
  //   const fetchData = async () => {
  //     try {
  //       setTimeout(() => {
  //         setTasks([
  //           { id: 1, title: 'Задача 1', status: 'active' },
  //           { id: 2, title: 'Задача 2', status: 'done' },
  //         ])
  //         setLoading(false)
  //       }, 2000)
  //     } catch (error) {
  //       console.error('Ошибка загрузки:', error)
  //       setLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [])

  return (
    <div>
      <div className={styles['title-panel']}>
        <div className={styles['title-hero']}>
          <div className={styles['title-dashboard']}>
            <div className={styles['title-main-card']}>
              <div className={styles['title-current-year']}>
                Выбранный год:
                <span>{year}</span>
              </div>
              <h2>Формирование Дорожной карты</h2>
              <p id="titleHeroText">
                Сравнение текущих листов ДК с листами обновления. КБУ собирается
                по наименованию улицы с суммированием площади и стоимости,
                ТекРем — по ID ODX с суммированием повторяющихся строк.
              </p>
              <div className={styles['title-year-switch']}>
                {years.map((item) => (
                  <button
                    key={item}
                    className={
                      Number(year) === item
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
                  <b id="titleTotalCount">0</b>
                </div>
                <div
                  className={`${styles['title-stat-card']} ${styles['warn']}`}
                >
                  <span>Требуют актуализации</span>
                  <b id="titleActualizeCount">0</b>
                </div>
                <div
                  className={`${styles['title-stat-card']} ${styles['danger']}`}
                >
                  <span>Исключить объект</span>
                  <b id="titleExcludeCount">0</b>
                </div>
                <div
                  className={`${styles['title-stat-card']} ${styles['good']}`}
                >
                  <span>Создать новый объект</span>
                  <b id="titleCreateCount">0</b>
                </div>
                <div
                  className={`${styles['title-stat-card']} ${styles['violet']}`}
                >
                  <span>Карточка не создана</span>
                  <b id="titleUnableCount">0</b>
                </div>
                <div className={styles['title-stat-card']}>
                  <span>После фильтрации</span>
                  <b id="titleFilteredCount">0</b>
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
                    <b id="titleReadyPercent">0%</b>
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
                    0
                  </span>
                </div>
                <div>
                  <span>Всего за год</span>
                  <span
                    className={styles['title-readiness-meta-span']}
                    id="titleReadinessTotal"
                  >
                    0
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
                onInput={() =>
                  window.applyTitleCardFilters && window.applyTitleCardFilters()
                }
                className={styles['title-search-input']}
              />

              <AppSelect
                value={sourceOptions.find((o) => o.value === sourceFilter)}
                onChange={(option) => setSourceFilter(option?.value ?? '')}
                options={sourceOptions}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                placeholder="Источник: все"
              ></AppSelect>
              <AppSelect
                options={stateOptions}
                value={stateOptions.find((o) => o.value === sourceFilter)}
                onChange={(option) => setSourceFilter(option?.value ?? '')}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                placeholder="Состояние карточки: все"
              ></AppSelect>
              <AppSelect
                options={loadStatusOptions}
                value={loadStatusOptions.find((o) => o.value === sourceFilter)}
                onChange={(option) => setSourceFilter(option?.value ?? '')}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                placeholder="Статус загрузки: все"
              ></AppSelect>

              <button
                className={['main-btn']}
                type="button"
                onClick={() =>
                  window.resetTitleCardFilters && window.resetTitleCardFilters()
                }
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
                  PDF формируется по выбранному году из листа обновления. Для
                  КБУ группировка идет по уникальным улицам, для ТекРем — по
                  уникальным объектам.
                </p>
              </div>
              <div className={styles['title-justification-actions']}>
                <button
                  className={`${['main-btn']} ${styles['admin-action']}`}
                  type="button"
                  onClick={() =>
                    window.createTitleJustificationPdf &&
                    window.createTitleJustificationPdf('KBU')
                  }
                  disabled
                  title="Доступно только администратору"
                >
                  PDF обоснование КБУ
                </button>
                <button
                  className={`${['main-btn']} ${styles['admin-action']}`}
                  type="button"
                  onClick={() =>
                    window.createTitleJustificationPdf &&
                    window.createTitleJustificationPdf('TR')
                  }
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
              Выберите год выше и нажмите нужную программу для формирования PDF.
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
                  Статичные значения из листа «Титул_вспомогательное» для
                  выбранного года и программы. Используйте их при заполнении
                  карточек в АИС ЦД.
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
              <>
                {Array.from({ length: 1 }).map((_, index) => (
                  <div
                    key={index}
                    className={`skeleton panel ${styles['title-card-skeleton']}`}
                  />
                ))}
              </>
            ) : cards.length === 0 ? (
              <div className={`${styles.empty} ${styles['title-empty']}`}>
                Нет данных
              </div>
            ) : (
              cards.map((card) => <TitleCard key={card.id} card={card} />)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardsTitlePage
