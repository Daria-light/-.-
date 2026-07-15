import React from 'react'
import styles from './Topbar.module.css'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Topbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/users')
  }

  return (
    <div className={styles['topbarWrapper']}>
      <div className={styles['topbarTitle']}>
        <h1 className={styles['topbarTitleHeader']}>
          Обработка и ввод данных в информационные системы
        </h1>
        <p className={styles['topbarTitleParagraph']}>
          Единая платформа для мониторинга объектов УДС, актуализации статусов,
          работы с актами и внесения данных в АИС
        </p>
      </div>
      <div className={styles['topbarFunction']}>
        <input
          className={`${styles['top-search']}`}
          placeholder="Поиск объекта по наименованию"
          type="text"
        />
        <button className={styles['icon-btn']}>◌</button>
        <button className={styles['icon-btn']}>↻</button>
        {user && (
          <button className="main-btn" onClick={handleLogout}>
            Выйти
          </button>
        )}
      </div>
    </div>
  )
}

export default Topbar
