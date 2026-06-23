import './App.css'
import ActPage from './pages/ActsPage/ActPage'
import PdfPage from './pages/PdfPage/PdfPage'
import UserPage from './pages/UserPage/UserPage'
import TasksPage from './pages/TasksPage/TasksPage'
import TitlesPage from './pages/TitlesPage/TitlesPage'
import DashBoardPage from './pages/DashboardPage/DashdoardPage'
import WorkStatusPage from './pages/WorkStatusPage/WorkStatusPage'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/work-status" element={<WorkStatusPage />} />
        <Route path="/titles" element={<TitlesPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/acts" element={<ActsPage />} />
        <Route path="/pdf" element={<PdfPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
