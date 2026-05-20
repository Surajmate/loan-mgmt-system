import Sidebar from '../components/Sidebar'

import Navbar from '../components/Navbar'

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="flex h-screen bg-slate-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SECTION */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">

          {children}

        </div>

      </div>

    </div>
  )
}