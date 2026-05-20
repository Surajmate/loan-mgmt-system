import {
    FaMoneyBillWave,
    FaExclamationTriangle,
    FaCheckCircle,
    FaBalanceScale,
    FaSearch,
    FaFileDownload,
} from 'react-icons/fa'
import {
    successAlert,
    errorAlert,
    warningAlert,
    closeAlert,
    textareaAlert
} from '../../utils/alerts'
import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { generateLoanPDF } from '../../utils/generateLoanPDF'
import {
    getLoans,
    createLoan,
    generateNOC,
    approveLoan
} from '../../services/loanService'
import { getCustomers } from '../../services/customerService'
import { hasRole } from '../../utils/permissions'
import DataTable from '../../components/DataTable'

export default function Loans() {
    const [loans, setLoans] = useState([])

    const [search, setSearch] =
        useState('')

    const [selectedLoan, setSelectedLoan] =
        useState(null)

    const [customers, setCustomers] = useState([])

    const [showModal, setShowModal] =
        useState(false)

    // ANALYTICS
    const totalLoans =
        loans.length

    const activeLoans =
        loans.filter(
            (loan) =>
                loan.status === 'ACTIVE'
        ).length

    const overdueLoans =
        loans.filter(
            (loan) =>
                loan.isOverdue
        ).length

    const foreclosedLoans =
        loans.filter(
            (loan) =>
                loan.status ===
                'FORECLOSED'
        ).length

    const totalDisbursed =
        loans.reduce(
            (sum, loan) =>
                sum +
                Number(
                    loan.loanAmount || 0
                ),
            0
        )

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

    // FILTERED LOANS
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

            setLoans(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGenerateNOC =
        async (loanId) => {
            try {
                const blob =
                    await generateNOC(
                        loanId
                    )

                const url =
                    window.URL.createObjectURL(
                        new Blob([blob])
                    )

                const link =
                    document.createElement('a')

                link.href = url

                link.setAttribute(
                    'download',
                    `NOC_${loanId}.pdf`
                )

                document.body.appendChild(
                    link
                )

                link.click()

                link.remove()

                successAlert(
                    'Success',
                    'NOC downloaded successfully'
                )

                fetchLoans()
            } catch (error) {
                console.log(error)

                errorAlert('Error',
                    error?.response?.data
                        ?.message ||
                    'Failed to generate NOC'
                )
            }
        }

    const handleApprove =
        async (
            loanId,
            status
        ) => {

            const result =
                await textareaAlert(
                    status ===
                        'APPROVED'
                        ? 'Approve Loan'
                        : 'Reject Loan',

                    status ===
                        'APPROVED'
                        ? 'Approve'
                        : 'Reject'
                )

            if (!result.isConfirmed)
                return

            try {

                await approveLoan(
                    loanId,
                    {
                        approvalStatus:
                            status,

                        approvalRemarks:
                            result.value,
                    }
                )

                successAlert(
                    'Success',
                    `Loan ${status.toLowerCase()} successfully`
                )

                fetchLoans()

            } catch (error) {

                errorAlert(
                    'Error',
                    error?.response?.data
                        ?.message ||
                    'Approval failed'
                )

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
        (Number(loanAmount)) + (Number(interest)) || 0

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

            {/* PAGE HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

                <div>

                    {/* <h1 className="text-4xl font-bold text-slate-800">
                        Loans Portfolio
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage lending portfolio and repayment operations
                    </p> */}

                </div>

                <button
                    onClick={() =>
                        setShowModal(true)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg transition"
                >
                    + Create Loan
                </button>

            </div>

            {/* ANALYTICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                {/* TOTAL LOANS */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-blue-100">
                                Total Loans
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {totalLoans}
                            </h2>

                        </div>

                        <div className="bg-white/20 p-4 rounded-2xl">

                            <FaMoneyBillWave className="text-3xl" />

                        </div>

                    </div>

                </div>

                {/* ACTIVE */}
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-lg">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-emerald-100">
                                Active Loans
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {activeLoans}
                            </h2>

                        </div>

                        <div className="bg-white/20 p-4 rounded-2xl">

                            <FaCheckCircle className="text-3xl" />

                        </div>

                    </div>

                </div>

                {/* OVERDUE */}
                <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-6 text-white shadow-lg">

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

                {/* FORECLOSED */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-orange-100">
                                Foreclosed
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {foreclosedLoans}
                            </h2>

                        </div>

                        <div className="bg-white/20 p-4 rounded-2xl">

                            <FaBalanceScale className="text-3xl" />

                        </div>

                    </div>

                </div>

            </div>

            {/* PORTFOLIO OVERVIEW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                {/* DISBURSED */}
                <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

                    <p className="text-slate-500">
                        Total Disbursed
                    </p>

                    <h2 className="text-5xl font-bold text-blue-600 mt-4">
                        Rs.{totalDisbursed}
                    </h2>

                    <div className="mt-5 flex items-center justify-between text-sm">

                        <span className="text-slate-500">
                            Portfolio Size
                        </span>

                        <span className="font-bold text-slate-800">
                            {totalLoans} Loans
                        </span>

                    </div>

                </div>

                {/* OUTSTANDING */}
                <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

                    <p className="text-slate-500">
                        Outstanding Amount
                    </p>

                    <h2 className="text-5xl font-bold text-orange-600 mt-4">
                        Rs.{totalOutstanding}
                    </h2>

                    <div className="mt-5 flex items-center justify-between text-sm">

                        <span className="text-slate-500">
                            Recovery Risk
                        </span>

                        <span className="font-bold text-red-600">
                            {overdueLoans} Overdue
                        </span>

                    </div>

                </div>

            </div>

            {/* SEARCH */}
            <div className="bg-white p-5 rounded-3xl shadow-sm mb-6">

                <div className="relative">

                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        placeholder="Search loans..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full border border-slate-300 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition overflow-hidden">

                <div className="overflow-y-auto overflow-x-auto max-h-[400px] rounded-2xl border border-slate-200">

                    <table className="w-full">

                        <thead className="bg-slate-100 sticky top-0 z-10">

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

                                {/* <th className="text-left p-4">
                                    Payable
                                </th> */}

                                <th className="text-left p-4">
                                    Agreement
                                </th>

                                <th className="text-left p-4">
                                    Approval
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                                <th className="text-left p-4">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredLoans.map((loan) => (
                                <tr
                                    key={loan._id}
                                    className="border-t border-slate-100"
                                >

                                    <td className="p-4">

                                        <div className="flex items-center gap-4">

                                            {/* Avatar */}
                                            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md">

                                                {loan.customer?.fullName
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}

                                            </div>

                                            {/* INFO */}
                                            <div>

                                                <h3 className="font-semibold text-slate-800">

                                                    {
                                                        loan.customer
                                                            ?.fullName
                                                    }

                                                </h3>

                                                <p className="text-sm text-slate-500">

                                                    {
                                                        loan.loanType
                                                    }

                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="p-4">
                                        {loan.loanType}
                                    </td>

                                    <td className="p-4">
                                        Rs.{loan.loanAmount}
                                    </td>

                                    {/* <td className="p-4">
                                        Rs.{loan.totalPayable}
                                    </td> */}

                                    <td className="p-4">

                                        <button
                                            onClick={() =>
                                                generateLoanPDF(loan)
                                            }
                                            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl"
                                        ><FaFileDownload className="inline-block" /></button>

                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-semibold ${loan.approvalStatus ===
                                                'APPROVED'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : loan.approvalStatus ===
                                                    'REJECTED'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                }`}
                                        >

                                            {loan.approvalStatus ===
                                                'APPROVED' ? "✓" : loan.approvalStatus ===
                                                    'REJECTED' ? "✗" : "!"}

                                        </span>
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-semibold ${loan.status === 'ACTIVE'
                                                ? 'bg-green-100 text-green-700'
                                                : loan.status ===
                                                    'FORECLOSED'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                }`}
                                        >

                                            {loan.status}

                                        </span>

                                        {loan.isOverdue && (
                                            <span className="ml-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">

                                                OVERDUE

                                            </span>
                                        )}

                                    </td>

                                    <td className="p-4">

                                        <button
                                            onClick={() =>
                                                setSelectedLoan(loan)
                                            }
                                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold"
                                        >

                                            👁

                                        </button>

                                        {hasRole([
                                            'ADMIN',
                                            'MANAGER',
                                        ]) &&
                                            loan.approvalStatus ===
                                            'PENDING' && (
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() =>
                                                            handleApprove(
                                                                loan._id,
                                                                'APPROVED'
                                                            )
                                                        }
                                                        className="bg-emerald-600 text-white px-4 py-2 rounded-xl"
                                                    >

                                                        ✓

                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleApprove(
                                                                loan._id,
                                                                'REJECTED'
                                                            )
                                                        }
                                                        className="bg-red-600 text-white px-4 py-2 rounded-xl"
                                                    >

                                                        ✗

                                                    </button>
                                                </div>
                                            )}

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* LOAN DETAILS */}
            {selectedLoan && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-auto">

                    <div className="bg-white rounded-3xl p-8 w-full max-w-6xl shadow-2xl max-h-[90vh] overflow-y-auto">

                        {/* HEADER */}
                        <div className="flex items-center justify-between mb-8">

                            <div>

                                <h2 className="text-3xl font-bold text-slate-800">

                                    Loan Details

                                </h2>

                                <p className="text-slate-500 mt-1">

                                    Complete repayment and loan information

                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setSelectedLoan(null)
                                }
                                className="text-2xl"
                            >
                                ✕
                            </button>

                        </div>

                        {/* SUMMARY */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                            <div className="bg-slate-100 rounded-2xl p-5">

                                <p className="text-slate-500 text-sm">
                                    Loan Amount
                                </p>

                                <h3 className="text-2xl font-bold mt-2">

                                    Rs.
                                    {
                                        selectedLoan.loanAmount
                                    }

                                </h3>

                            </div>

                            <div className="bg-slate-100 rounded-2xl p-5">

                                <p className="text-slate-500 text-sm">
                                    Outstanding
                                </p>

                                <h3 className="text-2xl font-bold text-orange-600 mt-2">

                                    Rs.
                                    {
                                        selectedLoan.outstandingAmount
                                    }

                                </h3>

                            </div>

                            <div className="bg-slate-100 rounded-2xl p-5">

                                <p className="text-slate-500 text-sm">
                                    EMI Amount
                                </p>

                                <h3 className="text-2xl font-bold text-blue-600 mt-2">

                                    Rs.
                                    {
                                        selectedLoan.emiAmount
                                    }

                                </h3>

                            </div>

                        </div>

                        {/* EMI SCHEDULE */}
                        <div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-5">

                                Repayment Schedule

                            </h3>

                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead className="bg-slate-100 sticky top-0 z-20">

                                        <tr>

                                            <th className="p-4 text-left">
                                                Due Date
                                            </th>

                                            <th className="p-4 text-left">
                                                EMI
                                            </th>

                                            <th className="p-4 text-left">
                                                Principal
                                            </th>

                                            <th className="p-4 text-left">
                                                Interest
                                            </th>

                                            <th className="p-4 text-left">
                                                Outstanding
                                            </th>

                                            <th className="p-4 text-left">
                                                Status
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {selectedLoan
                                            .repaymentSchedule
                                            ?.map(
                                                (
                                                    schedule,
                                                    index
                                                ) => (
                                                    <tr
                                                        key={index}
                                                        className="border-t"
                                                    >

                                                        <td className="p-4">

                                                            {new Date(
                                                                schedule.dueDate
                                                            ).toLocaleDateString()}

                                                        </td>

                                                        <td className="p-4">

                                                            Rs.
                                                            {
                                                                schedule.emiAmount
                                                            }

                                                        </td>

                                                        <td className="p-4">

                                                            Rs.
                                                            {
                                                                schedule.principalAmount
                                                            }

                                                        </td>

                                                        <td className="p-4">

                                                            Rs.
                                                            {
                                                                schedule.interestAmount
                                                            }

                                                        </td>

                                                        <td className="p-4">

                                                            Rs.
                                                            {
                                                                schedule.outstandingAmount
                                                            }

                                                        </td>

                                                        <td className="p-4">

                                                            <span
                                                                className={`px-4 py-2 rounded-full text-sm font-semibold ${schedule.status ===
                                                                    'PAID'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : schedule.status ===
                                                                        'OVERDUE'
                                                                        ? 'bg-red-100 text-red-700'
                                                                        : 'bg-orange-100 text-orange-700'
                                                                    }`}
                                                            >

                                                                {
                                                                    schedule.status
                                                                }

                                                            </span>

                                                        </td>

                                                    </tr>
                                                )
                                            )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        {/* NOC */}
                        {selectedLoan
                            .outstandingAmount ===
                            0 && (
                                <button
                                    onClick={() =>
                                        handleGenerateNOC(
                                            selectedLoan._id
                                        )
                                    }
                                    className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-2xl font-semibold"
                                >

                                    Generate NOC

                                </button>
                            )}

                    </div>

                </div>
            )}

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
                                        Interest: Rs.{interest}
                                    </p>

                                    <p>
                                        Total Payable:
                                        Rs.{totalPayable}
                                    </p>

                                    <p>
                                        Disbursed Amount:
                                        Rs.{disbursedAmount}
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