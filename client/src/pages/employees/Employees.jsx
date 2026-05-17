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

  const [showModal, setShowModal] =
    useState(false)

  const [formData, setFormData] =
    useState({
      name: '',
      mobile: '',
      email: '',
      role: 'COLLECTION_AGENT',
      branch: '',
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
      [e.target.name]:
        e.target.value,
    })
  }

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await addEmployee(formData)

      fetchEmployees()

      setShowModal(false)

      setFormData({
        name: '',
        mobile: '',
        email: '',
        role:
          'COLLECTION_AGENT',
        branch: '',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>

          {/* <h1 className="text-3xl font-bold text-slate-800">
            Employees
          </h1> */}

          <p className="text-slate-500 mt-2">
            Manage workforce and collection agents
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
        >
          + Add Employee
        </button>

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

              {employees.map(
                (employee) => (
                  <tr
                    key={employee._id}
                    className="border-t border-slate-100"
                  >

                    <td className="p-4 font-semibold">
                      {
                        employee.name
                      }
                    </td>

                    <td className="p-4">
                      {
                        employee.mobile
                      }
                    </td>

                    <td className="p-4">
                      {
                        employee.role
                      }
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold">
                Add Employee
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
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-slate-300 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="border border-slate-300 rounded-xl px-4 py-3"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-slate-300 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                name="branch"
                placeholder="Branch"
                value={formData.branch}
                onChange={handleChange}
                className="border border-slate-300 rounded-xl px-4 py-3"
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border border-slate-300 rounded-xl px-4 py-3"
              >

                <option value="MANAGER">
                  MANAGER
                </option>

                <option value="COLLECTION_AGENT">
                  COLLECTION_AGENT
                </option>

                <option value="AUDITOR">
                  AUDITOR
                </option>

                <option value="DATA_ENTRY">
                  DATA_ENTRY
                </option>

              </select>

              <button
                type="submit"
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                Save Employee
              </button>

            </form>

          </div>

        </div>
      )}

    </DashboardLayout>
  )
}