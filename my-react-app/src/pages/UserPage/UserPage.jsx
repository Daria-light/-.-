import React from 'react'
import './UserPage.css'

function UserPage() {
  return (
    <>
      <div className="users-panel">
        <div className="users-hero">
          <h2>Пользователи и роли</h2>
          <p>
            Управление индивидуальными учетными записями платформы. Сейчас
            доступны две роли:
            <b> Администратор </b>и<b> Просмотр</b>.
          </p>
        </div>

        <div className="users-grid">
          <div className="user-form">
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
              <select className="field-select">
                <option>Администратор</option>
                <option>Просмотр</option>
              </select>
            </label>

            <label>
              Статус
              <select className="field-select">
                <option>Активен</option>
                <option>Отключен</option>
              </select>
            </label>

            <button className="main-btn">Сохранить пользователя</button>

            <div className="acts-status">
              Данные пользователей загружаются только для администратора.
            </div>
          </div>

          <div className="users-list">
            <h3 style={{ margin: '0 0 12px' }}>Список пользователей</h3>

            <div className="users-table-wrap">
              <table className="users-table">
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
                      <span className="role-chip">Администратор</span>
                    </td>
                    <td>Активен</td>
                    <td>24.06.2026 09:42</td>
                    <td>
                      <button className="small-btn">Изменить</button>
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
