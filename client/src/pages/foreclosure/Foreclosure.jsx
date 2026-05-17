import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import { getLoans } from '../../services/loanService'

import {
  calculateForeclosure,
  closeForeclosure,
} from '../../services/foreclosureService'

export default function Foreclosure() {
  const [loans, setLoans] = useState([])

  const [selectedLoan, setSelectedLoan] =
    useState('')

  const [details, setDetails] =
    useState(null)

  // FETCH LOANS
  const fetchLoans = async () => {
    try {
      const data = await getLoans()

      // Only active loans
      const activeLoans = data.filter(
        (loan) =>
          loan.status === 'ACTIVE'
      )

      setLoans(activeLoans)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLoans()
  }, [])

  // CALCULATE
  const handleCalculate = async (
    loanId
  ) => {
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

  // CLOSE LOAN
  const handleForeclose =
    async () => {
      try {
        await closeForeclosure(
          selectedLoan
        )

        alert(
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

      {/* Header */}
      <div className="mb-8">

        {/* <h1 className="text-3xl font-bold text-slate-800">
          Foreclosure
        </h1> */}

        <p className="text-slate-500 mt-2">
          Close loans before tenure completion
        </p>

      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-sm p-8 max-w-3xl">

        {/* Select Loan */}
        <div className="mb-6">

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
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          >

            <option value="">
              Select Active Loan
            </option>

            {loans.map((loan) => (
              <option
                key={loan._id}
                value={loan._id}
              >
                {
                  loan.customer
                    ?.fullName
                }
                {' - '}
                ₹{loan.loanAmount}
              </option>
            ))}

          </select>

        </div>

        {/* Details */}
        {details && (
          <div className="bg-slate-100 rounded-2xl p-6 space-y-4">

            <h2 className="text-2xl font-bold text-slate-800">
              Foreclosure Summary
            </h2>

            <div className="space-y-2 text-slate-700">

              <p>
                Customer:
                {' '}
                {details.customer}
              </p>

              <p>
                Loan Amount:
                ₹{details.loanAmount}
              </p>

              <p>
                Outstanding:
                ₹{details.outstanding}
              </p>

              <p>
                Foreclosure Charge:
                ₹
                {
                  details.foreclosureCharge
                }
              </p>

              <p className="text-xl font-bold text-red-600">

                Final Settlement:
                ₹
                {
                  details.foreclosureAmount
                }

              </p>

            </div>

            {/* Button */}
            <button
              onClick={handleForeclose}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Foreclose Loan
            </button>

          </div>
        )}

      </div>

    </DashboardLayout>
  )
}