import React from 'react'
import styles from './ActPage.module.css'
import { useState, useEffect } from 'react'

function ActPage() {
  const [search, setSearch] = useState('')
  const [filteredObjects, setFilteredObjects] = useState([])
  const [selectedObjects, setSelectedObjects] = useState([])

  const [objects, setObjects] = useState([])
  const [loading, setLoading] = useState(true)

  const toggleObject = (id) => {
    setSelectedObjects((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }
  const selectAll = () => {
    setSelectedObjects(filteredObjects.map((item) => item.id))
  }

  const clearSelection = () => {
    setSelectedObjects([])
  }

  const loadObjects = async () => {
    setLoading(true)

    /*
    Backend

    POST /api/v1/objects/find

    body:
    {
      columns: [],
      filter: {},
      limit: 100,
      offset: 0,
      sorting_by: "name",
      descending_order: false
    }

    const response = await findObjects(...)

    setObjects(response.data.items)
  */

    setTimeout(() => {
      setObjects([
        {
          id: 1,
          name: 'Ленинский проспект',
          district: 'ЮЗАО',
          acts: 12,
        },
        {
          id: 2,
          name: 'Проспект Вернадского',
          district: 'ЗАО',
          acts: 7,
        },
        {
          id: 3,
          name: 'Кутузовский проспект',
          district: 'ЗАО',
          acts: 21,
        },
      ])

      setLoading(false)
    }, 500)
  }
  useEffect(() => {
    loadObjects()
  }, [])
  useEffect(() => {
    /*
POST /api/v1/objects/find

{
    columns: [],
    filter: {
        "$name": {
            "like": `%${search}%`
        }
    },
    limit:100,
    offset:0
}

const response = await findObjects(...)

setFilteredObjects(response.data.items)
*/

    /*
POST

/api/v1/file-list/add

или

/api/v1/meta-list/add

или другой endpoint формирования акта

body

{
    object_ids: selectedObjects
}
*/
    if (!search.trim()) {
      setFilteredObjects(objects)
      return
    }

    setFilteredObjects(
      objects.filter((object) =>
        object.name.toLowerCase().includes(search.toLowerCase()),
      ),
    )
  }, [search, objects])
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
            <input
              placeholder="Поиск объектов для формирования актов"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className={styles['act-selected-panel']}>
              <span>Выбрано объектов: {selectedObjects.length}</span>

              <div className={styles['act-mini-actions']}>
                <button className={['small-btn']} onClick={selectAll}>
                  Выбрать найденные
                </button>

                <button className={['small-btn']} onClick={clearSelection}>
                  Снять выбор
                </button>
              </div>
            </div>

            <div className={styles['act-list']}>
              {loading ? (
                <div className={`${styles.label} skeleton`}>
                  Загрузка объектов...
                </div>
              ) : (
                objects.map((object) => (
                  <div
                    key={object.id}
                    onClick={() => toggleObject(object.id)}
                    className={`${styles.objectCard}
        ${selectedObjects.includes(object.id) ? styles.selected : ''}`}
                  ></div>
                ))
              )}
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
