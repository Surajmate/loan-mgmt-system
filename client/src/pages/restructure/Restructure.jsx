import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import { getLoans } from '../../services/loanService'

import { restructureLoan } from '../../services/restructureService'

export default function Restructure() {
  const [loans, setLoans] = useState([])

  const [selectedLoan, setSelectedLoan] =
    useState(null)

  const [formData, setFormData] =
    useState({
      newEmiAmount: '',
      newTenureMonths: '',
      reason: '',
    })

  // FETCH LOANS
  const fetchLoans = async () => {
    try {
      const data = await getLoans()

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

  // SELECT LOAN
  const handleLoanSelect = (id) => {
    const loan = loans.find(
      (l) => l._id === id
    )

    setSelectedLoan(loan)
  }

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await restructureLoan(
        selectedLoan._id,
        formData
      )

      alert(
        'Loan restructured successfully'
      )

      fetchLoans()

      setSelectedLoan(null)

      setFormData({
        newEmiAmount: '',
        newTenureMonths: '',
        reason: '',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-8">

        {/* <h1 className="text-3xl font-bold text-slate-800">
          Loan Restructuring
        </h1> */}

        <p className="text-slate-500 mt-2">
          Reduce EMI and extend tenure for hardship cases
        </p>

      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-sm p-8 max-w-4xl">

        {/* Loan Select */}
        <div className="mb-6">

          <label className="block mb-2 font-medium text-slate-700">
            Select Loan
          </label>

          <select
            onChange={(e) =>
              handleLoanSelect(
                e.target.value
              )
            }
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

        {/* Current Loan Details */}
        {selectedLoan && (
          <div className="bg-slate-100 rounded-2xl p-6 mb-6">

            <h2 className="text-xl font-bold mb-4">
              Current Loan Structure
            </h2>

            <div className="space-y-2 text-slate-700">

              <p>
                Customer:
                {' '}
                {
                  selectedLoan.customer
                    ?.fullName
                }
              </p>

              <p>
                Outstanding:
                ₹
                {
                  selectedLoan.outstandingAmount
                }
              </p>

              <p>
                Current EMI:
                ₹
                {
                  selectedLoan.emiAmount
                }
              </p>

              <p>
                Current Tenure:
                {
                  selectedLoan.tenureMonths
                }
                {' '}
                Months
              </p>

            </div>

          </div>
        )}

        {/* Form */}
        {selectedLoan && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* EMI */}
            <input
              type="number"
              name="newEmiAmount"
              placeholder="New EMI Amount"
              value={
                formData.newEmiAmount
              }
              onChange={handleChange}
              required
              className="border border-slate-300 rounded-xl px-4 py-3"
            />

            {/* Tenure */}
            <input
              type="number"
              name="newTenureMonths"
              placeholder="New Tenure Months"
              value={
                formData.newTenureMonths
              }
              onChange={handleChange}
              required
              className="border border-slate-300 rounded-xl px-4 py-3"
            />

            {/* Reason */}
            <textarea
              name="reason"
              placeholder="Hardship Reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="md:col-span-2 border border-slate-300 rounded-xl px-4 py-3"
            />

            {/* Button */}
            <button
              type="submit"
              className="md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold"
            >
              Restructure Loan
            </button>

          </form>
        )}

      </div>

    </DashboardLayout>
  )
}