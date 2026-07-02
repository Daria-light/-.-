import styles from './MainLayout.module.css'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function MainLayout({ children }) {
  return (
    <div className={styles['app-layout']}>
      <Sidebar />

      <div className={styles['main-section']}>
        <Topbar></Topbar>
        <main className={styles['content']}>{children}</main>
      </div>
    </div>
  )
}
