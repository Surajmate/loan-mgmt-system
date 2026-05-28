import {
    useEffect,
    useState,
} from 'react'

import {
    useParams,
} from 'react-router-dom'

import {
    FaBuilding,
    FaUsers,
    FaMoneyBillWave,
    FaChartLine,
} from 'react-icons/fa'

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts'

import Loader
    from '../../components/Loader'

import {
    getBranchDetails,
} from '../../services/branchService'
import DashboardLayout from '../../layouts/DashboardLayout'

const COLORS = [
    '#2563eb',
    '#10b981',
    '#f59e0b',
]

const BranchDetails = () => {

    const { id } =
        useParams()

    const [
        data,
        setData,
    ] = useState(null)

    const [
        loading,
        setLoading,
    ] = useState(true)

    useEffect(() => {

        fetchDetails()

    }, [])

    const fetchDetails =
        async () => {

            try {

                setLoading(true)

                const response =
                    await getBranchDetails(
                        id
                    )

                setData(response)

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)
            }
        }

    if (loading) {

        return <Loader />
    }

    const {
        branch,
        employees,
        customers,
        loans,
        repayments,
        analytics,
    } = data

    const pieData = [

        {
            name:
                'Collections',

            value:
                analytics.totalCollections,
        },

        {
            name:
                'Outstanding',

            value:
                analytics.totalOutstanding,
        },
    ]

    const loanChartData =
        loans.slice(0, 5)
            .map((loan) => ({

                name:
                    loan.customer
                        ?.fullName,

                amount:
                    loan.loanAmount,
            }))

    return (
        <DashboardLayout>
            <div className="bg-slate-100 min-h-screen">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[36px] p-8 text-white shadow-lg">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div>

                            <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-4xl mb-5">

                                <FaBuilding />

                            </div>

                            <h1 className="text-4xl font-bold">

                                {
                                    branch.branchName
                                }

                            </h1>

                            <p className="mt-3 text-blue-100">

                                {
                                    branch.city
                                },
                                {' '}
                                {
                                    branch.state
                                }

                            </p>

                            <p className="mt-2 text-blue-100">

                                Manager:
                                {' '}
                                {
                                    branch.manager
                                        ?.fullName
                                    || 'Not Assigned'
                                }

                            </p>

                        </div>

                        <div className="grid grid-cols-2 gap-5">

                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 min-w-[180px]">

                                <p className="text-blue-100">

                                    Total Customers

                                </p>

                                <h2 className="text-4xl font-bold mt-2">

                                    {
                                        analytics.totalCustomers
                                    }

                                </h2>

                            </div>

                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 min-w-[180px]">

                                <p className="text-blue-100">

                                    Total Loans

                                </p>

                                <h2 className="text-4xl font-bold mt-2">

                                    {
                                        analytics.totalLoans
                                    }

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ANALYTICS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                    <div className="bg-white rounded-[32px] p-6 shadow-sm">

                        <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">

                            <FaUsers />

                        </div>

                        <p className="text-slate-500 mt-5">

                            Employees

                        </p>

                        <h2 className="text-4xl font-bold mt-2">

                            {
                                analytics.totalEmployees
                            }

                        </h2>

                    </div>

                    <div className="bg-white rounded-[32px] p-6 shadow-sm">

                        <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">

                            <FaMoneyBillWave />

                        </div>

                        <p className="text-slate-500 mt-5">

                            Collections

                        </p>

                        <h2 className="text-4xl font-bold mt-2">

                            ₹
                            {
                                analytics.totalCollections
                                    ?.toLocaleString(
                                        'en-IN'
                                    )
                            }

                        </h2>

                    </div>

                    <div className="bg-white rounded-[32px] p-6 shadow-sm">

                        <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl">

                            <FaChartLine />

                        </div>

                        <p className="text-slate-500 mt-5">

                            Outstanding

                        </p>

                        <h2 className="text-4xl font-bold mt-2">

                            ₹
                            {
                                analytics.totalOutstanding
                                    ?.toLocaleString(
                                        'en-IN'
                                    )
                            }

                        </h2>

                    </div>

                    <div className="bg-white rounded-[32px] p-6 shadow-sm">

                        <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">

                            <FaMoneyBillWave />

                        </div>

                        <p className="text-slate-500 mt-5">

                            Loan Amount

                        </p>

                        <h2 className="text-4xl font-bold mt-2">

                            ₹
                            {
                                analytics.totalLoanAmount
                                    ?.toLocaleString(
                                        'en-IN'
                                    )
                            }

                        </h2>

                    </div>

                </div>

                {/* CHARTS */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

                    {/* PIE */}
                    <div className="bg-white rounded-[32px] p-6 shadow-sm">

                        <h2 className="text-2xl font-bold text-slate-800 mb-6">

                            Collections vs Outstanding

                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <PieChart>

                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    outerRadius={110}
                                    label
                                >

                                    {
                                        pieData.map(
                                            (
                                                entry,
                                                index
                                            ) => (

                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[
                                                        index %
                                                        COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )
                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                    {/* BAR */}
                    <div className="bg-white rounded-[32px] p-6 shadow-sm">

                        <h2 className="text-2xl font-bold text-slate-800 mb-6">

                            Loan Distribution

                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <BarChart
                                data={
                                    loanChartData
                                }
                            >

                                <XAxis
                                    dataKey="name"
                                />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="amount"
                                    fill="#2563eb"
                                    radius={[
                                        10,
                                        10,
                                        0,
                                        0,
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* EMPLOYEES */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm mt-8 overflow-auto">

                    <h2 className="text-2xl font-bold text-slate-800 mb-6">

                        Employees

                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-4">

                                    Name

                                </th>

                                <th className="text-left py-4">

                                    Role

                                </th>

                                <th className="text-left py-4">

                                    Mobile

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                employees.map(
                                    (
                                        employee
                                    ) => (

                                        <tr
                                            key={
                                                employee._id
                                            }
                                            className="border-b"
                                        >

                                            <td className="py-4">

                                                {
                                                    employee.fullName
                                                }

                                            </td>

                                            <td className="py-4">

                                                {
                                                    employee.role
                                                }

                                            </td>

                                            <td className="py-4">

                                                {
                                                    employee.mobile
                                                }

                                            </td>

                                        </tr>
                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>

                {/* CUSTOMERS */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm mt-8 overflow-auto">

                    <h2 className="text-2xl font-bold text-slate-800 mb-6">

                        Customers

                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-4">

                                    Customer

                                </th>

                                <th className="text-left py-4">

                                    Mobile

                                </th>

                                <th className="text-left py-4">

                                    City

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                customers.map(
                                    (
                                        customer
                                    ) => (

                                        <tr
                                            key={
                                                customer._id
                                            }
                                            className="border-b"
                                        >

                                            <td className="py-4">

                                                {
                                                    customer.fullName
                                                }

                                            </td>

                                            <td className="py-4">

                                                {
                                                    customer.mobile
                                                }

                                            </td>

                                            <td className="py-4">

                                                {
                                                    customer.city
                                                }

                                            </td>

                                        </tr>
                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>

                {/* LOANS */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm mt-8 overflow-auto">

                    <h2 className="text-2xl font-bold text-slate-800 mb-6">

                        Loans

                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-4">

                                    Customer

                                </th>

                                <th className="text-left py-4">

                                    Loan Type

                                </th>

                                <th className="text-left py-4">

                                    Amount

                                </th>

                                <th className="text-left py-4">

                                    Outstanding

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                loans.map(
                                    (
                                        loan
                                    ) => (

                                        <tr
                                            key={
                                                loan._id
                                            }
                                            className="border-b"
                                        >

                                            <td className="py-4">

                                                {
                                                    loan.customer
                                                        ?.fullName
                                                }

                                            </td>

                                            <td className="py-4">

                                                {
                                                    loan.loanType
                                                }

                                            </td>

                                            <td className="py-4">

                                                ₹
                                                {
                                                    loan.loanAmount
                                                        ?.toLocaleString(
                                                            'en-IN'
                                                        )
                                                }

                                            </td>

                                            <td className="py-4 text-red-600 font-semibold">

                                                ₹
                                                {
                                                    loan.outstandingAmount
                                                        ?.toLocaleString(
                                                            'en-IN'
                                                        )
                                                }

                                            </td>

                                        </tr>
                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>
        </DashboardLayout>
    )
}

export default BranchDetails