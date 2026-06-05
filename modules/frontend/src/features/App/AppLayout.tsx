import { Footer } from '@shared/components/Footer'
import { Header } from '@shared/components/Header'
import { Outlet } from 'react-router'

const AppLayout: React.FC = () => {
  return (
    <div className="font-primary container mx-auto max-w-7xl">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AppLayout
