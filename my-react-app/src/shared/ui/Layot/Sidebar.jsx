import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const years = [2026, 2027, 2028, 2029]

const guestMenu = [
  { icon: '◆', title: 'Главная', path: '/' },
  { icon: '👤', title: 'Вход', path: '/users' },
]

const adminMenu = [
  { icon: '◆', title: 'Главная', path: '/' },
  { icon: '⌂', title: 'Мониторинг объектов', path: '/pdf' },
  { icon: '□', title: 'Работа с актами', path: '/acts' },
  { icon: '▤', title: 'Статусы работ', path: '/work-status' },
  { icon: '◫', title: 'Формирование ДК', path: '/titles' },
  { icon: '☑', title: 'Задачи', path: '/tasks' },
  {
    icon: '▥',
    title: 'Карточки по титулу',
    path: '/cards-title',
    children: years.map((year) => ({
      title: String(year),
      path: `/cards-title/${year}`,
    })),
  },
  { icon: '👤', title: 'Пользователи', path: '/users' },
]

const viewerMenu = [
  { icon: '◆', title: 'Главная', path: '/' },
  { icon: '⌂', title: 'Мониторинг объектов', path: '/pdf' },

  { icon: '□', title: 'Работа с актами', path: '/acts' },
  { icon: '▤', title: 'Статусы работ', path: '/work-status' },
  { icon: '◫', title: 'Формирование ДК', path: '/titles' },
  { icon: '☑', title: 'Задачи', path: '/tasks' },
  {
    icon: '▥',
    title: 'Карточки по титулу',
    path: '/cards-title',
    children: years.map((year) => ({
      title: String(year),
      path: `/cards-title/${year}`,
    })),
  },
  { icon: '👤', title: 'Мой профиль', path: '/users' },
]

export default function Sidebar() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  let menu = guestMenu

  if (user?.role === 'admin') {
    menu = adminMenu
  } else if (user?.role === 'viewer') {
    menu = viewerMenu
  }

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={styles.sidebarTitle}>
        <h2 className={styles['brand-mark']}>▮</h2>

        <h2 className={styles.sidebarTitleH2}>
          Мониторинг состояния объектов УДС
        </h2>
      </div>

      <nav className={styles.sidebarItems}>
        {menu.map((item) => (
          <div key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `${styles.sidebarItem} ${styles.active}`
                  : styles.sidebarItem
              }
            >
              <span style={{ marginRight: '8px' }}>{item.icon}</span>
              {item.title}
            </NavLink>

            {item.children && (
              <div className={styles.sidebarYears}>
                {item.children.map((child) => (
                  <NavLink
                    key={child.path}
                    to={child.path}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.sidebarItem} ${styles.active}`
                        : styles.sidebarItem
                    }
                  >
                    {child.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
