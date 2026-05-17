import {
    useEffect,
    useState,
} from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

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
            alert(
                error.response?.data?.message ||
                'Assignment failed'
            )
        }
    }

    return (
        <DashboardLayout>

            {/* Header */}
            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Collection Assignments
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Assign loans to collection agents
                    </p>

                </div>

                <button
                    onClick={() =>
                        setShowModal(true)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
                >
                    + Assign Collection
                </button>

            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-100">

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
                                        className="border-t border-slate-100"
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
                                            ₹
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

                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                                                {
                                                    assignment.status
                                                }

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
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm"
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

                    <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">

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
                                className="border border-slate-300 rounded-xl px-4 py-3"
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
                                        ₹{loan.loanAmount}
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