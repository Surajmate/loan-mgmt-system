import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import {
  getRepayments,
  addRepayment,
} from '../../services/repaymentService'

import { getLoans } from '../../services/loanService'

export default function Repayments() {
  const [repayments, setRepayments] =
    useState([])

  const [loans, setLoans] = useState([])

  const [showModal, setShowModal] =
    useState(false)

  const [selectedLoan, setSelectedLoan] =
    useState(null)

  const [formData, setFormData] =
    useState({
      loan: '',
      customer: '',
      amountPaid: '',
      penaltyAmount: '',
      paymentMethod: 'CASH',
      remarks: '',
    })

  // FETCH REPAYMENTS
  const fetchRepayments =
    async () => {
      try {
        const data =
          await getRepayments()

        setRepayments(data)
      } catch (error) {
        console.log(error)
      }
    }

  // FETCH LOANS
  const fetchLoans = async () => {
    try {
      const data = await getLoans()

      setLoans(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRepayments()
    fetchLoans()
  }, [])

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target

    // Loan selected
    if (name === 'loan') {
      const loan = loans.find(
        (l) => l._id === value
      )

      setSelectedLoan(loan)

      setFormData({
        ...formData,
        loan: value,
        customer: loan.customer._id,
      })

      return
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // ADD REPAYMENT
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await addRepayment(formData)

      fetchRepayments()

      fetchLoans()

      setShowModal(false)

      setSelectedLoan(null)

      setFormData({
        loan: '',
        customer: '',
        amountPaid: '',
        penaltyAmount: '',
        paymentMethod: 'CASH',
        remarks: '',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          {/* <h1 className="text-3xl font-bold text-slate-800">
            Repayments
          </h1> */}

          <p className="text-slate-500 mt-1">
            Track EMI collections
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-lg transition"
        >
          + Collect EMI
        </button>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-4">
                  Customer
                </th>

                <th className="text-left p-4">
                  Loan Amount
                </th>

                <th className="text-left p-4">
                  Paid
                </th>

                <th className="text-left p-4">
                  Method
                </th>

                <th className="text-left p-4">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {repayments.map(
                (repayment) => (
                  <tr
                    key={repayment._id}
                    className="border-t border-slate-100"
                  >

                    <td className="p-4 font-semibold">
                      {
                        repayment.customer
                          ?.fullName
                      }
                    </td>

                    <td className="p-4">
                      ₹
                      {
                        repayment.loan
                          ?.loanAmount
                      }
                    </td>

                    <td className="p-4 text-green-600 font-semibold">
                      ₹
                      {
                        repayment.amountPaid
                      }
                    </td>

                    <td className="p-4">
                      {
                        repayment.paymentMethod
                      }
                    </td>

                    <td className="p-4">
                      {new Date(
                        repayment.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-auto">

          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold text-slate-800">
                Collect EMI
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-xl"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >

              {/* Loan */}
              <select
                name="loan"
                value={formData.loan}
                onChange={handleChange}
                required
                className="border border-slate-300 rounded-xl px-4 py-3"
              >

                <option value="">
                  Select Loan
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

              {/* Amount */}
              <input
                type="number"
                name="amountPaid"
                placeholder="Amount Paid"
                value={formData.amountPaid}
                onChange={handleChange}
                required
                className="border border-slate-300 rounded-xl px-4 py-3"
              />

              {/* Penalty */}
              <input
                type="number"
                name="penaltyAmount"
                placeholder="Penalty Amount"
                value={
                  formData.penaltyAmount
                }
                onChange={handleChange}
                className="border border-slate-300 rounded-xl px-4 py-3"
              />

              {/* Payment Method */}
              <select
                name="paymentMethod"
                value={
                  formData.paymentMethod
                }
                onChange={handleChange}
                className="border border-slate-300 rounded-xl px-4 py-3"
              >

                <option value="CASH">
                  CASH
                </option>

                <option value="UPI">
                  UPI
                </option>

                <option value="BANK">
                  BANK
                </option>

              </select>

              {/* Outstanding */}
              {selectedLoan && (
                <div className="md:col-span-2 bg-slate-100 rounded-2xl p-5">

                  <h3 className="font-bold text-lg mb-3">
                    Loan Details
                  </h3>

                  <div className="space-y-2">

                    <p>
                      Customer:
                      {
                        selectedLoan.customer
                          ?.fullName
                      }
                    </p>

                    <p>
                      Loan Amount:
                      ₹
                      {
                        selectedLoan.loanAmount
                      }
                    </p>

                    <p>
                      Outstanding:
                      ₹
                      {
                        selectedLoan.outstandingAmount
                      }
                    </p>

                  </div>

                </div>
              )}

              {/* Remarks */}
              <textarea
                name="remarks"
                placeholder="Remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="md:col-span-2 border border-slate-300 rounded-xl px-4 py-3"
              />

              {/* Button */}
              <button
                type="submit"
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                Save Repayment
              </button>

            </form>

          </div>

        </div>
      )}

    </DashboardLayout>
  )
}