import './Mainlayout.css'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-section">
        <Topbar />

        <main className="content">{children}</main>
      </div>
    </div>
  )
}
