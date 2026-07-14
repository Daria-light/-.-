const users = [
  {
    login: 'admin',
    password: 'admin',
    user: {
      id: 1,
      fullName: 'Администратор',
      email: 'admin@mail.ru',
      role: 'admin',
    },
  },
  {
    login: 'viewer',
    password: 'viewer',
    user: {
      id: 2,
      fullName: 'Пользователь',
      email: 'viewer@mail.ru',
      role: 'viewer',
    },
  },
]

export async function login(login, password) {
  // имитация задержки сервера
  await new Promise((resolve) => setTimeout(resolve, 500))

  const account = users.find(
    (u) => u.login === login && u.password === password,
  )

  if (!account) {
    throw new Error('Неверный логин или пароль')
  }

  return account.user
}
