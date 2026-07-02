import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

const years = [2026, 2027, 2028, 2029]

export default function Sidebar() {
  return (
    <aside className={styles['sidebar']}>
      <div className={styles['sidebarTitle']}>
        <h2 className={styles['brand-mark']}>▮</h2>
        <h2 className={styles['sidebarTitleH2']}>
          Мониторинг состояния объектов УДС
        </h2>
      </div>
      <nav className={styles['sidebarItems']}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles['sidebarItem']} ${styles['active']}`
              : styles['sidebarItem']
          }
          to="/"
        >
          ◆ Главная
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles['sidebarItem']} ${styles['active']}`
              : styles['sidebarItem']
          }
          to="/pdf"
        >
          ⌂ Мониторинг объектов
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles['sidebarItem']} ${styles['active']}`
              : styles['sidebarItem']
          }
          to="/acts"
        >
          □ Работа с актами
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles['sidebarItem']} ${styles['active']}`
              : styles['sidebarItem']
          }
          to="/work-status"
        >
          ▤ Статусы работ
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles['sidebarItem']} ${styles['active']}`
              : styles['sidebarItem']
          }
          to="/titles"
        >
          ◫ Формирование ДК
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles['sidebarItem']} ${styles['active']}`
              : styles['sidebarItem']
          }
          to="/tasks"
        >
          ☑ Задачи
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles['sidebarItem']} ${styles['active']}`
              : styles['sidebarItem']
          }
          to="/cards-title"
        >
          ▥ Карточки по титулу
        </NavLink>
        <div className="sidebar-years">
          {years.map((year) => (
            <NavLink
              key={year}
              to={`/cards-title/${year}`}
              className={({ isActive }) =>
                isActive
                  ? `${styles['sidebarItem']} ${styles['active']}`
                  : styles['sidebarItem']
              }
            >
              {year}
            </NavLink>
          ))}
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles['sidebarItem']} ${styles['active']}`
              : styles['sidebarItem']
          }
          to="/users"
        >
          👤 Пользователи
        </NavLink>
      </nav>
    </aside>
  )
}
