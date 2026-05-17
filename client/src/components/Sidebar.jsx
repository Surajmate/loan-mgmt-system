import { Link, useLocation } from 'react-router-dom'

import navigation from '../config/navigation'

export default function Sidebar() {
  const location = useLocation()

  const user = JSON.parse(
    localStorage.getItem('loanUser')
  )

  // FILTER MENUS
  const menus = navigation.filter(
    (item) =>
      item.roles.includes(
        user?.role
      )
  )

  return (
    <div className="bg-slate-900 text-white w-72 min-h-screen p-6 flex flex-col">

      {/* Logo */}
      <div className="mb-10">

        <h1 className="text-3xl font-bold">
          Loan ERP
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          Finance Management System
        </p>

      </div>

      {/* Navigation */}
      <div className="space-y-2 flex-1">

        {menus.map((menu) => {
          const Icon = menu.icon

          const isActive =
            location.pathname ===
            menu.path

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >

              <Icon />

              {menu.name}

            </Link>
          )
        })}

      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 pt-5 mt-6">

        <div className="bg-slate-800 rounded-2xl p-4">

          <h3 className="font-semibold">
            {user?.name}
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            {user?.role}
          </p>

        </div>

      </div>

    </div>
  )
}