import './App.css'
import ActPage from './pages/ActsPage/ActPage'
import PdfPage from './pages/PdfPage/PdfPage'
import UserPage from './pages/UserPage/UserPage'
import TasksPage from './pages/TasksPage/TasksPage'
import TitlesPage from './pages/TitlesPage/TitlesPage'
import DashboardPage from './pages/DashboardPage/DashdoardPage'
import WorkStatusPage from './pages/WorkStatusPage/WorkStatusPage'
import LayoutPage from './pages/LayoutPage/LayoutPage.jsx'

import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/work-status" element={<WorkStatusPage />} />
          <Route path="/titles" element={<TitlesPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/acts" element={<ActPage />} />
          <Route path="/pdf" element={<PdfPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
