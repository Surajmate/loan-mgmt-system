import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="flex bg-slate-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Navbar />

        {/* Content */}
        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  )
}