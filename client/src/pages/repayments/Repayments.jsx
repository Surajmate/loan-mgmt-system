import {
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaCheckCircle,
  FaSearch,
  FaChartLine,
} from 'react-icons/fa'

import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import {
  getRepayments,
  addRepayment,
} from '../../services/repaymentService'

import {
  getCustomers,
} from '../../services/customerService'

import {
  getLoans,
} from '../../services/loanService'

export default function Repayments() {
  const [repayments, setRepayments] =
    useState([])

  const [customers, setCustomers] =
    useState([])

  const [loans, setLoans] =
    useState([])

  const [search, setSearch] =
    useState('')

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

  // ANALYTICS
  const totalRepayments =
    repayments.length

  const totalCollections =
    repayments.reduce(
      (sum, repayment) =>
        sum +
        Number(
          repayment.amountPaid || 0
        ),
      0
    )

  const averageRepayment =
    totalRepayments > 0
      ? (
          totalCollections /
          totalRepayments
        ).toFixed(0)
      : 0

  // TODAY COLLECTIONS
  const todayCollections =
    repayments
      .filter((repayment) => {
        const today =
          new Date()
            .toISOString()
            .split('T')[0]

        const repaymentDate =
          new Date(
            repayment.createdAt
          )
            .toISOString()
            .split('T')[0]

        return (
          today === repaymentDate
        )
      })
      .reduce(
        (sum, repayment) =>
          sum +
          Number(
            repayment.amountPaid || 0
          ),
        0
      )

  // CUSTOMER LOOKUP
  const getCustomer =
    (customerData) => {
      console.log('Customer Data:', customerData) // Debug log
      if (
        typeof customerData ===
        'object'
      ) {
        return customerData
      }
      return customers.find(
        (customer) =>
          customer._id ===
          customerData
      )
    }

  // LOAN LOOKUP
  const getLoan = (loanData) => {
    if (
      typeof loanData ===
      'object'
    ) {
      return loanData
    }
    return loans.find(
      (loan) =>
        loan._id === loanData
    )
  }

  // FILTER
  const filteredRepayments =
    repayments.filter(
      (repayment) =>
        getLoan(
          repayment._id
        )
    )

  // FETCH DATA
  const fetchData = async () => {
    try {
      const [
        repaymentData,
        customerData,
        loanData,
      ] = await Promise.all([
        getRepayments(),
        getCustomers(),
        getLoans(),
      ])

      setRepayments(repaymentData)

      setCustomers(customerData)

      setLoans(loanData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target

    // LOAN SELECTED
    if (name === 'loan') {
      const loan = loans.find(
        (l) => l._id === value
      )

      setSelectedLoan(loan)

      setFormData({
        ...formData,
        loan: value,
        customer:
          loan?.customer?._id || '',
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

      fetchData()

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

      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>

          <p className="text-slate-500 mt-2">
            Track collections and repayment performance
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg transition"
        >
          + Add Repayment
        </button>

      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* TOTAL COLLECTIONS */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-emerald-100">
                Total Collections
              </p>

              <h2 className="text-4xl font-bold mt-3">
                Rs.{totalCollections}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaMoneyBillWave className="text-3xl" />

            </div>

          </div>

        </div>

        {/* TODAY */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-blue-100">
                Today's Collection
              </p>

              <h2 className="text-4xl font-bold mt-3">
                Rs.{todayCollections}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaChartLine className="text-3xl" />

            </div>

          </div>

        </div>

        {/* REPAYMENTS */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-purple-100">
                Repayments
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {totalRepayments}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaFileInvoiceDollar className="text-3xl" />

            </div>

          </div>

        </div>

        {/* AVERAGE */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-orange-100">
                Avg Repayment
              </p>

              <h2 className="text-4xl font-bold mt-3">
                Rs.{averageRepayment}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaCheckCircle className="text-3xl" />

            </div>

          </div>

        </div>

      </div>

      {/* SEARCH */}
      <div className="bg-white p-5 rounded-3xl shadow-sm mb-6">

        <div className="relative">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search repayments..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border border-slate-300 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition overflow-hidden">

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

              {filteredRepayments.map(
                (repayment) => (
                  <tr
                    key={repayment._id}
                    className="border-t border-slate-100 hover:bg-slate-50 transition"
                  >

                    {/* CUSTOMER */}
                    <td className="p-4">

                      <div className="flex items-center gap-4">

                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md">

                          {(getCustomer(
                            repayment.customer
                          )?.fullName || 'N/A')
                            ?.charAt(0)
                            ?.toUpperCase()}

                        </div>

                        {/* INFO */}
                        <div>

                          <h3 className="font-semibold text-slate-800">

                            {
                              getCustomer(
                                repayment.customer
                              )?.fullName || 'N/A'
                            }

                          </h3>

                          <p className="text-sm text-slate-500">

                            EMI Collection

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* LOAN */}
                    <td className="p-4">

                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">

                        Rs.
                        {
                          getLoan(
                            repayment.loan
                          )?.loanAmount || 0
                        }

                      </span>

                    </td>

                    {/* AMOUNT */}
                    <td className="p-4">

                      <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold">

                        Rs.
                        {
                          repayment.amountPaid || 0
                        }

                      </span>

                    </td>

                    {/* METHOD */}
                    <td className="p-4">
                      {
                        repayment.paymentMethod
                      }
                    </td>

                    {/* DATE */}
                    <td className="p-4 text-slate-600">

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

      {/* MODAL */}
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

              {/* LOAN */}
              <select
                name="loan"
                value={formData.loan}
                onChange={handleChange}
                required
                className="border border-slate-300 rounded-2xl px-4 py-4"
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
                    Rs.{loan.loanAmount}
                  </option>
                ))}

              </select>

              {/* AMOUNT */}
              <input
                type="number"
                name="amountPaid"
                placeholder="Amount Paid"
                value={formData.amountPaid}
                onChange={handleChange}
                required
                className="border border-slate-300 rounded-2xl px-4 py-4"
              />

              {/* PENALTY */}
              <input
                type="number"
                name="penaltyAmount"
                placeholder="Penalty Amount"
                value={
                  formData.penaltyAmount
                }
                onChange={handleChange}
                className="border border-slate-300 rounded-2xl px-4 py-4"
              />

              {/* METHOD */}
              <select
                name="paymentMethod"
                value={
                  formData.paymentMethod
                }
                onChange={handleChange}
                className="border border-slate-300 rounded-2xl px-4 py-4"
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

              {/* LOAN DETAILS */}
              {selectedLoan && (
                <div className="md:col-span-2 bg-slate-100 rounded-2xl p-5">

                  <h3 className="font-bold text-lg mb-3">
                    Loan Details
                  </h3>

                  <div className="space-y-2">

                    <p>
                      Customer:
                      {' '}
                      {
                        selectedLoan.customer
                          ?.fullName
                      }
                    </p>

                    <p>
                      Loan Amount:
                      {' '}
                      Rs.
                      {
                        selectedLoan.loanAmount
                      }
                    </p>

                    <p>
                      Outstanding:
                      {' '}
                      Rs.
                      {
                        selectedLoan.outstandingAmount
                      }
                    </p>

                  </div>

                </div>
              )}

              {/* REMARKS */}
              <textarea
                name="remarks"
                placeholder="Remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="md:col-span-2 border border-slate-300 rounded-2xl px-4 py-4"
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold"
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