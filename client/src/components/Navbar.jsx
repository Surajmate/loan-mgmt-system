import { useLocation } from 'react-router-dom'

import navigation from '../config/navigation'

export default function Header() {
  const location = useLocation()

  const user = JSON.parse(
    localStorage.getItem('loanUser')
  )

  // CURRENT PAGE
  const currentPage =
    navigation.find(
      (item) =>
        item.path ===
        location.pathname
    )

  return (
    <div className="bg-white px-8 py-5 border-b border-slate-200 flex items-center justify-between">

      {/* Left */}
      <div>

        <h1 className="text-2xl font-bold text-slate-800">

          {currentPage?.name ||
            'Dashboard'}

        </h1>

        <p className="text-slate-500 text-sm mt-1">
          Welcome back,
          {' '}
          {user?.name}
        </p>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Role */}
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

          {user?.role}

        </div>

        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">

          {user?.name
            ?.charAt(0)
            ?.toUpperCase()}

        </div>

      </div>

    </div>
  )
}