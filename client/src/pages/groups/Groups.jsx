import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import {
  getGroups,
  addGroup,
} from '../../services/groupService'

export default function Groups() {
  const [groups, setGroups] = useState([])

  const [search, setSearch] = useState('')

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

  // FILTER
  const filteredGroups = groups.filter(
    (group) =>
      group.groupName
        .toLowerCase()
        .includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          {/* <h1 className="text-3xl font-bold text-slate-800">
            Groups
          </h1> */}

          <p className="text-slate-500 mt-1">
            Manage lending groups
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-lg transition"
        >
          + Add Group
        </button>

      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">

        <input
          type="text"
          placeholder="Search groups..."
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

                  <td className="p-4 font-semibold text-slate-800">
                    {group.groupName}
                  </td>

                  <td className="p-4">
                    {group.groupCode}
                  </td>

                  <td className="p-4">
                    {group.leader}
                  </td>

                  <td className="p-4">
                    {group.members.length}
                  </td>

                  <td className="p-4">

                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
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