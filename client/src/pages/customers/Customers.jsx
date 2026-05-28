import {
  FaUsers,
  FaUserCheck,
  FaLayerGroup,
  FaSearch,
} from 'react-icons/fa'

import Loader
  from '../../components/Loader'

import TableSkeleton
  from '../../components/TableSkeleton'

import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import AddCustomerModal from '../../components/AddCustomerModal'

import { useNavigate } from 'react-router-dom'
import { addCustomer, getCustomers } from '../../services/customerService'

export default function Customers() {

  const navigate = useNavigate()

  const [customers, setCustomers] = useState([])

  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')

  const [showModal, setShowModal] =
    useState(false)

  // STATS
  const totalCustomers =
    customers.length

  const activeCustomers =
    customers.filter(
      (customer) =>
        customer.status ===
        'ACTIVE'
    ).length

  const groupedCustomers =
    customers.filter(
      (customer) =>
        customer.groupName
    ).length

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

      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          {/* 
    <h1 className="text-4xl font-bold text-slate-800">
      Customers
    </h1> */}

          <p className="text-slate-500 mt-2">
            Manage customer profiles and lending relationships
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg transition"
        >
          + Add Customer
        </button>

      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* TOTAL */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-blue-100">
                Total Customers
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {totalCustomers}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaUsers className="text-3xl" />

            </div>

          </div>

        </div>

        {/* ACTIVE */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-emerald-100">
                Active Customers
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {activeCustomers}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaUserCheck className="text-3xl" />

            </div>

          </div>

        </div>

        {/* GROUPED */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-purple-100">
                Group Members
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {groupedCustomers}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaLayerGroup className="text-3xl" />

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
            placeholder="Search customers..."
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

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100 text-slate-700">

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

              {loading ? <TableSkeleton />
                : filteredCustomers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-6 text-center"
                    >
                      <div className="py-10 text-center">

                        <h3 className="text-xl font-semibold text-slate-700">
                          No Customers Found
                        </h3>

                        <p className="text-slate-500 mt-2">
                          Try adjusting your search or add a new customer.
                        </p>

                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map(
                    (customer) => (
                      <tr
                        key={customer._id}
                        className="border-t border-slate-100 hover:bg-slate-50 transition-all text-left"
                      >

                        <td className="p-4">

                          <div className="flex gap-4">

                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md">

                              {customer.fullName
                                ?.charAt(0)
                                ?.toUpperCase()}

                            </div>

                            {/* Info */}
                            <div>

                              <h3 className="font-semibold text-slate-800 mb-2">
                                {customer.fullName}
                              </h3>

                              <p className="text-sm text-slate-500">
                                {
                                  customer.occupation
                                }
                                <span className="p-2 rounded-full text-sm font-semibold bg-green-100 text-green-700 cursor-pointer ml-4"
                                  onClick={() =>
                                    navigate(
                                      `/customers/${customer._id}`
                                    )
                                  }>
                                  View Details
                                </span>

                              </p>

                            </div>

                          </div>

                        </td>

                        <td className="p-4">
                          {customer.mobile}
                        </td>

                        <td className="p-4">
                          {customer.groupName}
                        </td>

                        <td className="p-4">

                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${customer.status ===
                              'ACTIVE'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                              }`}
                          >

                            {customer.status}

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