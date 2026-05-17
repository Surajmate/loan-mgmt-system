import {
  FaHome,
  FaUsers,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaSignOutAlt,
  FaLayerGroup
} from 'react-icons/fa'

import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

export default function Sidebar() {

  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem('loanUser')

    navigate('/')
  }

  return (
    <div className="h-screen w-72 bg-slate-900 text-white p-6 hidden lg:flex flex-col">

      {/* Logo */}
      <div className="mb-10">

        <h1 className="text-2xl font-bold">
          Loan System
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Internal Finance Portal
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-3 flex-1">

       <Link
            to="/dashboard"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600"
            >
            <FaHome />
            Dashboard
        </Link>

        <Link
            to="/customers"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition"
            >
            <FaUsers />
            Customers
        </Link>

        <Link
            to="/groups"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition"
            >
            <FaLayerGroup />
            Groups
        </Link>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition">

          <FaMoneyBillWave />

          Loans

        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition">

          <FaFileInvoiceDollar />

          Repayments

        </button>

      </div>

      {/* Logout */}
      <button
        onClick={logoutHandler}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition"
        >
        <FaSignOutAlt />

        Logout

      </button>

    </div>
  )
}