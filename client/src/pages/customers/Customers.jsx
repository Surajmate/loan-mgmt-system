import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import AddCustomerModal from '../../components/AddCustomerModal'

import {
  getCustomers,
  addCustomer,
} from '../../services/customerService'

export default function Customers() {
  const [customers, setCustomers] = useState([])

  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')

  const [showModal, setShowModal] =
    useState(false)

  // FETCH CUSTOMERS
  const fetchCustomers = async () => {
    try {
      const data = await getCustomers()

      setCustomers(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  // ADD CUSTOMER
  const handleAddCustomer = async (
    customerData
  ) => {
    try {
      await addCustomer(customerData)

      fetchCustomers()

      setShowModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  // FILTER
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          {/* <h1 className="text-3xl font-bold text-slate-800">
            Customers
          </h1> */}

          <p className="text-slate-500 mt-1">
            Manage customer information
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-lg transition"
        >
          + Add Customer
        </button>

      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">

        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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
                  Mobile
                </th>

                <th className="text-left p-4">
                  Group
                </th>

                <th className="text-left p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center"
                  >
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(
                  (customer) => (
                    <tr
                      key={customer._id}
                      className="border-t border-slate-100 hover:bg-slate-50 transition"
                    >

                      <td className="p-4">

                        <div>

                          <h3 className="font-semibold text-slate-800">
                            {customer.fullName}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {
                              customer.occupation
                            }
                          </p>

                        </div>

                      </td>

                      <td className="p-4">
                        {customer.mobile}
                      </td>

                      <td className="p-4">
                        {customer.groupName}
                      </td>

                      <td className="p-4">

                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                          {
                            customer.status
                          }
                        </span>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Modal */}
      <AddCustomerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddCustomer}
      />

    </DashboardLayout>
  )
}