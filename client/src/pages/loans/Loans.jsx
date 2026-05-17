import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'
import { generateLoanPDF } from '../../utils/generateLoanPDF'

import {
    getLoans,
    createLoan,
} from '../../services/loanService'

import { getCustomers } from '../../services/customerService'

export default function Loans() {
    const [loans, setLoans] = useState([])

    const [customers, setCustomers] = useState([])

    const [showModal, setShowModal] =
        useState(false)

    const [formData, setFormData] = useState({
        customer: '',
        loanType: 'STANDARD',
        loanAmount: '',
        interestRate: '',
        processingFee: '',
        insuranceEnabled: false,
        insuranceAmount: '',
        tenureMonths: '',
        tenureDays: '',
    })

    // FETCH LOANS
    const fetchLoans = async () => {
        try {
            const data = await getLoans()

            setLoans(data)
        } catch (error) {
            console.log(error)
        }
    }

    // FETCH CUSTOMERS
    const fetchCustomers = async () => {
        try {
            const data = await getCustomers()

            setCustomers(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchLoans()
        fetchCustomers()
    }, [])

    // HANDLE CHANGE
    const handleChange = (e) => {
        const { name, value, type, checked } =
            e.target

        setFormData({
            ...formData,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value,
        })
    }

    // CALCULATIONS
    const loanAmount =
        Number(formData.loanAmount) || 0

    const interestRate =
        Number(formData.interestRate) || 0

    const processingFee =
        Number(formData.processingFee) || 0

    const insuranceAmount =
        Number(formData.insuranceAmount) || 0

    const interest =
        (Number(loanAmount) * Number(interestRate)) / 100

    const totalPayable =
        (Number(loanAmount) + Number(interest)) || 0

    const disbursedAmount =
        (Number(loanAmount) -
            Number(processingFee) -
            Number(insuranceAmount)) || 0

    // CREATE LOAN
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await createLoan(formData)

            fetchLoans()

            setShowModal(false)

            setFormData({
                customer: '',
                loanType: 'STANDARD',
                loanAmount: '',
                interestRate: '',
                processingFee: '',
                insuranceEnabled: false,
                insuranceAmount: '',
                tenureMonths: '',
                tenureDays: '',
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
                        Loans
                    </h1> */}

                    <p className="text-slate-500 mt-1">
                        Manage customer loans
                    </p>

                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-lg transition"
                >
                    + Create Loan
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
                                    Loan Type
                                </th>

                                <th className="text-left p-4">
                                    Amount
                                </th>

                                <th className="text-left p-4">
                                    Payable
                                </th>

                                <th className="text-left p-4">
                                    Agreement
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {loans.map((loan) => (
                                <tr
                                    key={loan._id}
                                    className="border-t border-slate-100"
                                >

                                    <td className="p-4 font-semibold">
                                        {loan.customer?.fullName}
                                    </td>

                                    <td className="p-4">
                                        {loan.loanType}
                                    </td>

                                    <td className="p-4">
                                        ₹{loan.loanAmount}
                                    </td>

                                    <td className="p-4">
                                        ₹{loan.totalPayable}
                                    </td>

                                    <td className="p-4">

                                        <button
                                            onClick={() =>
                                                generateLoanPDF(loan)
                                            }
                                            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl"
                                        >
                                            Download PDF
                                        </button>

                                    </td>

                                    <td className="p-4">

                                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                                            {loan.status}
                                        </span>

                                    </td>

                                </tr>
                            ))}

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
                                Create Loan
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

                            {/* Customer */}
                            <select
                                name="customer"
                                value={formData.customer}
                                onChange={handleChange}
                                required
                                className="border border-slate-300 rounded-xl px-4 py-3"
                            >

                                <option value="">
                                    Select Customer
                                </option>

                                {customers.map((customer) => (
                                    <option
                                        key={customer._id}
                                        value={customer._id}
                                    >
                                        {customer.fullName}
                                    </option>
                                ))}

                            </select>

                            {/* Loan Type */}
                            <select
                                name="loanType"
                                value={formData.loanType}
                                onChange={handleChange}
                                className="border border-slate-300 rounded-xl px-4 py-3"
                            >

                                <option value="STANDARD">
                                    STANDARD
                                </option>

                                <option value="GROUP">
                                    GROUP
                                </option>

                                <option value="QUICK_LOAN">
                                    QUICK LOAN
                                </option>

                            </select>

                            {/* Loan Amount */}
                            <input
                                type="number"
                                name="loanAmount"
                                placeholder="Loan Amount"
                                value={formData.loanAmount}
                                onChange={handleChange}
                                required
                                className="border border-slate-300 rounded-xl px-4 py-3"
                            />

                            {/* Interest */}
                            <input
                                type="number"
                                name="interestRate"
                                placeholder="Interest Rate"
                                value={formData.interestRate}
                                onChange={handleChange}
                                required
                                className="border border-slate-300 rounded-xl px-4 py-3"
                            />

                            {/* Processing Fee */}
                            <input
                                type="number"
                                name="processingFee"
                                placeholder="Processing Fee"
                                value={formData.processingFee}
                                onChange={handleChange}
                                className="border border-slate-300 rounded-xl px-4 py-3"
                            />

                            {/* Insurance */}
                            <input
                                type="number"
                                name="insuranceAmount"
                                placeholder="Insurance Amount"
                                value={formData.insuranceAmount}
                                onChange={handleChange}
                                className="border border-slate-300 rounded-xl px-4 py-3"
                            />

                            {/* Tenure Months */}
                            <input
                                type="number"
                                name="tenureMonths"
                                placeholder="Tenure Months"
                                value={formData.tenureMonths}
                                onChange={handleChange}
                                className="border border-slate-300 rounded-xl px-4 py-3"
                            />

                            {/* Tenure Days */}
                            <input
                                type="number"
                                name="tenureDays"
                                placeholder="Tenure Days"
                                value={formData.tenureDays}
                                onChange={handleChange}
                                className="border border-slate-300 rounded-xl px-4 py-3"
                            />

                            {/* Summary */}
                            <div className="md:col-span-2 bg-slate-100 rounded-2xl p-5">

                                <h3 className="font-bold text-lg mb-4">
                                    Loan Summary
                                </h3>

                                <div className="space-y-2 text-slate-700">

                                    <p>
                                        Interest: ₹{interest}
                                    </p>

                                    <p>
                                        Total Payable:
                                        ₹{totalPayable}
                                    </p>

                                    <p>
                                        Disbursed Amount:
                                        ₹{disbursedAmount}
                                    </p>

                                </div>

                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                            >
                                Save Loan
                            </button>

                        </form>

                    </div>

                </div>
            )}

        </DashboardLayout>
    )
}