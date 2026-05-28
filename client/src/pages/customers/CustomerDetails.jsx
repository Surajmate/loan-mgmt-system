import {
    useEffect,
    useState,
} from 'react'

import generateReceipt
    from '../../utils/generateReceipt'

import generateSOA
    from '../../utils/generateSOA'

import {
    useParams,
} from 'react-router-dom'

import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFileDownload,
    FaMoneyBillWave,
    FaFileInvoice,
    FaUserTie,
    FaCalendarAlt,
} from 'react-icons/fa'

import {
    getCustomerDetails,
} from '../../services/customerService'

import {
    generateLoanPDF,
} from '../../utils/generateLoanPDF'
import DashboardLayout from '../../layouts/DashboardLayout'

const CustomerDetails = () => {

    const { id } =
        useParams()

    const [
        data,
        setData,
    ] = useState(null)

    const [
        activeTab,
        setActiveTab,
    ] = useState('overview')

    useEffect(() => {

        fetchCustomer()

    }, [])

    const fetchCustomer =
        async () => {

            try {

                const response =
                    await getCustomerDetails(
                        id
                    )

                setData(response)

            } catch (error) {

                console.log(error)
            }
        }

    if (!data) {

        return (
            <div className="p-10">

                Loading...

            </div>
        )
    }

    const {
        customer,
        loans,
        repayments,
        documents,
        auditLogs,
    } = data

    return (
        <DashboardLayout>
            <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50 min-h-screen">

                {/* HEADER */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-sm p-8">

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                        {/* LEFT */}
                        <div className="flex items-center gap-6">

                            <div className="relative">

                                <div className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center text-5xl font-black shadow-2xl">

                                    {customer.fullName
                                        ?.charAt(0)
                                        ?.toUpperCase()}

                                </div>

                                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 border-4 border-white"></div>

                            </div>

                            <div>

                                <h1 className="text-3xl font-black text-slate-800">

                                    {customer.fullName}

                                </h1>

                                <p className="text-slate-500 mt-2">

                                    Customer Profile

                                </p>

                                <div className="flex flex-wrap gap-5 mt-5 text-slate-600">

                                    <div className="flex items-center gap-2">

                                        <FaPhone />

                                        {customer.mobile}

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <FaEnvelope />

                                        {customer.email || '-'}

                                    </div>

                                    <div className="flex items-center gap-2">

                                        <FaMapMarkerAlt />

                                        {customer.address || '-'}

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="grid grid-cols-2 gap-5">

                            <div className="bg-blue-50 rounded-3xl p-5">

                                <p className="text-slate-500">

                                    Total Loans

                                </p>

                                <h2 className="text-4xl font-bold mt-3 text-blue-700">

                                    {loans.length}

                                </h2>

                            </div>

                            <div className="bg-emerald-50 rounded-3xl p-5">

                                <p className="text-slate-500">

                                    Total Collections

                                </p>

                                <h2 className="text-4xl font-bold mt-3 text-emerald-700">

                                    Rs.
                                    {repayments.reduce(
                                        (
                                            sum,
                                            item
                                        ) =>
                                            sum +
                                            item.amountPaid,
                                        0
                                    )}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                    <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-6 shadow-xl">

                        <p className="text-slate-500">

                            Total Loans

                        </p>

                        <h2 className="text-4xl font-black mt-4 text-blue-700">

                            {loans.length}

                        </h2>

                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-6 shadow-xl">

                        <p className="text-slate-500">

                            Outstanding

                        </p>

                        <h2 className="text-4xl font-black mt-4 text-red-600">

                            Rs.
                            {loans.reduce(
                                (
                                    sum,
                                    loan
                                ) =>
                                    sum +
                                    loan.outstandingAmount,
                                0
                            )}

                        </h2>

                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-6 shadow-xl">

                        <p className="text-slate-500">

                            Total Collections

                        </p>

                        <h2 className="text-4xl font-black mt-4 text-emerald-600">

                            Rs.
                            {repayments.reduce(
                                (
                                    sum,
                                    repayment
                                ) =>
                                    sum +
                                    repayment.amountPaid,
                                0
                            )}

                        </h2>

                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-6 shadow-xl">

                        <p className="text-slate-500">

                            Documents

                        </p>

                        <h2 className="text-4xl font-black mt-4 text-cyan-600">

                            {documents.length}

                        </h2>

                    </div>

                </div>

                {/* TABS */}
                <div className="flex flex-wrap gap-4 mt-8">

                    {[
                        'overview',
                        'loans',
                        'repayments',
                        'documents',
                        'activity',
                    ].map((tab) => (

                        <button
                            key={tab}
                            onClick={() =>
                                setActiveTab(tab)
                            }
                            className={`px-6 py-3 rounded-2xl font-semibold capitalize transition ${activeTab === tab
                                ? 'bg-blue-600 text-white'
                                : 'bg-white/70 backdrop-blur-xl border border-white/40 text-slate-700'
                                }`}
                        >

                            {tab}

                        </button>
                    ))}

                </div>

                {/* OVERVIEW */}
                {activeTab ===
                    'overview' && (

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">

                            {/* CUSTOMER INFO */}
                            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 shadow-sm">

                                <h2 className="text-2xl font-bold mb-8">

                                    Customer Details

                                </h2>

                                <div className="space-y-5">

                                    <div>

                                        <p className="text-slate-500">

                                            PAN Number

                                        </p>

                                        <h3 className="font-semibold mt-2">

                                            {customer.panNumber ||
                                                '-'}

                                        </h3>

                                    </div>

                                    <div>

                                        <p className="text-slate-500">

                                            Aadhaar

                                        </p>

                                        <h3 className="font-semibold mt-2">

                                            {customer.aadharNumber ||
                                                '-'}

                                        </h3>

                                    </div>

                                    <div>

                                        <p className="text-slate-500">

                                            Created At

                                        </p>

                                        <h3 className="font-semibold mt-2">

                                            {new Date(
                                                customer.createdAt
                                            ).toLocaleDateString()}

                                        </h3>

                                    </div>

                                </div>

                            </div>

                            {/* ACTIVE LOANS */}
                            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 shadow-sm xl:col-span-2">

                                <h2 className="text-2xl font-bold mb-8">

                                    Active Loans

                                </h2>

                                <div className="space-y-5">

                                    {loans.map((loan) => (

                                        <div
                                            key={loan._id}
                                            className="border border-slate-200 rounded-3xl p-6"
                                        >

                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                                                <div>

                                                    <h3 className="text-xl font-bold">

                                                        {
                                                            loan.loanType
                                                        }

                                                    </h3>

                                                    <p className="text-slate-500 mt-2">

                                                        Loan Amount:
                                                        {' '}
                                                        Rs.
                                                        {
                                                            loan.loanAmount
                                                        }

                                                    </p>

                                                    <p className="text-slate-500 mt-1">

                                                        Outstanding:
                                                        {' '}
                                                        Rs.
                                                        {
                                                            loan.outstandingAmount
                                                        }

                                                    </p>

                                                </div>

                                                <div className="flex gap-3">

                                                    <button
                                                        onClick={() =>
                                                            generateLoanPDF(
                                                                loan
                                                            )
                                                        }
                                                        className="bg-slate-900 text-white px-5 py-3 rounded-2xl flex items-center gap-3"
                                                    >

                                                        <FaFileDownload />

                                                        Agreement

                                                    </button>

                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>
                    )}

                {/* LOANS */}
                {activeTab ===
                    'loans' && (

                        <div className="space-y-8 mt-8">

                            {loans.map((loan) => (

                                <div
                                    key={loan._id}
                                    className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-sm p-8"
                                >

                                    {/* HEADER */}
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                                        <div>

                                            <h2 className="text-3xl font-bold">

                                                {
                                                    loan.loanType
                                                }

                                            </h2>

                                            <p className="text-slate-500 mt-3">

                                                Loan Amount:
                                                {' '}
                                                Rs.
                                                {
                                                    loan.loanAmount
                                                }

                                            </p>

                                        </div>

                                        <div className="flex gap-4 flex-wrap">

                                            <button
                                                onClick={() =>
                                                    generateLoanPDF(
                                                        loan
                                                    )
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-3"
                                            >

                                                <FaFileInvoice />

                                                Agreement

                                            </button>

                                            <button
                                                onClick={() =>
                                                    generateSOA(
                                                        customer,
                                                        loans,
                                                        repayments
                                                    )
                                                }
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl flex items-center gap-3"
                                            >

                                                <FaFileDownload />

                                                SOA

                                            </button>

                                            {loan.nocGenerated && (

                                                <button className="bg-slate-900 text-white px-5 py-3 rounded-2xl flex items-center gap-3">

                                                    <FaFileDownload />

                                                    NOC

                                                </button>

                                            )}

                                        </div>

                                    </div>

                                    {/* EMI SCHEDULE */}
                                    <div className="mt-10">

                                        <h3 className="text-2xl font-bold mb-6">

                                            EMI Schedule

                                        </h3>

                                        <div className="overflow-auto border border-slate-200 rounded-3xl">

                                            <table className="w-full">

                                                <thead className="bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50">

                                                    <tr>

                                                        <th className="text-left p-4">

                                                            Due Date

                                                        </th>

                                                        <th className="text-left p-4">

                                                            EMI

                                                        </th>

                                                        <th className="text-left p-4">

                                                            Status

                                                        </th>

                                                    </tr>

                                                </thead>

                                                <tbody>

                                                    {loan.repaymentSchedule?.map(
                                                        (
                                                            emi,
                                                            index
                                                        ) => (

                                                            <tr
                                                                key={index}
                                                                className="border-t border-slate-100"
                                                            >

                                                                <td className="p-4">

                                                                    {new Date(
                                                                        emi.dueDate
                                                                    ).toLocaleDateString()}

                                                                </td>

                                                                <td className="p-4">

                                                                    Rs.
                                                                    {
                                                                        emi.emiAmount
                                                                    }

                                                                </td>

                                                                <td className="p-4">

                                                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${emi.status ===
                                                                        'PAID'
                                                                        ? 'bg-emerald-100 text-emerald-700'
                                                                        : 'bg-orange-100 text-orange-700'
                                                                        }`}>

                                                                        {
                                                                            emi.status
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

                                </div>
                            ))}

                        </div>
                    )}

                {/* REPAYMENTS */}
                {activeTab ===
                    'repayments' && (

                        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-sm mt-8 overflow-hidden">

                            <div className="overflow-auto">

                                <table className="w-full">

                                    <thead className="bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50">

                                        <tr>

                                            <th className="text-left p-5">

                                                Loan

                                            </th>

                                            <th className="text-left p-5">

                                                Amount

                                            </th>

                                            <th className="text-left p-5">

                                                Method

                                            </th>

                                            <th className="text-left p-5">

                                                Date

                                            </th>

                                            <th className="text-left p-5">

                                                Receipt

                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {repayments.map(
                                            (
                                                repayment
                                            ) => (

                                                <tr
                                                    key={
                                                        repayment._id
                                                    }
                                                    className="border-t border-slate-100"
                                                >

                                                    <td className="p-5">

                                                        {
                                                            repayment.loan
                                                                ?.loanType
                                                        }

                                                    </td>

                                                    <td className="p-5">

                                                        Rs.
                                                        {
                                                            repayment.amountPaid
                                                        }

                                                    </td>

                                                    <td className="p-5">

                                                        {
                                                            repayment.paymentMethod
                                                        }

                                                    </td>

                                                    <td className="p-5">

                                                        {new Date(
                                                            repayment.createdAt
                                                        ).toLocaleDateString()}

                                                    </td>

                                                    <td className="p-5">

                                                        <button
                                                            onClick={() =>
                                                                generateReceipt(
                                                                    repayment
                                                                )
                                                            }
                                                            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                                                        >

                                                            Download

                                                        </button>

                                                    </td>

                                                </tr>
                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>
                    )}

                {/* DOCUMENTS */}
                {activeTab ===
                    'documents' && (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">

                            {documents.map(
                                (document) => (

                                    <div
                                        key={
                                            document._id
                                        }
                                        className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 shadow-sm"
                                    >

                                        <div className="w-20 h-20 rounded-3xl bg-blue-100 text-blue-700 flex items-center justify-center text-4xl">

                                            📄

                                        </div>

                                        <h2 className="text-2xl font-bold mt-6">

                                            {
                                                document.documentType
                                            }

                                        </h2>

                                        <p className="text-slate-500 mt-3">

                                            Uploaded:
                                            {' '}
                                            {new Date(
                                                document.createdAt
                                            ).toLocaleDateString()}

                                        </p>

                                        <a
                                            href={`https://loan-mgmt-system.onrender.com/${document.file}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-3 w-fit"
                                        >

                                            <FaFileDownload />

                                            Download

                                        </a>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                {/* ACTIVITY */}
                {activeTab ===
                    'activity' && (

                        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-sm p-8 mt-8">

                            <h2 className="text-3xl font-bold mb-10">

                                Activity Timeline

                            </h2>

                            <div className="space-y-8">

                                {auditLogs.map(
                                    (log) => (

                                        <div
                                            key={log._id}
                                            className="flex gap-5"
                                        >

                                            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl">

                                                <FaUserTie />

                                            </div>

                                            <div className="flex-1">

                                                <h3 className="font-bold text-lg">

                                                    {log.action}

                                                </h3>

                                                <p className="text-slate-500 mt-2">

                                                    {
                                                        log.details
                                                    }

                                                </p>

                                                <div className="flex items-center gap-3 mt-3 text-sm text-slate-400">

                                                    <FaCalendarAlt />

                                                    {new Date(
                                                        log.createdAt
                                                    ).toLocaleString()}

                                                </div>

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>
                    )}

            </div>
        </DashboardLayout>
    )
}

export default CustomerDetails