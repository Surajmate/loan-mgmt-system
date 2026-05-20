import {
  useEffect,
  useState,
} from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import { getDashboardStats } from '../../services/analyticsService'

import {
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaExclamationTriangle,
  FaFileInvoiceDollar,
  FaBalanceScale,
  FaSyncAlt
} from 'react-icons/fa'

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
  CartesianGrid,
} from 'recharts'
import {
  getAnalytics,
} from '../../services/dashboardService'

import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    customers: [],
    loans: [],
    repayments: [],
  })

  const [loading, setLoading] =
    useState(false)

  const [analytics,
    setAnalytics] =
    useState(null)

  useEffect(() => {

    const fetchAnalytics =
      async () => {

        try {

          const data =
            await getAnalytics()

          setAnalytics(data)

        } catch (error) {

          console.log(error)
        }
      }

    fetchAnalytics()

  }, [])

  // FETCH STATS
  const fetchStats = async () => {
    try {
      setLoading(true)

      const data =
        await getDashboardStats()

      setStats(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    if (!localStorage.getItem('loanUser')) {
      console.log('No user found, redirecting to login')
      navigate('/login')
    }
    setTimeout(() => {
      fetchStats()
    }, 1500)

    // // AUTO REFRESH
    // const interval =
    //   setInterval(() => {
    //     fetchStats()
    //   }, 15000)

    // return () =>
    //   clearInterval(interval)
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
      {/* <div className="mb-5">

        <h1 className="text-3xl font-bold text-black-800">
          Dashboard
        </h1>

        <button
          onClick={fetchStats}
          className="bg-white hover:bg-slate-100 border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm transition"
        >

          <FaSyncAlt
            className={`${loading
                ? 'animate-spin'
                : ''
              }`}
          />

          Refresh

        </button>

        <p className="text-slate-500 mt-2">
          Loan management analytics overview
        </p>

      </div> */}

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-5">

        {/* CUSTOMERS */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg hover:scale-[1.02] transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-blue-100">
                Customers
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {totalCustomers}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaUsers className="text-3xl" />

            </div>

          </div>

        </div>

        {/* DISBURSED */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-lg hover:scale-[1.02] transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-emerald-100">
                Disbursed
              </p>

              <h2 className="text-3xl font-bold mt-3">
                Rs.{totalDisbursed}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaMoneyBillWave className="text-3xl" />

            </div>

          </div>

        </div>

        {/* COLLECTIONS */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg hover:scale-[1.02] transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-purple-100">
                Collections
              </p>

              <h2 className="text-3xl font-bold mt-3">
                Rs.{totalCollections}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaFileInvoiceDollar className="text-3xl" />

            </div>

          </div>

        </div>

        {/* OVERDUE */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-6 text-white shadow-lg hover:scale-[1.02] transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-red-100">
                Overdue Loans
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {overdueLoans}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaExclamationTriangle className="text-3xl" />

            </div>

          </div>

        </div>

      </div>

      {/* FINANCIAL OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-5">

        {/* PROFIT */}
        <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-slate-500">
                Total Profit
              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-2">
                Rs.{totalProfit}
              </h2>

            </div>

            <div className="bg-green-100 text-green-600 p-4 rounded-2xl">

              <FaChartLine className="text-3xl" />

            </div>

          </div>

          <div className="flex items-center justify-between text-sm">

            <span className="text-slate-500">
              Recovery Rate
            </span>

            <span className="font-bold text-emerald-600">
              {recoveryRate}%
            </span>

          </div>

        </div>

        {/* OUTSTANDING */}
        <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-slate-500">
                Outstanding
              </p>

              <h2 className="text-4xl font-bold text-orange-600 mt-2">
                Rs.{totalOutstanding}
              </h2>

            </div>

            <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl">

              <FaBalanceScale className="text-3xl" />

            </div>

          </div>

          <div className="flex items-center justify-between text-sm">

            <span className="text-slate-500">
              Estimated Loss
            </span>

            <span className="font-bold text-red-600">
              Rs.{estimatedLoss.toFixed(0)}
            </span>

          </div>

        </div>

        {/* ACTIVE LOANS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

          <div className="flex items-center justify-between mb-5">

            <div>

              <p className="text-slate-500">
                Active Loans
              </p>

              <h2 className="text-4xl font-bold text-blue-600 mt-2">
                {activeLoans}
              </h2>

            </div>

            <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">

              <FaMoneyBillWave className="text-3xl" />

            </div>

          </div>

          <div className="flex items-center justify-between text-sm">

            <span className="text-slate-500">
              Foreclosed
            </span>

            <span className="font-bold text-red-600">
              {foreclosedLoans}
            </span>

          </div>

        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

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
        <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

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

      {/* <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm mt-8">

          <h2 className="text-2xl font-bold mb-8">

            Monthly Collections

          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={
                analytics?.monthlyCollections?.map(
                  (item) => ({
                    month:
                      item._id.month,

                    total:
                      item.total,
                  })
                )
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="total"
                fill="#2563eb"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm mt-8">

          <h2 className="text-2xl font-bold mb-8">

            Loan Distribution

          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={
                  analytics?.loanStatus
                }
                dataKey="count"
                nameKey="_id"
                outerRadius={120}
                label
              >

                {analytics?.loanStatus?.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={index}
                      fill={
                        [
                          '#2563eb',
                          '#16a34a',
                          '#dc2626',
                          '#f59e0b',
                        ][index % 4]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>
      </div> */}

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mt-5 hover:shadow-lg transition">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-slate-800">
            Quick Actions
          </h2>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition">

            + Add Loan

          </button>

          <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-semibold transition">

            + Add Collection

          </button>

          <button className="bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-semibold transition">

            + Add Customer

          </button>

          <button className="bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-semibold transition">

            Export Report

          </button>

        </div>

      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm mt-5 hover:shadow-lg transition">

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
                      Rs.
                      {
                        loan.outstandingAmount
                      }
                    </td>

                    <td className="p-4 text-red-600 font-semibold">
                      {loan.overdueDays}
                    </td>

                    <td className="p-4 text-red-600 font-semibold">
                      Rs.
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