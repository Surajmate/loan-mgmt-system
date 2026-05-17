export default function Navbar() {
  const user = JSON.parse(
    localStorage.getItem('loanUser')
  )

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">

      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Welcome back, {user?.username}
        </p>

      </div>

      {/* User Avatar */}
      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

        {user?.username?.charAt(0).toUpperCase()}

      </div>

    </div>
  )
}