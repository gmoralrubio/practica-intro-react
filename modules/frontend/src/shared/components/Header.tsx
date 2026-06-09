import { useAuth } from '@features/Auth/context/AuthContext'
import { Link, NavLink, useNavigate } from 'react-router'

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="bg-primary w-full shadow-sm max-lg:collapse">
      <div className="navbar justify-between px-4">
        <h2 className="text-xl font-extrabold">
          <NavLink to={'/'}>Another eShop Project</NavLink>
        </h2>
        {!isAuthenticated ? (
          <div className="space-x-4">
            <Link
              to={'auth/login'}
              className="btn btn-secondary"
            >
              Login
            </Link>
            <Link
              to={'auth/register'}
              className="btn btn-neutral"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm">Bienvenido {user?.username}</span>
            <div className="space-x-4">
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
