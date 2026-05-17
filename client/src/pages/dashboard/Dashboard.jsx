import {
  useEffect,
  useState,
} from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import { getDashboardStats } from '../../services/analyticsService'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts'

export default function Dashboard() {
  const [stats, setStats] = useState({
    customers: [],
    loans: [],
    repayments: [],
  })

  // FETCH STATS
  const fetchStats = async () => {
    try {
      const data =
        await getDashboardStats()

      setStats(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  // KPIs
  const totalCustomers =
    stats.customers.length

  const totalLoans =
    stats.loans.length

  // ACTIVE / CLOSED
  const activeLoans =
    stats.loans.filter(
      (loan) =>
        loan.status === 'ACTIVE'
    ).length

  const closedLoans =
    stats.loans.filter(
      (loan) =>
        loan.status === 'CLOSED'
    ).length

  // FORECLOSED
  const foreclosedLoans =
    stats.loans.filter(
      (loan) => loan.isForeclosed
    ).length

  const overdueLoans =
    stats.loans.filter(
      (loan) => loan.isOverdue
    ).length

  const totalPenaltyRevenue =
    stats.loans.reduce(
      (sum, loan) =>
        sum +
        Number(
          loan.penaltyAmount || 0
        ),
      0
    )

  // TOTAL DISBURSED
  const totalDisbursed =
    stats.loans.reduce(
      (sum, loan) =>
        sum +
        Number(
          loan.disbursedAmount || 0
        ),
      0
    )

  // TOTAL PAYABLE
  const totalPayable =
    stats.loans.reduce(
      (sum, loan) =>
        sum +
        Number(
          loan.totalPayable || 0
        ),
      0
    )

  // TOTAL COLLECTIONS
  const totalCollections =
    stats.repayments.reduce(
      (sum, repayment) =>
        sum +
        Number(
          repayment.amountPaid || 0
        ) +
        Number(
          repayment.penaltyAmount || 0
        ),
      0
    )

  // TOTAL OUTSTANDING
  const totalOutstanding =
    stats.loans.reduce(
      (sum, loan) =>
        sum +
        Number(
          loan.outstandingAmount || 0
        ),
      0
    )

  // TOTAL INTEREST PROFIT
  const totalInterestProfit =
    stats.loans.reduce(
      (sum, loan) =>
        sum +
        (Number(
          loan.totalPayable || 0
        ) -
          Number(
            loan.loanAmount || 0
          )),
      0
    )

  // PROCESSING FEES
  const totalProcessingFees =
    stats.loans.reduce(
      (sum, loan) =>
        sum +
        Number(
          loan.processingFee || 0
        ),
      0
    )

  // INSURANCE EARNINGS
  const totalInsurance =
    stats.loans.reduce(
      (sum, loan) =>
        sum +
        Number(
          loan.insuranceAmount || 0
        ),
      0
    )

  // TOTAL PROFIT
  const totalProfit =
    totalInterestProfit +
    totalProcessingFees +
    totalInsurance +
    totalPenaltyRevenue

  // LOSS ESTIMATION
  const estimatedLoss =
    totalOutstanding * 0.05

  // RECOVERY %
  const recoveryRate =
    totalPayable > 0
      ? (
        (totalCollections /
          totalPayable) *
        100
      ).toFixed(2)
      : 0

  // PIE DATA
  const pieData = [
    {
      name: 'Active',
      value: activeLoans,
    },

    {
      name: 'Closed',
      value: closedLoans,
    },

    {
      name: 'Foreclosed',
      value: foreclosedLoans,
    },
  ]

  // BAR DATA
  const barData = [
    {
      name: 'Disbursed',
      amount: totalDisbursed,
    },

    {
      name: 'Collections',
      amount: totalCollections,
    },

    {
      name: 'Outstanding',
      amount: totalOutstanding,
    },

    {
      name: 'Profit',
      amount: totalProfit,
    },
  ]

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-8">

        {/* <h1 className="text-3xl font-bold text-black-800">
          Dashboard
        </h1> */}

        <p className="text-slate-500 mt-2">
          Loan management analytics overview
        </p>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

        {/* Customers */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Total Customers
          </p>

          <h2 className="text-4xl font-bold mt-3 text-black-800">
            {totalCustomers}
          </h2>

        </div>

        {/* Loans */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Total Loans
          </p>

          <h2 className="text-4xl font-bold mt-3 text-black-800">
            {totalLoans}
          </h2>

        </div>

        {/* Active */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Active Loans
          </p>

          <h2 className="text-4xl font-bold mt-3 text-green-600">
            {activeLoans}
          </h2>

        </div>

        {/* Closed */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Closed Loans
          </p>

          <h2 className="text-4xl font-bold mt-3 text-blue-600">
            {closedLoans}
          </h2>

        </div>

        {/* Disbursed */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Total Disbursed
          </p>

          <h2 className="text-3xl font-bold mt-3 text-black-800">
            ₹{totalDisbursed}
          </h2>

        </div>

        {/* Collections */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Total Collections
          </p>

          <h2 className="text-3xl font-bold mt-3 text-black-800">
            ₹{totalCollections}
          </h2>

        </div>

        {/* Foreclosed */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Foreclosed Loans
          </p>

          <h2 className="text-4xl font-bold mt-3 text-red-600">
            {foreclosedLoans}
          </h2>

        </div>

        {/* Outstanding */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Total Outstanding
          </p>

          <h2 className="text-3xl font-bold mt-3 text-orange-600">
            ₹{totalOutstanding}
          </h2>

        </div>

        {/* Profit */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Total Profit
          </p>

          <h2 className="text-3xl font-bold mt-3 text-green-600">
            ₹{totalProfit}
          </h2>

        </div>

        {/* Earnings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Insurance Earnings
          </p>

          <h2 className="text-3xl font-bold mt-3 text-purple-600">
            ₹{totalInsurance}
          </h2>

        </div>

        {/* Loss */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Estimated Loss
          </p>

          <h2 className="text-3xl font-bold mt-3 text-red-600">
            ₹{estimatedLoss.toFixed(0)}
          </h2>

        </div>

        {/* Recovery Rate */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Recovery Rate
          </p>

          <h2 className="text-3xl font-bold mt-3 text-red-600">
            {recoveryRate}%
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Overdue Loans
          </p>

          <h2 className="text-4xl font-bold mt-3 text-red-600">
            {overdueLoans}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-slate-500">
            Penalty Revenue
          </p>

          <h2 className="text-3xl font-bold mt-3 text-red-500">
            ₹{totalPenaltyRevenue}
          </h2>

        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h2 className="text-2xl font-bold text-black-800 mb-6">
            Loan Status
          </h2>

          <div className="h-80">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  <Cell fill="#16a34a" />

                  <Cell fill="#2563eb" />

                  <Cell fill="#dc2626" />

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h2 className="text-2xl font-bold text-black-800 mb-6">
            Financial Summary
          </h2>

          <div className="h-80">

            <ResponsiveContainer>

              <BarChart data={barData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="amount"
                  fill="#2563eb"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm mt-8">

  <h2 className="text-2xl font-bold text-black-800 mb-6">
    Overdue Loans
  </h2>

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="bg-slate-100">

        <tr>

          <th className="text-left p-4">
            Customer
          </th>

          <th className="text-left p-4">
            Outstanding
          </th>

          <th className="text-left p-4">
            Overdue Days
          </th>

          <th className="text-left p-4">
            Penalty
          </th>

        </tr>

      </thead>

      <tbody>

        {stats.loans
          .filter(
            (loan) => loan.isOverdue
          )
          .map((loan) => (
            <tr
              key={loan._id}
              className="border-t border-slate-100"
            >

              <td className="p-4 font-semibold">
                {
                  loan.customer
                    ?.fullName
                }
              </td>

              <td className="p-4">
                ₹
                {
                  loan.outstandingAmount
                }
              </td>

              <td className="p-4 text-red-600 font-semibold">
                {loan.overdueDays}
              </td>

              <td className="p-4 text-red-600 font-semibold">
                ₹
                {
                  loan.penaltyAmount
                }
              </td>

            </tr>
          ))}

      </tbody>

    </table>

  </div>

</div>

    </DashboardLayout>
  )
}