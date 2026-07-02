import React from 'react'
import styles from './UserPage.module.css'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'

const role = [
  { value: '', label: 'Администратор' },
  { value: 'VW', label: 'Просмотр' },
]
const state = [
  { value: '', label: 'Активен' },
  { value: 'Off', label: 'Отключен' },
]

function UserPage() {
  return (
    <>
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
                    <td colSpan="8">Откройте вкладку для загрузки данных.</td>
                  </tr>

                  {/* Пример строки пользователя */}

                  <tr>
                    <td>user@example.com</td>
                    <td>Иванов Иван Иванович</td>
                    <td>Инженер</td>
                    <td>Производственный отдел</td>
                    <td>
                      <span className={styles['role-chip']}>Администратор</span>
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
    </>
  )
}

export default UserPage
