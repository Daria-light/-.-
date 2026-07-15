import React from 'react'
import styles from './UserPage.module.css'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../shared/context/AuthContext'
import { usersAPI } from '../../shared/api'

const role = [
   { value: 'admin', label: 'Администратор' },
   { value: 'viewer', label: 'Просмотр' },
]
const state = [
   { value: 'Активен', label: 'Активен' },
   { value: 'Отключен', label: 'Отключен' },
]

function UserPage() {
   const { user, login: authLogin } = useAuth()
   const isAdmin = user?.role === 'admin'
   const isViewer = user?.role === 'viewer'
   const [loginValue, setLoginValue] = useState('')
   const [loginError, setLoginError] = useState('')
   const [passwordValue, setPasswordValue] = useState('')
   const [users, setUsers] = useState([])
   const [loading, setLoading] = useState(false)
   const isLoggingIn = useRef(false)

   // Форма для добавления пользователя
   const [formData, setFormData] = useState({
      email: '',
      fullName: '',
      position: '',
      department: '',
      role: 'viewer',
      status: 'Активен',
   })

   const loadUsers = async () => {
      if (!isAdmin) return
      setLoading(true)
      try {
         const response = await usersAPI.find(
            {},
            [
               'id',
               'email',
               'last_name',
               'first_name',
               'patronomyc',
               'position',
               'departament',
               'role',
            ],
            100,
            0,
            'last_name',
            false,
         )
         setUsers(response.data.items || [])
      } catch (error) {
         console.error('Failed to load users:', error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      if (isAdmin) {
         loadUsers()
      }
   }, [isAdmin])

   const handleLogin = async (e) => {
      e.preventDefault()

      // Защита от повторных вызовов
      if (isLoggingIn.current) {
         console.log('🟡 Login already in progress, skipping...')
         return
      }

      if (!loginValue || !passwordValue) {
         setLoginError('Введите логин и пароль')
         return
      }

      isLoggingIn.current = true

      try {
         setLoginError('')
         console.log('🔵 HANDLE LOGIN CALLED:', loginValue, passwordValue)

         // Используем ТОЛЬКО authLogin из контекста
         await authLogin(loginValue, passwordValue)

         console.log('🔵 HANDLE LOGIN SUCCESS')
      } catch (err) {
         console.error('🔴 HANDLE LOGIN ERROR:', err)
         setLoginError(err.detail || err.message || 'Неверный логин или пароль')
      } finally {
         isLoggingIn.current = false
      }
   }

   const handleSaveUser = async () => {
      if (!isAdmin) return
      try {
         const userData = {
            email: formData.email,
            last_name: formData.fullName.split(' ')[0] || '',
            first_name: formData.fullName.split(' ')[1] || '',
            patronomyc: formData.fullName.split(' ')[2] || null,
            position: formData.position,
            departament: formData.department,
            role: formData.role,
         }
         await usersAPI.add(userData)
         await loadUsers()
         setFormData({
            email: '',
            fullName: '',
            position: '',
            department: '',
            role: 'viewer',
            status: 'Активен',
         })
         alert('Пользователь успешно добавлен')
      } catch (error) {
         alert('Ошибка при сохранении: ' + (error.detail || error.message))
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
                  <button
                     type="submit"
                     className="main-btn"
                     disabled={isLoggingIn.current}
                  >
                     {isLoggingIn.current ? 'Вход...' : 'Log on'}
                  </button>
               </form>
            </div>
         </>
      )
   }

   return (
      <>
         {isAdmin && (
            <div className={styles['users-panel']}>
               <div className={styles['users-hero']}>
                  <h2>Пользователи и роли</h2>
                  <p>
                     Управление индивидуальными учетными записями платформы.
                     Сейчас доступны две роли:
                     <b> Администратор </b>и<b> Просмотр</b>.
                  </p>
               </div>

               <div className={styles['users-grid']}>
                  <div className={styles['user-form']}>
                     <h3 style={{ margin: 0 }}>
                        Добавить / обновить пользователя
                     </h3>

                     <label>
                        Email
                        <input
                           placeholder="user@example.com"
                           value={formData.email}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 email: e.target.value,
                              })
                           }
                        />
                     </label>

                     <label>
                        ФИО
                        <input
                           placeholder="Фамилия Имя Отчество"
                           value={formData.fullName}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 fullName: e.target.value,
                              })
                           }
                        />
                     </label>

                     <label>
                        Должность
                        <input
                           placeholder="Должность пользователя"
                           value={formData.position}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 position: e.target.value,
                              })
                           }
                        />
                     </label>

                     <label>
                        Отдел
                        <input
                           placeholder="Отдел пользователя"
                           value={formData.department}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 department: e.target.value,
                              })
                           }
                        />
                     </label>

                     <label>
                        Роль
                        <AppSelect
                           options={role}
                           value={role.find((o) => o.value === formData.role)}
                           onChange={(option) =>
                              setFormData({
                                 ...formData,
                                 role: option?.value || 'viewer',
                              })
                           }
                           placeholder="Выберите роль"
                        />
                     </label>

                     <label>
                        Статус
                        <AppSelect
                           options={state}
                           value={state.find(
                              (o) => o.value === formData.status,
                           )}
                           onChange={(option) =>
                              setFormData({
                                 ...formData,
                                 status: option?.value || 'Активен',
                              })
                           }
                           placeholder="Выберите статус"
                        />
                     </label>

                     <button className="main-btn" onClick={handleSaveUser}>
                        Сохранить пользователя
                     </button>

                     <div className={styles['acts-status']}>
                        Данные пользователей загружаются только для
                        администратора.
                     </div>
                  </div>

                  <div className={styles['users-list']}>
                     <h3 style={{ margin: '0 0 12px' }}>
                        Список пользователей
                     </h3>

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
                              {loading ? (
                                 <tr>
                                    <td colSpan="8">Загрузка...</td>
                                 </tr>
                              ) : users.length === 0 ? (
                                 <tr>
                                    <td colSpan="8">Нет пользователей</td>
                                 </tr>
                              ) : (
                                 users.map((u) => (
                                    <tr key={u.id}>
                                       <td>{u.email}</td>
                                       <td>
                                          {[
                                             u.last_name,
                                             u.first_name,
                                             u.patronomyc,
                                          ]
                                             .filter(Boolean)
                                             .join(' ')}
                                       </td>
                                       <td>{u.position || '-'}</td>
                                       <td>{u.departament || '-'}</td>
                                       <td>
                                          <span className={styles['role-chip']}>
                                             {u.role === 'admin'
                                                ? 'Администратор'
                                                : 'Просмотр'}
                                          </span>
                                       </td>
                                       <td>Активен</td>
                                       <td>-</td>
                                       <td>
                                          <button className="small-btn">
                                             Изменить
                                          </button>
                                       </td>
                                    </tr>
                                 ))
                              )}
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
                        Управление индивидуальными учетными записями платформы.
                        Сейчас доступны две роли:
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

export default UserPage
