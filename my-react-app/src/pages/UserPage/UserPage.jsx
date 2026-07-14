import React from 'react'
import styles from './UserPage.module.css'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'
import { useState } from 'react'
import { login } from '../../shared/api/auth'
import { useAuth } from '../../shared/context/AuthContext'

const role = [
  { value: '', label: 'Администратор' },
  { value: 'VW', label: 'Просмотр' },
]
const state = [
  { value: '', label: 'Активен' },
  { value: 'Off', label: 'Отключен' },
]

function UserPage() {
  const { user, login: authLogin } = useAuth()
  const isAdmin = user?.role === 'admin'
  const isViewer = user?.role === 'viewer'
  const [loginValue, setLoginValue] = useState('')
  const [loginError, setLoginError] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoginError('')

      const currentUser = await login(loginValue, passwordValue)

      authLogin(currentUser)
    } catch (err) {
      setLoginError(err.message)
    }
  }
  if (!user) {
    return (
      <>
        <div className={styles['login-wrapper']}>
          <div className="login-title">
            <h2>Авторизация</h2>
            <p>Для полного доступа необходимо авторизироваться</p>
          </div>
          <form className={styles['login-panel']} onSubmit={handleLogin}>
            {loginError && (
              <div className={styles.loginError}>{loginError}</div>
            )}
            <input
              type="text"
              value={loginValue}
              onChange={(e) => {
                setLoginValue(e.target.value)
                setLoginError('')
              }}
              className={loginError ? styles.errorInput : ''}
              placeholder="Логин..."
            />
            <input
              type="password"
              value={passwordValue}
              onChange={(e) => {
                setPasswordValue(e.target.value)
                setLoginError('')
              }}
              className={loginError ? styles.errorInput : ''}
              placeholder="Пароль.."
            />
            <button type="submit" className="main-btn">
              Log on
            </button>
          </form>
        </div>
      </>
    )
  } else {
    return (
      <>
        {isAdmin && (
          <div className={styles['users-panel']}>
            <div className={styles['users-hero']}>
              <h2>Пользователи и роли</h2>
              <p>
                Управление индивидуальными учетными записями платформы. Сейчас
                доступны две роли:
                <b> Администратор </b>и<b> Просмотр</b>.
              </p>
            </div>

            <div className={styles['users-grid']}>
              <div className={styles['user-form']}>
                <h3 style={{ margin: 0 }}>Добавить / обновить пользователя</h3>

                <label>
                  Email
                  <input placeholder="user@example.com" />
                </label>

                <label>
                  ФИО
                  <input placeholder="Фамилия Имя Отчество" />
                </label>

                <label>
                  Должность
                  <input placeholder="Должность пользователя" />
                </label>

                <label>
                  Отдел
                  <input placeholder="Отдел пользователя" />
                </label>

                <label>
                  Роль
                  <AppSelect options={role} placeholder=""></AppSelect>
                </label>

                <label>
                  Статус
                  <AppSelect options={state} placeholder=""></AppSelect>
                </label>

                <button className={['main-btn']}>Сохранить пользователя</button>

                <div className={styles['acts-status']}>
                  Данные пользователей загружаются только для администратора.
                </div>
              </div>

              <div className={styles['users-list']}>
                <h3 style={{ margin: '0 0 12px' }}>Список пользователей</h3>

                <div className={styles['users-table-wrap']}>
                  <table className={styles['users-table']}>
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>ФИО</th>
                        <th>Должность</th>
                        <th>Отдел</th>
                        <th>Роль</th>
                        <th>Статус</th>
                        <th>Последний вход</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td colSpan="8">
                          Откройте вкладку для загрузки данных.
                        </td>
                      </tr>

                      {/* Пример строки пользователя */}

                      <tr>
                        <td>user@example.com</td>
                        <td>Иванов Иван Иванович</td>
                        <td>Инженер</td>
                        <td>Производственный отдел</td>
                        <td>
                          <span className={styles['role-chip']}>
                            Администратор
                          </span>
                        </td>
                        <td>Активен</td>
                        <td>24.06.2026 09:42</td>
                        <td>
                          <button className={['small-btn']}>Изменить</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {isViewer && (
          <div className={styles['users-wrapper']}>
            <div className={styles['users-panel']}>
              <div className={styles['users-hero']}>
                <h2>Пользователи и роли</h2>
                <p>
                  Управление индивидуальными учетными записями платформы. Сейчас
                  доступны две роли:
                  <b> Администратор </b>и<b> Просмотр</b>.
                </p>
              </div>
            </div>
            <div className="panel">
              <h2>Ваш логин:</h2>
              <p>{user?.email}</p>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default UserPage
