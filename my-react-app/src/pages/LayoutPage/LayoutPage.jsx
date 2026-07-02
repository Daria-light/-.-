import MainLayout from '../../shared/ui/Layot/MainLayout'
import { Outlet } from 'react-router-dom'
import './LayoutPage.module.css'

export default function LayoutPage() {
  return (
    <MainLayout>
      <Outlet className={'styles.mainContent'} />
    </MainLayout>
  )
}
