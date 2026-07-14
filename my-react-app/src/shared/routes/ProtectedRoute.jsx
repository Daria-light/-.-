import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, roles = [] }) {
  const { user } = useAuth()

  // если маршрут доступен всем
  if (roles.length === 0) {
    return children
  }

  // пользователь не авторизован
  if (!user) {
    return <Navigate to="/users" replace />
  }

  // роль не подходит
  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
