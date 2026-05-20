import {
  FaUsers,
  FaUserTie,
  FaMoneyBillWave,
  FaSearch,
} from 'react-icons/fa'

import {
    successAlert,
    errorAlert,
    warningAlert,
    closeAlert
} from '../../utils/alerts'

import {
  useEffect,
  useState,
} from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import {
  getEmployees,
  addEmployee,
} from '../../services/employeeService'

export default function Employees() {
  const [employees, setEmployees] =
    useState([])

  const totalEmployees =
    employees.length

  const activeEmployees =
    employees.filter(
      (emp) =>
        emp.status ===
        'ACTIVE'
    ).length

  const totalCollections =
    employees.reduce(
      (sum, emp) =>
        sum +
        Number(
          emp.totalCollections ||
          0
        ),
      0
    )

  const totalSalary =
    employees.reduce(
      (sum, emp) =>
        sum +
        Number(
          emp.salary || 0
        ),
      0
    )

  const [search, setSearch] =
    useState('')

  const filteredEmployees =
    employees.filter(
      (employee) =>
        employee.fullName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    )

  const [showModal, setShowModal] =
    useState(false)

  const [formData, setFormData] =
    useState({
      fullName: '',
      email: '',
      mobile: '',
      role: 'COLLECTION_AGENT',
      department: '',
      branch: '',
      salary: '',
      incentive: '',
      password: '',
    })

  // FETCH
  const fetchEmployees =
    async () => {
      try {
        const data =
          await getEmployees()

        setEmployees(data)
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    fetchEmployees()
  }, [])

  // CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.fullName]:
        e.target.value,
    })
  }

  const handleCreateEmployee =
    async (e) => {

      e.preventDefault()

      try {

        await addEmployee(
          formData
        )

        successAlert(
          'Success',
          'Employee created successfully'
        )

        setShowModal(false)

        fetchEmployees()

        setFormData({
          fullName: '',
          email: '',
          mobile: '',
          role:
            'COLLECTION_AGENT',
          department: '',
          branch: '',
          salary: '',
          incentive: '',
          password: '',
        })

      } catch (error) {

        console.log(error)

        errorAlert('Error',
          error?.response?.data
            ?.message ||
          'Failed to create employee'
        )

      }
    }

  return (
    <DashboardLayout>

      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>

          {/* <p className="text-slate-500 mt-2">
            Track collections and repayment performance
          </p> */}

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg transition"
        >

          + Add Employee

        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* TOTAL */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white">

          <div className="flex items-center justify-between">

            <div>

              <p>Total Employees</p>

              <h2 className="text-4xl font-bold mt-3">

                {totalEmployees}

              </h2>

            </div>

            <FaUsers className="text-4xl" />

          </div>

        </div>

        {/* ACTIVE */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white">

          <div className="flex items-center justify-between">

            <div>

              <p>Active Employees</p>

              <h2 className="text-4xl font-bold mt-3">

                {activeEmployees}

              </h2>

            </div>

            <FaUserTie className="text-4xl" />

          </div>

        </div>

        {/* COLLECTIONS */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white">

          <div className="flex items-center justify-between">

            <div>

              <p>Total Collections</p>

              <h2 className="text-3xl font-bold mt-3">

                Rs.{totalCollections}

              </h2>

            </div>

            <FaMoneyBillWave className="text-4xl" />

          </div>

        </div>

        {/* SALARY */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-6 text-white">

          <div className="flex items-center justify-between">

            <div>

              <p>Total Salary</p>

              <h2 className="text-3xl font-bold mt-3">

                Rs.{totalSalary}

              </h2>

            </div>

            <FaMoneyBillWave className="text-4xl" />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm mb-6">

        <div className="relative">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full border border-slate-300 rounded-2xl pl-12 pr-4 py-4"
          />

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Mobile
                </th>

                <th className="text-left p-4">
                  Role
                </th>

                <th className="text-left p-4">
                  Branch
                </th>

                <th className="text-left p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredEmployees.map(
                (employee) => (
                  <tr
                    key={employee._id}
                    className="border-t border-slate-100"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">

                          {employee.fullName
                            ?.charAt(0)
                            ?.toUpperCase()}

                        </div>

                        <div>

                          <h3 className="font-semibold text-slate-800">

                            {employee.fullName}

                          </h3>

                          <p className="text-sm text-slate-500">

                            {employee.employeeId}

                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="p-4">
                      {
                        employee.mobile
                      }
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${employee.role ===
                          'ADMIN'
                          ? 'bg-red-100 text-red-700'
                          : employee.role ===
                            'MANAGER'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                          }`}
                      >

                        {employee.role}

                      </span>
                    </td>

                    <td className="p-4">
                      {
                        employee.branch
                      }
                    </td>

                    <td className="p-4">

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                        {
                          employee.status
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

      {/* ADD EMPLOYEE */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl p-8 w-full max-w-3xl shadow-2xl">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-3xl font-bold text-slate-800">

                  Add Employee

                </h2>

                <p className="text-slate-500 mt-1">

                  Create employee and login access

                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-2xl"
              >
                ✕
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={
                handleCreateEmployee
              }
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >

              {/* NAME */}
              <input
                type="text"
                placeholder="Full Name"
                value={
                  formData.fullName
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName:
                      e.target.value,
                  })
                }
                className="border border-slate-300 rounded-2xl px-4 py-4"
                required
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target.value,
                  })
                }
                className="border border-slate-300 rounded-2xl px-4 py-4"
                required
              />

              {/* MOBILE */}
              <input
                type="text"
                placeholder="Mobile"
                value={
                  formData.mobile
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobile:
                      e.target.value,
                  })
                }
                className="border border-slate-300 rounded-2xl px-4 py-4"
              />

              {/* ROLE */}
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role:
                      e.target.value,
                  })
                }
                className="border border-slate-300 rounded-2xl px-4 py-4"
              >

                <option value="ADMIN">
                  ADMIN
                </option>

                <option value="MANAGER">
                  MANAGER
                </option>

                <option value="COLLECTION_AGENT">
                  COLLECTION_AGENT
                </option>

                <option value="FIELD_OFFICER">
                  FIELD_OFFICER
                </option>

                <option value="ACCOUNTANT">
                  ACCOUNTANT
                </option>

              </select>

              {/* DEPARTMENT */}
              <input
                type="text"
                placeholder="Department"
                value={
                  formData.department
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department:
                      e.target.value,
                  })
                }
                className="border border-slate-300 rounded-2xl px-4 py-4"
              />

              {/* BRANCH */}
              <input
                type="text"
                placeholder="Branch"
                value={
                  formData.branch
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    branch:
                      e.target.value,
                  })
                }
                className="border border-slate-300 rounded-2xl px-4 py-4"
              />

              {/* SALARY */}
              <input
                type="number"
                placeholder="Salary"
                value={
                  formData.salary
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary:
                      e.target.value,
                  })
                }
                className="border border-slate-300 rounded-2xl px-4 py-4"
              />

              {/* PASSWORD */}
              <input
                type="password"
                placeholder="Password"
                value={
                  formData.password
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password:
                      e.target.value,
                  })
                }
                className="border border-slate-300 rounded-2xl px-4 py-4"
                required
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold"
              >

                Create Employee

              </button>

            </form>

          </div>

        </div>
      )}

    </DashboardLayout>
  )
}