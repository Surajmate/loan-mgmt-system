import {
  FaLayerGroup,
  FaUsers,
  FaMoneyBillWave,
  FaSearch,
} from 'react-icons/fa'

import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import {
  getGroups,
  addGroup,
} from '../../services/groupService'

export default function Groups() {
  const [groups, setGroups] = useState([])

  const [search, setSearch] = useState('')

  // ANALYTICS
  const totalGroups =
    groups.length

  const activeGroups =
    groups.filter(
      (group) =>
        group.status ===
        'ACTIVE'
    ).length

  const totalMembers =
    groups.reduce(
      (sum, group) =>
        sum +
        (group.members?.length || 0),
      0
    )

  const totalExposure =
    groups.reduce(
      (sum, group) =>
        sum +
        Number(
          group.totalLoanAmount ||
          0
        ),
      0
    )

  // FILTER
  const filteredGroups =
    groups.filter((group) =>
      group.groupName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )

  const [showModal, setShowModal] =
    useState(false)

  const [formData, setFormData] = useState({
    groupName: '',
    groupCode: '',
    leader: '',
  })

  // FETCH GROUPS
  const fetchGroups = async () => {
    try {
      const data = await getGroups()

      setGroups(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // ADD GROUP
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await addGroup(formData)

      fetchGroups()

      setShowModal(false)

      setFormData({
        groupName: '',
        groupCode: '',
        leader: '',
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
            Group Lending
          </h1> */}

          <p className="text-slate-500 mt-2">
            Manage borrower groups and shared lending responsibility
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg transition"
        >
          + Create Group
        </button>

      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* TOTAL GROUPS */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-blue-100">
                Total Groups
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {totalGroups}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaLayerGroup className="text-3xl" />

            </div>

          </div>

        </div>

        {/* ACTIVE */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-emerald-100">
                Active Groups
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {activeGroups}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaUsers className="text-3xl" />

            </div>

          </div>

        </div>

        {/* MEMBERS */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-purple-100">
                Total Members
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {totalMembers}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaUsers className="text-3xl" />

            </div>

          </div>

        </div>

        {/* EXPOSURE */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-orange-100">
                Loan Exposure
              </p>

              <h2 className="text-3xl font-bold mt-3">
                Rs.{totalExposure}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaMoneyBillWave className="text-3xl" />

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
            placeholder="Search groups..."
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

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-4">
                  Group Name
                </th>

                <th className="text-left p-4">
                  Group Code
                </th>

                <th className="text-left p-4">
                  Leader
                </th>

                <th className="text-left p-4">
                  Members
                </th>

                <th className="text-left p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredGroups.map((group) => (
                <tr
                  key={group._id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-4">

                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md">

                        {group.groupName
                          ?.charAt(0)
                          ?.toUpperCase()}

                      </div>

                      {/* INFO */}
                      <div>

                        <h3 className="font-semibold text-slate-800">

                          {group.groupName}

                        </h3>

                        <p className="text-sm text-slate-500">

                          Shared Liability Group

                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">
                    {group.groupCode}
                  </td>

                  <td className="p-4">
                    {group.leader}
                  </td>

                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

                      {group.members?.length || 0}
                      {' '}
                      Members

                    </span>
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${group.status ===
                        'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}
                    >

                      {group.status}

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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold text-slate-800">
                Add Group
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-slate-500 text-xl"
              >
                ✕
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                name="groupName"
                placeholder="Group Name"
                value={formData.groupName}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                name="groupCode"
                placeholder="Group Code"
                value={formData.groupCode}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                name="leader"
                placeholder="Group Leader"
                value={formData.leader}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-3 rounded-xl border border-slate-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                >
                  Save Group
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </DashboardLayout>
  )
}