import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebarTitle">
        <svg
          className="sidebarTitleIcon"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.0"
          id="Layer_1"
          width="14"
          height="14"
          viewBox="0 0 64 64"
          enable-background="new 0 0 64 64"
          xml:space="preserve"
        >
          <g>
            <path
              fill="#ffffff"
              d="M60,52H4c-2.211,0-4,1.789-4,4s1.789,4,4,4h56c2.211,0,4-1.789,4-4S62.211,52,60,52z"
            />
            <path
              fill="#ffffff"
              d="M60,8c0-2.211-1.789-4-4-4H8C5.789,4,4,5.789,4,8v40h56V8z"
            />
          </g>
        </svg>
        <h2 className="sidebarTitleH2">Мониторинг состояния объектов УДС</h2>
      </div>
      <nav className="sidebarItems">
        <NavLink
          className="sidebarItem"
          className={({ isActive }) =>
            isActive ? 'sidebarItem active' : 'sidebarItem'
          }
          to="/"
        >
          Главная
        </NavLink>

        <NavLink
          className="sidebarItem"
          className={({ isActive }) =>
            isActive ? 'sidebarItem active' : 'sidebarItem'
          }
          to="/acts"
        >
          Работа с актами
        </NavLink>

        <NavLink
          className="sidebarItem"
          className={({ isActive }) =>
            isActive ? 'sidebarItem active' : 'sidebarItem'
          }
          to="/work-status"
        >
          Статус работ
        </NavLink>

        <NavLink
          className="sidebarItem"
          className={({ isActive }) =>
            isActive ? 'sidebarItem active' : 'sidebarItem'
          }
          to="/titles"
        >
          Формирование ДК
        </NavLink>

        <NavLink
          className="sidebarItem"
          className={({ isActive }) =>
            isActive ? 'sidebarItem active' : 'sidebarItem'
          }
          to="/tasks"
        >
          Задачи
        </NavLink>

        <NavLink
          className="sidebarItem"
          className={({ isActive }) =>
            isActive ? 'sidebarItem active' : 'sidebarItem'
          }
          to="/pdf"
        >
          PDF
        </NavLink>

        <NavLink
          className="sidebarItem"
          className={({ isActive }) =>
            isActive ? 'sidebarItem active' : 'sidebarItem'
          }
          to="/users"
        >
          Пользователи
        </NavLink>
      </nav>
    </aside>
  )
}
