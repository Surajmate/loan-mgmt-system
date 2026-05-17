import DashboardLayout from '../../layouts/DashboardLayout'

export default function Dashboard() {
  return (
    <DashboardLayout>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <p className="text-slate-500">
            Total Customers
          </p>

          <h2 className="text-3xl font-bold mt-3 text-slate-800">
            1,245
          </h2>

        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <p className="text-slate-500">
            Active Loans
          </p>

          <h2 className="text-3xl font-bold mt-3 text-slate-800">
            856
          </h2>

        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <p className="text-slate-500">
            Collections
          </p>

          <h2 className="text-3xl font-bold mt-3 text-slate-800">
            ₹12.5L
          </h2>

        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <p className="text-slate-500">
            Overdue Loans
          </p>

          <h2 className="text-3xl font-bold mt-3 text-red-500">
            42
          </h2>

        </div>

      </div>

    </DashboardLayout>
  )
}