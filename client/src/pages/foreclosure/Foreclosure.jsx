import {
  FaBalanceScale,
  FaMoneyBillWave,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSearch,
} from 'react-icons/fa'

import {
  successAlert,
  errorAlert,
  warningAlert,
  closeAlert
} from '../../utils/alerts'

import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import { getLoans } from '../../services/loanService'

import {
  calculateForeclosure,
  closeForeclosure,
} from '../../services/foreclosureService'

export default function Foreclosure() {
  const [loans, setLoans] =
    useState([])

  const [search, setSearch] =
    useState('')

  const [selectedLoan, setSelectedLoan] =
    useState('')

  const [details, setDetails] =
    useState(null)

  // ANALYTICS
  const totalActiveLoans =
    loans.length

  const totalOutstanding =
    loans.reduce(
      (sum, loan) =>
        sum +
        Number(
          loan.outstandingAmount ||
          0
        ),
      0
    )

  const totalLoanAmount =
    loans.reduce(
      (sum, loan) =>
        sum +
        Number(
          loan.loanAmount || 0
        ),
      0
    )

  const foreclosureEligible =
    loans.filter(
      (loan) =>
        loan.outstandingAmount > 0
    ).length

  // FILTER
  const filteredLoans =
    loans.filter((loan) =>
      loan.customer?.fullName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )

  // FETCH LOANS
  const fetchLoans = async () => {
    try {
      const data = await getLoans()

      // ONLY ACTIVE LOANS
      const activeLoans =
        data.filter(
          (loan) =>
            loan.status ===
            'ACTIVE'
        )

      setLoans(activeLoans)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLoans()
  }, [])

  // CALCULATE FORECLOSURE
  const handleCalculate =
    async (loanId) => {
      try {
        const data =
          await calculateForeclosure(
            loanId
          )

        setDetails(data)
      } catch (error) {
        console.log(error)
      }
    }

  // FORECLOSE LOAN
  const handleForeclose =
    async () => {
      try {
        await closeForeclosure(
          selectedLoan
        )

        successAlert(
          'Success',
          'Loan foreclosed successfully'
        )

        setDetails(null)

        setSelectedLoan('')

        fetchLoans()
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <DashboardLayout>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* TOTAL ACTIVE */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-blue-100">
                Active Loans
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {totalActiveLoans}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaBalanceScale className="text-3xl" />

            </div>

          </div>

        </div>

        {/* ELIGIBLE */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-emerald-100">
                Eligible
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {
                  foreclosureEligible
                }
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaCheckCircle className="text-3xl" />

            </div>

          </div>

        </div>

        {/* TOTAL LOAN */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-orange-100">
                Portfolio Value
              </p>

              <h2 className="text-3xl font-bold mt-3">
                Rs.
                {
                  totalLoanAmount
                }
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaExclamationTriangle className="text-3xl" />

            </div>

          </div>

        </div>

        {/* OUTSTANDING */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-purple-100">
                Outstanding
              </p>

              <h2 className="text-3xl font-bold mt-3">
                Rs.
                {
                  totalOutstanding
                }
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaMoneyBillWave className="text-3xl" />

            </div>

          </div>

        </div>

      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition p-8 max-w-5xl">

        {/* SELECT LOAN */}
        <div className="mb-8">

          <label className="block mb-2 font-medium text-slate-700">
            Select Loan
          </label>

          <select
            value={selectedLoan}
            onChange={(e) => {
              setSelectedLoan(
                e.target.value
              )

              handleCalculate(
                e.target.value
              )
            }}
            className="w-full border border-slate-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">
              Select Active Loan
            </option>

            {filteredLoans.map(
              (loan) => (
                <option
                  key={loan._id}
                  value={loan._id}
                >
                  {
                    loan.customer
                      ?.fullName
                  }
                  {' - '}
                  Rs.
                  {
                    loan.loanAmount
                  }
                </option>
              )
            )}

          </select>

        </div>

        {/* FORECLOSURE DETAILS */}
        {details && (
          <div className="bg-slate-100 rounded-3xl p-8 space-y-6">

            {/* HEADER */}
            <div className="flex items-center gap-4">

              <div className="bg-red-600 text-white p-4 rounded-2xl">

                <FaBalanceScale className="text-3xl" />

              </div>

              <div>

                <h2 className="text-3xl font-bold text-slate-800">
                  Foreclosure Summary
                </h2>

                <p className="text-slate-500">
                  Loan settlement and
                  closure preview
                </p>

              </div>

            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* CUSTOMER */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">

                <p className="text-slate-500 text-sm">
                  Customer
                </p>

                <h3 className="text-xl font-bold text-slate-800 mt-2">

                  {
                    details.customer
                  }

                </h3>

              </div>

              {/* LOAN */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">

                <p className="text-slate-500 text-sm">
                  Loan Amount
                </p>

                <h3 className="text-xl font-bold text-slate-800 mt-2">

                  Rs.
                  {
                    details.loanAmount
                  }

                </h3>

              </div>

              {/* OUTSTANDING */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">

                <p className="text-slate-500 text-sm">
                  Outstanding
                </p>

                <h3 className="text-xl font-bold text-orange-600 mt-2">

                  Rs.
                  {
                    details.outstanding
                  }

                </h3>

              </div>

              {/* CHARGE */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">

                <p className="text-slate-500 text-sm">
                  Foreclosure Charge
                </p>

                <h3 className="text-xl font-bold text-red-600 mt-2">

                  Rs.
                  {
                    details.foreclosureCharge
                  }

                </h3>

              </div>

            </div>

            {/* FINAL */}
            <div className="bg-red-600 text-white rounded-3xl p-8 text-center">

              <p className="text-red-100 text-lg">
                Final Settlement Amount
              </p>

              <h2 className="text-5xl font-bold mt-3">

                Rs.
                {
                  details.foreclosureAmount
                }

              </h2>

            </div>

            {/* ACTION */}
            <button
              onClick={
                handleForeclose
              }
              className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-bold text-lg shadow-lg transition"
            >
              Confirm Foreclosure
            </button>

          </div>
        )}

      </div>

    </DashboardLayout>
  )
}