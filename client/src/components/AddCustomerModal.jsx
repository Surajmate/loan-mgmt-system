import { useState } from 'react'

export default function AddCustomerModal({
  isOpen,
  onClose,
  onSave,
}) {
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

          <input
            type="text"
            name="groupName"
            placeholder="Group Name"
            value={formData.groupName}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />

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