import React from 'react'
import styles from './Dashboard.module.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../shared/context/AuthContext'
import { useEffect, useState } from 'react'
import ProgressCard from '../../shared/ui/ProgressCard/ProgressCard'
import {
  tasksAPI,
  objectsAPI,
  hardWorksAPI,
  regularWorksAPI,
} from '../../shared/api'
import { API_CONFIG } from '../../shared/api/config'

function DashboardPage() {
  const { user } = useAuth()
  const isGuest = !user
  const isViewer = user?.role === 'viewer'
  const isAdmin = user?.role === 'admin'

  const [dashboardStats, setDashboardStats] = useState({
    geometry: 0,
    acts: 0,
    uploads: 0,
  })
  const [tasks, setTasks] = useState([])
  const [roadmapData, setRoadmapData] = useState({
    2026: { total: 0, needAction: 0, readyPercent: 0 },
    2027: { total: 0, needAction: 0, readyPercent: 0 },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    setLoading(true)
    setError(null)
    try {
      const [objectsRes, hardWorksRes, regularWorksRes, tasksRes] =
        await Promise.all([
          objectsAPI.find({}, ['id'], 1, 0, 'id', false),
          hardWorksAPI.find({}, ['id', 'status'], 1, 0, 'id', false),
          regularWorksAPI.find({}, ['id', 'status'], 1, 0, 'id', false),
          tasksAPI.findAssigned(),
        ])

      setDashboardStats({
        geometry: Math.floor(Math.random() * 101),
        acts: Math.floor(Math.random() * 101),
        uploads: Math.floor(Math.random() * 101),
      })

      const tasksData = tasksRes.data.items || []
      setTasks(
        tasksData.slice(0, 3).map((task) => ({
          id: task.id,
          name: task.name || 'Без названия',
          deadline: task.deadline
            ? new Date(task.deadline).toLocaleDateString()
            : 'Не указан',
          priority: task.type === 'urgent' ? 'high' : 'medium',
        })),
      )

      if (tasksData.length < 3) {
        const examples = [
          {
            id: 'demo1',
            name: 'Актуализировать статус объекта №142',
            deadline: 'Сегодня',
            priority: 'high',
          },
          {
            id: 'demo2',
            name: 'Загрузить акты по району САО',
            deadline: 'Завтра',
            priority: 'medium',
          },
          {
            id: 'demo3',
            name: 'Проверить карточки титула 2026',
            deadline: '15 июля',
            priority: 'low',
          },
        ]
        setTasks((prev) => {
          const combined = [...prev, ...examples]
          return combined.slice(0, 3)
        })
      }

      const [roadmap2026, roadmap2027] = await Promise.all([
        Promise.all([
          hardWorksAPI.find({ year: { is: 2026 } }, [
            'id',
            'status',
            'working_area',
          ]),
          regularWorksAPI.find({ year: { is: 2026 } }, [
            'id',
            'status',
            'working_area',
          ]),
          objectsAPI.find({}, ['id']),
        ]).then(([hardRes, regularRes, objectsRes]) => {
          const total =
            (hardRes.data.items?.length || 0) +
            (regularRes.data.items?.length || 0)
          const needAction = [
            ...(hardRes.data.items || []),
            ...(regularRes.data.items || []),
          ].filter(
            (w) => w.status === 'В работе' || w.status === 'Завершен',
          ).length
          const readyPercent =
            total > 0 ? Math.round(((total - needAction) / total) * 100) : 0
          return { total, needAction, readyPercent }
        }),

        Promise.all([
          hardWorksAPI.find({ year: { is: 2027 } }, [
            'id',
            'status',
            'working_area',
          ]),
          regularWorksAPI.find({ year: { is: 2027 } }, [
            'id',
            'status',
            'working_area',
          ]),
          objectsAPI.find({}, ['id']),
        ]).then(([hardRes, regularRes, objectsRes]) => {
          const total =
            (hardRes.data.items?.length || 0) +
            (regularRes.data.items?.length || 0)
          const needAction = [
            ...(hardRes.data.items || []),
            ...(regularRes.data.items || []),
          ].filter(
            (w) => w.status === 'В работе' || w.status === 'Завершен',
          ).length
          const readyPercent =
            total > 0 ? Math.round(((total - needAction) / total) * 100) : 0
          return { total, needAction, readyPercent }
        }),
      ])

      setRoadmapData({ 2026: roadmap2026, 2027: roadmap2027 })
    } catch (error) {
      console.error('Failed to load dashboard:', error)

      // 👇 ЕСЛИ МОКИ ВЫКЛЮЧЕНЫ - ПОКАЗЫВАЕМ 0 И ОШИБКУ
      if (!API_CONFIG.USE_MOCKS) {
        setError('Ошибка загрузки данных. Проверьте подключение к серверу.')
        setDashboardStats({ geometry: 0, acts: 0, uploads: 0 })
        setTasks([])
        setRoadmapData({
          2026: { total: 0, needAction: 0, readyPercent: 0 },
          2027: { total: 0, needAction: 0, readyPercent: 0 },
        })
      } else {
        // Fallback на мок-данные (когда моки включены)
        setDashboardStats({
          geometry: Math.floor(Math.random() * 101),
          acts: Math.floor(Math.random() * 101),
          uploads: Math.floor(Math.random() * 101),
        })
        setTasks([
          {
            id: 1,
            name: 'Актуализировать статус объекта №142',
            deadline: 'Сегодня',
            priority: 'high',
          },
          {
            id: 2,
            name: 'Загрузить акты по району САО',
            deadline: 'Завтра',
            priority: 'medium',
          },
          {
            id: 3,
            name: 'Проверить карточки титула 2026',
            deadline: '15 июля',
            priority: 'low',
          },
        ])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles['dashboard-page']}>
      {(isAdmin || isViewer) && (
        <section className={styles['home-hero']}>
          <div>
            <div className={styles['home-overline']}>
              Главная · Мониторинг состояния объектов УДС
            </div>

            <h2>Единая панель управления рабочими процессами</h2>

            <p className={styles['home-overline-p']}>
              Оперативная сводка по объектам УДС, статусам работ, загрузке
              актов, карточкам по титулу и текущим задачам. Все ключевые
              показатели и рабочие разделы собраны на одном экране в единой
              визуальной стилистике.
            </p>

            <div className={styles['home-hero-actions']}>
              <NavLink to="/pdf" className={['main-btn']}>
                Открыть мониторинг
              </NavLink>

              <NavLink to="/work-status" className={styles['home-ghost-btn']}>
                Перейти к статусам работ
              </NavLink>
            </div>
          </div>

          <div className={styles['home-hero-side']}>
            <div className={styles['home-date-chip']}>Сегодня</div>

            <div className={styles['home-side-panel']}>
              <span className={styles['home-side-panel-span']}>
                ОБЩИЙ КОНТЕКСТ
              </span>

              <b className={styles['home-side-panel-b']}>
                Мониторинг, акты, титул и задачи
              </b>

              <p className={styles['home-side-panel-p']}>
                Сводка формируется автоматически на основе данных платформы и
                помогает быстро перейти к нужному рабочему разделу.
              </p>

              <div className={styles['home-side-badges']}>
                <span className={styles['home-side-badge']}>АИС ЦД</span>
                <span className={styles['home-side-badge']}>СОК</span>
                <span className={styles['home-side-badge']}>2026-2027</span>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className={styles['home-metrix']}>
        <ProgressCard
          title="Геометрия объектов"
          value={dashboardStats.geometry}
          subtitle="Проверено объектов"
          className={styles['home-chart-card']}
        />

        <ProgressCard
          title="Акты"
          value={dashboardStats.acts}
          subtitle="Загружено актов"
          className={styles['home-chart-card']}
        />

        <ProgressCard
          title="Загрузка файлов"
          value={dashboardStats.uploads}
          subtitle="Файлы обработаны"
          className="home-chart-card"
        />
        {(isAdmin || isViewer) && (
          <div
            className={`${styles['home-card']} ${styles['home-important-card']}`}
          >
            <div className={styles['home-important-icon']}>▤</div>
            <span>Осталось актуализировать</span>
            <b id="homeWorkImportantCount">—</b>
            <p>
              Карточки, где статус объекта изменился на «В работе» или
              «Завершен». Эти карточки требуют первоочередного внимания.
            </p>
            <NavLink className={styles['small-btn']} to="/work-status">
              Открыть статусы
            </NavLink>
          </div>
        )}
        <div
          className={`${styles['home-card']} ${styles['home-title-chart']}`}
          id="homeTitleChart2026"
        >
          <div className={styles['label']}>Дорожная карта 2026</div>
          {roadmapData[2026]?.total > 0 ? (
            <div className={styles['roadmap-preview']}>
              <div className={styles['roadmap-stats']}>
                <div className={styles['roadmap-stat']}>
                  <span>
                    Всего: <b>{roadmapData[2026].total}</b>
                  </span>
                </div>
                <div className={styles['roadmap-stat']}>
                  <span>
                    Требуют:{' '}
                    <b className={styles.warn}>
                      {roadmapData[2026].needAction}
                    </b>
                  </span>
                </div>
                <div className={styles['roadmap-stat']}>
                  <span>
                    Готовность: <b>{roadmapData[2026].readyPercent}%</b>
                  </span>
                </div>
              </div>
              <div className={styles['progress-bar']}>
                <div
                  className={styles['progress-fill']}
                  style={{
                    width: `${roadmapData[2026].readyPercent}%`,
                  }}
                />
              </div>
              <NavLink to="/titles" className={styles['small-btn']}>
                Подробнее →
              </NavLink>
            </div>
          ) : error ? (
            <div className={styles['home-title-loading']}>{error}</div>
          ) : (
            <div className={`${styles['home-title-loading']} ${'skeleton'}`}>
              Загрузка...
            </div>
          )}
        </div>
        <div
          className={`${styles['home-card']} ${styles['home-title-chart']}`}
          id="homeTitleChart2027"
        >
          <div className={styles['label']}>Дорожная карта 2027</div>
          {roadmapData[2027]?.total > 0 ? (
            <div className={styles['roadmap-preview']}>
              <div className={styles['roadmap-stats']}>
                <div className={styles['roadmap-stat']}>
                  <span>
                    Всего: <b>{roadmapData[2027].total}</b>
                  </span>
                </div>
                <div className={styles['roadmap-stat']}>
                  <span>
                    Требуют:{' '}
                    <b className={styles.warn}>
                      {roadmapData[2027].needAction}
                    </b>
                  </span>
                </div>
                <div className={styles['roadmap-stat']}>
                  <span>
                    Готовность: <b>{roadmapData[2027].readyPercent}%</b>
                  </span>
                </div>
              </div>
              <div className={styles['progress-bar']}>
                <div
                  className={styles['progress-fill']}
                  style={{
                    width: `${roadmapData[2027].readyPercent}%`,
                  }}
                />
              </div>
              <NavLink to="/titles" className={styles['small-btn']}>
                Подробнее →
              </NavLink>
            </div>
          ) : error ? (
            <div className={styles['home-title-loading']}>{error}</div>
          ) : (
            <div className={`${styles['home-title-loading']} ${'skeleton'}`}>
              Загрузка...
            </div>
          )}
        </div>
      </section>

      {(isAdmin || isViewer) && (
        <section className={styles['home-layout']}>
          <div
            className={`${styles['home-card']} ${styles['home-modules-card']}`}
          >
            <div className={styles['home-card-head']}>
              <div>
                <h3>Рабочие разделы</h3>

                <p className={styles['home-card-sub']}>
                  Быстрые переходы к основным модулям платформы для ежедневной
                  работы сотрудников.
                </p>
              </div>
            </div>

            <div className={styles['home-module-grid']}>
              <NavLink to="/pdf" className={styles['home-module']}>
                <div className={styles['home-module-icon']}>⌂</div>

                <h4>Мониторинг объектов</h4>

                <p>Статусы геометрии, актов и карточек.</p>
                <div className={styles['home-module-meta']}>
                  <span className={`${styles['home-module-badge']}`}>
                    0 объектов
                  </span>
                  <span
                    className={`${styles['home-module-badge']} ${styles['danger']}`}
                  >
                    0 проблем
                  </span>
                </div>
              </NavLink>

              <NavLink to="/acts" className={styles['home-module']}>
                <div className={styles['home-module-icon']}>□</div>

                <h4>Работа с актами</h4>

                <p>
                  Формирование актов, экспорт PDF и связывание файлов с
                  объектами.
                </p>
                <div className={styles['home-module-meta']}>
                  <span
                    className={`${styles['home-module-badge']} ${styles['danger']}`}
                  >
                    PDF / Drive
                  </span>
                  <span className={styles['home-module-badge']}>акты</span>
                </div>
              </NavLink>

              <NavLink to="/work-status" className={styles['home-module']}>
                <div className={styles['home-module-icon']}>▤</div>

                <h4>Статусы работ</h4>

                <p>
                  Актуализация КБУ и ТекРем, сроки СМР, ресурсы и
                  финансирование.
                </p>
                <div className={styles['home-module-meta']}>
                  <span
                    className={`${styles['home-module-badge']} ${styles['warn']}`}
                  >
                    актуализация
                  </span>
                  <span
                    className={`${styles['home-module-badge']} ${styles['danger']}`}
                  >
                    Подготовительные / В работе / Завершен
                  </span>
                </div>
              </NavLink>

              <NavLink to="/cards-title/2026" className={styles['home-module']}>
                <div className={styles['home-module-icon']}>▥</div>

                <h4>Карточки по титулу</h4>

                <p>
                  Создание и актуализация карточек, шаблоны заполнения и
                  обоснования.
                </p>
                <div className={styles['home-module-meta']}>
                  <span className={styles['home-module-badge']}>2026 год</span>
                  <span
                    className={`${styles['home-module-badge']} ${styles['warn']}`}
                  >
                    титул
                  </span>
                </div>
              </NavLink>
              <NavLink to="/tasks" className={styles['home-module']}>
                <div className={styles['home-module-icon']}>☑</div>

                <h4>Задачи</h4>

                <p>
                  Контроль поручений, дедлайнов и ответственных сотрудников.
                </p>
                <div className={styles['home-module-meta']}>
                  <span className={styles['home-module-badge']}>
                    {tasks.length} текущих
                  </span>
                </div>
              </NavLink>
              <NavLink to="/users" className={styles['home-module']}>
                <div className={styles['home-module-icon']}>👤</div>

                <h4>Пользователи</h4>

                <p>Роли, доступы, должности и отделы сотрудников платформы.</p>
                <div className={styles['home-module-meta']}>
                  <span
                    className={`${styles['home-module-badge']} ${styles['warn']}`}
                  >
                    Администрирование
                  </span>
                </div>
              </NavLink>
            </div>
          </div>

          {(isAdmin || isViewer) && (
            <div
              className={`${styles['home-card']} ${styles['home-tasks-card']}`}
            >
              <div className={styles['home-card-head']}>
                <div>
                  <h3>Текущие задачи</h3>

                  <p className={styles['home-card-sub']}>
                    Список активных задач и ближайших дедлайнов в компактном
                    формате.
                  </p>
                </div>
                <NavLink className={styles['small-btn']} to="/tasks">
                  Открыть все
                </NavLink>
              </div>

              <div className={styles.homeTaskList}>
                {loading ? (
                  <div className="skeleton">Загрузка задач...</div>
                ) : tasks.length === 0 ? (
                  <div className={styles.label}>
                    {error ? 'Нет задач' : 'Нет активных задач'}
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div key={task.id} className={styles.homeTaskItem}>
                      <div className={styles.homeTaskHeader}>
                        <span
                          className={`${styles.priority} ${styles[task.priority]}`}
                        />

                        <span className={styles.homeTaskDeadline}>
                          {task.deadline}
                        </span>
                      </div>

                      <div className={styles.homeTaskTitle}>{task.name}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default DashboardPage
