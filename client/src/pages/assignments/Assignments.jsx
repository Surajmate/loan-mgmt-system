import {
    FaTasks,
    FaCheckCircle,
    FaUserTie,
    FaClock,
} from 'react-icons/fa'

import {
    useEffect,
    useState,
} from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import {
    successAlert,
    errorAlert,
    warningAlert,
    closeAlert
} from '../../utils/alerts'

import {
    getAssignments,
    createAssignment,
    completeAssignment
} from '../../services/assignmentService'

import { getEmployees } from '../../services/employeeService'

import { getLoans } from '../../services/loanService'

import { getCustomers } from '../../services/customerService'

export default function Assignments() {
    const [assignments, setAssignments] =
        useState([])

    const [employees, setEmployees] =
        useState([])

    const [loans, setLoans] = useState([])

    const [customers, setCustomers] =
        useState([])

    const [showModal, setShowModal] =
        useState(false)

    const [formData, setFormData] =
        useState({
            employee: '',
            customer: '',
            loan: '',
        })

    // STATS
    const totalAssignments =
        assignments.length

    const activeAssignments =
        assignments.filter(
            (a) =>
                a.status === 'ASSIGNED'
        ).length

    const completedAssignments =
        assignments.filter(
            (a) =>
                a.status === 'COMPLETED'
        ).length

    const totalAgents =
        employees.length

    // FETCH ALL
    const fetchData = async () => {
        try {
            const [
                assignmentData,
                employeeData,
                loanData,
                customerData,
            ] = await Promise.all([
                getAssignments(),
                getEmployees(),
                getLoans(),
                getCustomers(),
            ])

            setAssignments(
                assignmentData
            )

            setEmployees(
                employeeData.filter(
                    (emp) =>
                        emp.role ===
                        'COLLECTION_AGENT'
                )
            )

            // ASSIGNED LOAN IDS
            const assignedLoanIds =
                assignmentData
                    .filter(
                        (a) =>
                            a.status === 'ASSIGNED'
                    )
                    .map((a) => a.loan?._id)

            // FILTER AVAILABLE LOANS
            const availableLoans =
                loanData.filter(
                    (loan) =>
                        loan.status === 'ACTIVE' &&
                        !assignedLoanIds.includes(
                            loan._id
                        )
                )

            setLoans(availableLoans)

            setCustomers(customerData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // CHANGE
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        })
    }

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await createAssignment(
                formData
            )

            fetchData()

            setShowModal(false)

            setFormData({
                employee: '',
                customer: '',
                loan: '',
            })
        } catch (error) {
            errorAlert('error',
                error.response?.data?.message ||
                'Assignment failed'
            )
        }
    }

    return (
        <DashboardLayout>

            {/* PAGE HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

                <div>

                    {/* <h1 className="text-4xl font-bold text-slate-800">
                        Collection Assignments
                    </h1> */}

                    <p className="text-slate-500 mt-2">
                        Manage loan recovery operations and field assignments
                    </p>

                </div>

                <button
                    onClick={() =>
                        setShowModal(true)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg transition"
                >
                    + Assign Collection
                </button>

            </div>

            {/* ANALYTICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                {/* TOTAL */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-blue-100">
                                Assignments
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {totalAssignments}
                            </h2>

                        </div>

                        <div className="bg-white/20 p-4 rounded-2xl">

                            <FaTasks className="text-3xl" />

                        </div>

                    </div>

                </div>

                {/* ACTIVE */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-orange-100">
                                Active
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {activeAssignments}
                            </h2>

                        </div>

                        <div className="bg-white/20 p-4 rounded-2xl">

                            <FaClock className="text-3xl" />

                        </div>

                    </div>

                </div>

                {/* COMPLETED */}
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-6 text-white shadow-lg">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-green-100">
                                Completed
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {completedAssignments}
                            </h2>

                        </div>

                        <div className="bg-white/20 p-4 rounded-2xl">

                            <FaCheckCircle className="text-3xl" />

                        </div>

                    </div>

                </div>

                {/* AGENTS */}
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-purple-100">
                                Agents
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {totalAgents}
                            </h2>

                        </div>

                        <div className="bg-white/20 p-4 rounded-2xl">

                            <FaUserTie className="text-3xl" />

                        </div>

                    </div>

                </div>

            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-100 text-slate-700">

                            <tr>

                                <th className="text-left p-4">
                                    Agent
                                </th>

                                <th className="text-left p-4">
                                    Customer
                                </th>

                                <th className="text-left p-4">
                                    Loan Amount
                                </th>

                                <th className="text-left p-4">
                                    Assigned Date
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

                            {assignments.map(
                                (assignment) => (
                                    <tr
                                        key={assignment._id}
                                        className="border-t border-slate-100 hover:bg-slate-50 transition"
                                    >

                                        <td className="p-4 font-semibold">
                                            {
                                                assignment
                                                    .employee
                                                    ?.name
                                            }
                                        </td>

                                        <td className="p-4">
                                            {
                                                assignment
                                                    .customer
                                                    ?.fullName
                                            }
                                        </td>

                                        <td className="p-4">
                                            Rs.
                                            {
                                                assignment.loan
                                                    ?.loanAmount
                                            }
                                        </td>

                                        <td className="p-4">
                                            {new Date(
                                                assignment.assignedDate
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="p-4">

                                            <span
                                                className={`px-4 py-2 rounded-full text-sm font-semibold ${assignment.status ===
                                                    'COMPLETED'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                    }`}
                                            >

                                                {assignment.status}

                                            </span>

                                        </td>

                                        <td className="p-4">

                                            {assignment.status ===
                                                'ASSIGNED' && (

                                                    <button
                                                        onClick={async () => {
                                                            await completeAssignment(
                                                                assignment._id
                                                            )

                                                            fetchData()
                                                        }}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md transition"
                                                    >
                                                        Complete
                                                    </button>

                                                )}

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
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl">

                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-2xl font-bold">
                                Assign Collection
                            </h2>

                            <button
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                ✕
                            </button>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-5"
                        >

                            {/* Employee */}
                            <select
                                name="employee"
                                value={
                                    formData.employee
                                }
                                onChange={handleChange}
                                required
                                className="border border-slate-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >

                                <option value="">
                                    Select Agent
                                </option>

                                {employees.map(
                                    (employee) => (
                                        <option
                                            key={
                                                employee._id
                                            }
                                            value={
                                                employee._id
                                            }
                                        >
                                            {
                                                employee.name
                                            }
                                        </option>
                                    )
                                )}

                            </select>

                            {/* Customer */}
                            <select
                                name="customer"
                                value={
                                    formData.customer
                                }
                                onChange={handleChange}
                                required
                                className="border border-slate-300 rounded-xl px-4 py-3"
                            >

                                <option value="">
                                    Select Customer
                                </option>

                                {customers.map(
                                    (customer) => (
                                        <option
                                            key={
                                                customer._id
                                            }
                                            value={
                                                customer._id
                                            }
                                        >
                                            {
                                                customer.fullName
                                            }
                                        </option>
                                    )
                                )}

                            </select>

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
                                        Rs.{loan.loanAmount}
                                    </option>
                                ))}

                            </select>

                            {/* Button */}
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                            >
                                Save Assignment
                            </button>

                        </form>

                    </div>

                </div>
            )}

        </DashboardLayout>
    )
}