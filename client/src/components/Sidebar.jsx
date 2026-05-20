import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom'

import logo from '../assets/logo.png'

import {
  hasRole,
} from '../utils/permissions'

import {
  FaChevronLeft,
  FaSignOutAlt,
} from 'react-icons/fa'

import navigation from '../config/navigation'

import { useSidebar } from '../context/SidebarContext'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const {
    collapsed,
    setCollapsed,

    mobileOpen,
    setMobileOpen,
  } = useSidebar()

  const user = JSON.parse(
    localStorage.getItem('loanUser')
  )

  // MENUS
  const menus = navigation.filter(
    (item) =>
      item.roles.includes(
        user?.role
      )
  )

  const handleLogout = () => {
    localStorage.removeItem(
      'loanUser'
    )
    setTimeout(() => {
      window.location.href = '/'
    }, 1500)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() =>
            setMobileOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static z-50 top-0 left-0 h-screen bg-slate-900 text-white flex flex-col transition-all duration-300

        ${collapsed
            ? 'w-24'
            : 'w-72'
          }

        ${mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0'
          }
      `}
      >

        {/* Top */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">

          {!collapsed && (
            <div>

              {/* <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="grad"
                    x1="0"
                    y1="0"
                    x2="120"
                    y2="120"
                  >
                    <stop
                      offset="0%"
                      stop-color="#2563EB"
                    />
                    <stop
                      offset="100%"
                      stop-color="#06B6D4"
                    />
                  </linearGradient>
                </defs>

                <rect
                  width="120"
                  height="120"
                  rx="32"
                  fill="url(#grad)"
                />

                <path
                  d="M35 70L55 45L70 60L88 35"
                  stroke="white"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <circle
                  cx="88"
                  cy="35"
                  r="8"
                  fill="white"
                />
              </svg> */}

              <h1 className="text-2xl font-bold">
                Loan ERP
              </h1>

              <p className="text-slate-400 text-sm mt-1">
                Finance System
              </p>

            </div>
          )}

          {/* Collapse */}
          <button
            onClick={() =>
              setCollapsed(
                !collapsed
              )
            }
            className="bg-slate-800 hover:bg-slate-700 p-2 rounded-xl"
          >
            <FaChevronLeft
              className={`transition-transform ${collapsed
                ? 'rotate-180'
                : ''
                }`}
            />
          </button>

        </div>

        {/* Menus */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">

          {menus
            .filter((menu) =>
              menu.roles.includes(
                user?.role
              )
            )
            .map((menu) => {
              const Icon = menu.icon

              const isActive =
                location.pathname ===
                menu.path

              return (
                <Link
                  key={menu.path}
                  to={menu.path}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition ${isActive
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-slate-800 text-slate-300'
                    }`}
                >

                  <Icon
                    className="text-lg min-w-[20px]"
                  />

                  {!collapsed &&
                    menu.name}

                </Link>
              )
            })}

        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-800 space-y-3">

          {/* USER CARD */}
          <div className="bg-slate-800 rounded-2xl p-4 flex items-center gap-3">

            {/* AVATAR */}
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">

              {user?.name
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            {!collapsed && (
              <div>

                <h3 className="font-semibold">
                  {user?.name}
                </h3>

                <p className="text-sm text-slate-400">
                  {user?.role}
                </p>

              </div>
            )}

          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl px-4 py-3 flex items-center justify-center gap-3 transition font-semibold"
          >

            <FaSignOutAlt />

            {!collapsed && 'Logout'}

          </button>

        </div>

      </div>
    </>
  )
}