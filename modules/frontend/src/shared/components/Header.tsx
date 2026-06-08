import { Link, NavLink } from 'react-router'

export const Header: React.FC = () => {
  return (
    <div className="bg-primary w-full shadow-sm max-lg:collapse">
      <div className="navbar justify-between px-4">
        <h2 className="text-xl font-extrabold">
          <NavLink to={'/'}>Another eShop Project</NavLink>
        </h2>
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
      </div>
    </div>
  )
}
