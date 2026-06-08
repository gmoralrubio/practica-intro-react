import { Footer } from '@shared/components/Footer'
import { Header } from '@shared/components/Header'
import { Outlet } from 'react-router'

const AppLayout: React.FC = () => {
  return (
    <div className="font-primary container mx-auto flex min-h-screen max-w-7xl flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
