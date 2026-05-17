import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import { getLoans } from '../../services/loanService'

import {
  getDocuments,
  uploadDocument,
} from '../../services/documentService'

export default function Documents() {
  const [loans, setLoans] = useState([])

  const [selectedLoan, setSelectedLoan] =
    useState('')

  const [documents, setDocuments] =
    useState([])

  const [file, setFile] = useState(null)

  // FETCH LOANS
  const fetchLoans = async () => {
    try {
      const data = await getLoans()

      setLoans(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLoans()
  }, [])

  // FETCH DOCUMENTS
  const fetchDocuments =
    async (loanId) => {
      try {
        const data =
          await getDocuments(loanId)

        setDocuments(data)
      } catch (error) {
        console.log(error)
      }
    }

  // HANDLE LOAN SELECT
  const handleLoanSelect = (id) => {
    setSelectedLoan(id)

    fetchDocuments(id)
  }

  // HANDLE UPLOAD
  const handleUpload = async (e) => {
    e.preventDefault()

    if (!file) return

    try {
      await uploadDocument(
        selectedLoan,
        file
      )

      alert(
        'Document uploaded successfully'
      )

      setFile(null)

      fetchDocuments(selectedLoan)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-8">

        {/* <h1 className="text-3xl font-bold text-slate-800">
          Loan Documents
        </h1> */}

        <p className="text-slate-500 mt-2">
          Upload and manage loan documents
        </p>

      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-sm p-8">

        {/* Loan Select */}
        <div className="mb-6">

          <label className="block mb-2 font-medium text-slate-700">
            Select Loan
          </label>

          <select
            onChange={(e) =>
              handleLoanSelect(
                e.target.value
              )
            }
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
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

        </div>

        {/* Upload */}
        {selectedLoan && (
          <form
            onSubmit={handleUpload}
            className="bg-slate-100 rounded-2xl p-6 mb-8"
          >

            <h2 className="text-xl font-bold mb-4">
              Upload Document
            </h2>

            <input
              type="file"
              onChange={(e) =>
                setFile(
                  e.target.files[0]
                )
              }
              required
              className="w-full mb-4"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Upload
            </button>

          </form>
        )}

        {/* Documents List */}
        {documents.length > 0 && (
          <div>

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Uploaded Documents
            </h2>

            <div className="space-y-4">

              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl p-5 flex items-center justify-between"
                >

                  <div>

                    <h3 className="font-semibold text-slate-800">
                      {doc.fileName}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Uploaded:
                      {' '}
                      {new Date(
                        doc.uploadedAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  {/* Open File */}
                  <a
                    href={`http://localhost:5000/${doc.filePath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl"
                  >
                    View
                  </a>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>

    </DashboardLayout>
  )
}