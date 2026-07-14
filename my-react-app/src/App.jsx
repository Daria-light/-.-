import ActPage from './pages/ActsPage/ActPage'
import PdfPage from './pages/PdfPage/PdfPage'
import UserPage from './pages/UserPage/UserPage'
import TasksPage from './pages/TasksPage/TasksPage'
import TitlesPage from './pages/TitlesPage/TitlesPage'
import DashboardPage from './pages/DashboardPage/DashdoardPage'
import WorkStatusPage from './pages/WorkStatusPage/WorkStatusPage'
import LayoutPage from './pages/LayoutPage/LayoutPage.jsx'
import CardsTitlePage from './pages/TasksTitlePage/CardsTitlePage.jsx'
import AuthProvider from './shared/context/AuthContext'
import ProtectedRoute from './shared/routes/ProtectedRoute.jsx'

import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<LayoutPage />}>
            <Route path="/" element={<DashboardPage />} />
            <Route
              path="/work-status"
              element={
                <ProtectedRoute roles={['admin', 'viewer']}>
                  <WorkStatusPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/titles"
              element={
                <ProtectedRoute roles={['admin', 'viewer']}>
                  <TitlesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute roles={['admin', 'viewer']}>
                  <TasksPage />
                </ProtectedRoute>
              }
            />
            <Route path="/users" element={<UserPage />} />
            <Route
              path="/acts"
              element={
                <ProtectedRoute roles={['admin', 'viewer']}>
                  <ActPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pdf"
              element={
                <ProtectedRoute roles={['admin', 'viewer']}>
                  <PdfPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cards-title"
              element={
                <ProtectedRoute roles={['admin', 'viewer']}>
                  <CardsTitlePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cards-title/:year"
              element={
                <ProtectedRoute roles={['admin', 'viewer']}>
                  <CardsTitlePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
