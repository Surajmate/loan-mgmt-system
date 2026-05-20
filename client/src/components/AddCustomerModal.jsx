import { useState } from 'react'

import {
  getCustomers,
  addCustomer,
} from '../services/customerService'
import { useEffect } from 'react'
import { getGroups } from '../services/groupService'

export default function AddCustomerModal({
  isOpen,
  onClose,
  onSave,
}) {

  const [groups, setGroups] =
    useState([])

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    occupation: '',
    groupName: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSave(formData)

    setFormData({
      fullName: '',
      mobile: '',
      occupation: '',
      groupName: '',
    })
  }

  useEffect(() => {
    const fetchGroups =
      async () => {
        try {
          const data = await getGroups()
          setGroups(data)
        } catch (error) {
          console.log(error)
        }
      }

    fetchGroups()
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-slate-800">
            Add Customer
          </h2>

          <button
            onClick={onClose}
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
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />

          {/* <input
            type="text"
            name="groupName"
            placeholder="Group Name"
            value={formData.groupName}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          /> */}

          <select
            value={
              formData.customerType
            }

            onChange={(e) =>
              setFormData({
                ...formData,

                customerType:
                  e.target.value,
              })
            }

            className="w-full mt-2 px-4 py-3 rounded-2xl border border-slate-200"
          >

            <option value="INDIVIDUAL">

              Individual

            </option>

            <option value="GROUP">

              Group Member

            </option>

          </select>

          {
            formData.customerType ===
            'GROUP' && (

              <select

                value={
                  formData.groupName
                }

                onChange={(e) =>
                  setFormData({
                    ...formData,

                    groupName:
                      e.target.value,
                  })
                }

                className="w-full mt-2 px-4 py-3 rounded-2xl border border-slate-200"
              >

                <option value="">

                  Select Group

                </option>

                {
                  groups.map(
                    (group) => (

                      <option
                        key={
                          group._id
                        }

                        value={
                          group._id
                        }
                      >

                        {
                          group.groupCode
                        } - {
                          group.groupName
                        }

                      </option>
                    )
                  )
                }

              </select>
            )
          }

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
            >
              Save Customer
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}