import MainLayout from '../../shared/ui/Layot/MainLayout'
import { Outlet } from 'react-router-dom'
import './LayoutPage.css'

export default function LayoutPage() {
  return (
    <MainLayout>
      <Outlet className="mainContent" />
    </MainLayout>
  )
}
