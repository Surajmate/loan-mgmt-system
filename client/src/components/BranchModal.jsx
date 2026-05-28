import {
  useEffect,
  useState,
} from 'react'

import {
  createBranch,
  updateBranch,
} from '../services/branchService'

import {
  getEmployees,
} from '../services/employeeService'

import {
  successAlert,
  errorAlert
} from '../utils/alerts'

const BranchModal = ({
  isOpen,
  onClose,
  fetchBranches,
  editData,
}) => {

  const [
    managers,
    setManagers,
  ] = useState([])

  const [
    formData,
    setFormData,
  ] = useState({

    branchName: '',

    branchCode: '',

    address: '',

    city: '',

    state: '',

    pincode: '',

    contactNumber: '',

    email: '',

    manager: '',
  })

  useEffect(() => {

    fetchManagers()

  }, [])

  useEffect(() => {

    if (editData) {

      setFormData({

        branchName:
          editData.branchName || '',

        branchCode:
          editData.branchCode || '',

        address:
          editData.address || '',

        city:
          editData.city || '',

        state:
          editData.state || '',

        pincode:
          editData.pincode || '',

        contactNumber:
          editData.contactNumber || '',

        email:
          editData.email || '',

        manager:
          editData.manager?._id || '',
      })
    }

  }, [editData])

  const fetchManagers =
    async () => {

      try {

        const data =
          await getEmployees()

        setManagers(data)

      } catch (error) {

        console.log(error)
      }
    }

  const submitHandler =
    async (e) => {

      e.preventDefault()

      try {

        if (editData) {

          await updateBranch(
            editData._id,
            formData
          )

          successAlert(
            'Branch updated'
          )

        } else {

          await createBranch(
            formData
          )

          successAlert(
            'Branch created'
          )
        }

        fetchBranches()

        onClose()

      } catch (error) {

        // showError(
        //   'Operation failed'
        // )
      }
    }

  if (!isOpen)
    return null

  return (

    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-3xl rounded-[32px] p-8">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">

            {
              editData
                ? 'Update Branch'
                : 'Create Branch'
            }

          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >

            ×

          </button>

        </div>

        <form
          onSubmit={
            submitHandler
          }
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            placeholder="Branch Name"
            value={
              formData.branchName
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                branchName:
                  e.target.value,
              })
            }
            className="border rounded-2xl px-4 py-3"
            required
          />

          <input
            type="text"
            placeholder="Branch Code"
            value={
              formData.branchCode
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                branchCode:
                  e.target.value,
              })
            }
            className="border rounded-2xl px-4 py-3"
            required
          />

          <input
            type="text"
            placeholder="City"
            value={
              formData.city
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                city:
                  e.target.value,
              })
            }
            className="border rounded-2xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="State"
            value={
              formData.state
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                state:
                  e.target.value,
              })
            }
            className="border rounded-2xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Pincode"
            value={
              formData.pincode
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                pincode:
                  e.target.value,
              })
            }
            className="border rounded-2xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Contact Number"
            value={
              formData.contactNumber
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                contactNumber:
                  e.target.value,
              })
            }
            className="border rounded-2xl px-4 py-3"
          />

          <input
            type="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                email:
                  e.target.value,
              })
            }
            className="border rounded-2xl px-4 py-3"
          />

          <select
            value={
              formData.manager
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                manager:
                  e.target.value,
              })
            }
            className="border rounded-2xl px-4 py-3"
          >

            <option value="">
              Select Manager
            </option>

            {
              managers.map(
                (
                  manager
                ) => (

                  <option
                    key={
                      manager._id
                    }
                    value={
                      manager._id
                    }
                  >

                    {
                      manager.fullName
                    }

                  </option>
                )
              )
            }

          </select>

          <textarea
            placeholder="Address"
            value={
              formData.address
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                address:
                  e.target.value,
              })
            }
            className="border rounded-2xl px-4 py-3 md:col-span-2"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-3 font-semibold md:col-span-2"
          >

            {
              editData
                ? 'Update Branch'
                : 'Create Branch'
            }

          </button>

        </form>

      </div>

    </div>
  )
}

export default BranchModal