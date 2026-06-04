import { Footer } from '@shared/components/Footer'
import { Header } from '@shared/components/Header'
import { Outlet } from 'react-router'

const AppLayout: React.FC = () => {
  return (
    <div className="font-primary container mx-auto max-w-7xl">
      <Header />
      <main className="min-h-screen p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
