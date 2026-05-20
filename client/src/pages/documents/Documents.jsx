import {
  FaFolderOpen,
  FaFileUpload,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaEye,
  FaDownload,
} from 'react-icons/fa'

import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import { getLoans } from '../../services/loanService'

import {
  getDocuments,
  uploadDocument,
  verifyDocument
} from '../../services/documentService'

export default function Documents() {
  const [documentType, setDocumentType] =
    useState('AADHAR')

  const [loans, setLoans] =
    useState([])

  const [selectedLoan, setSelectedLoan] =
    useState('')

  const [documents, setDocuments] =
    useState([])

  const [search, setSearch] =
    useState('')

  const [file, setFile] =
    useState(null)

  // ANALYTICS
  const totalDocuments =
    documents.length

  const verifiedDocuments =
    documents.filter(
      (doc) =>
        doc.status ===
        'VERIFIED'
    ).length

  const pendingDocuments =
    documents.filter(
      (doc) =>
        doc.status ===
        'PENDING'
    ).length

  const rejectedDocuments =
    documents.filter(
      (doc) =>
        doc.status ===
        'REJECTED'
    ).length

  // FILTER
  const filteredDocuments =
    documents.filter((doc) =>
      doc.fileName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )

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
        file,
        documentType
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

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* TOTAL */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-blue-100">
                Total Documents
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {totalDocuments}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaFolderOpen className="text-3xl" />

            </div>

          </div>

        </div>

        {/* VERIFIED */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-emerald-100">
                Verified
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {verifiedDocuments}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaCheckCircle className="text-3xl" />

            </div>

          </div>

        </div>

        {/* PENDING */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-orange-100">
                Pending
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {pendingDocuments}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaClock className="text-3xl" />

            </div>

          </div>

        </div>

        {/* REJECTED */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-6 text-white shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-red-100">
                Rejected
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {rejectedDocuments}
              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <FaFileUpload className="text-3xl" />

            </div>

          </div>

        </div>

      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition p-8">

        {/* LOAN SELECT */}
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
            className="w-full border border-slate-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Rs.{loan.loanAmount}
              </option>
            ))}

          </select>

        </div>

        <select
          value={documentType}
          onChange={(e) =>
            setDocumentType(
              e.target.value
            )
          }
          className="w-full bg-white border border-slate-300 rounded-2xl p-4 mb-5"
        >

          <option value="AADHAR">
            AADHAR
          </option>

          <option value="PAN">
            PAN
          </option>

          <option value="BANK_STATEMENT">
            BANK STATEMENT
          </option>

          <option value="SALARY_SLIP">
            SALARY SLIP
          </option>

          <option value="AGREEMENT">
            AGREEMENT
          </option>

          <option value="PHOTO">
            PHOTO
          </option>

          <option value="OTHER">
            OTHER
          </option>

        </select>

        {/* UPLOAD */}
        {selectedLoan && (
          <form
            onSubmit={handleUpload}
            className="bg-slate-100 rounded-3xl p-6 mb-8"
          >

            <div className="flex items-center gap-3 mb-5">

              <div className="bg-blue-600 text-white p-4 rounded-2xl">

                <FaFileUpload className="text-2xl" />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  Upload Document
                </h2>

                <p className="text-slate-500">
                  Upload KYC or loan
                  related documents
                </p>

              </div>

            </div>

            <input
              type="file"
              onChange={(e) =>
                setFile(
                  e.target.files[0]
                )
              }
              required
              className="w-full bg-white border border-slate-300 rounded-2xl p-4 mb-5"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg transition"
            >
              Upload Document
            </button>

          </form>
        )}

        {/* SEARCH */}
        <div className="bg-slate-50 p-5 rounded-3xl mb-6">

          <div className="relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full border border-slate-300 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>

        {/* DOCUMENTS */}
        {filteredDocuments.length >
          0 ? (
          <div>

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Uploaded Documents
            </h2>

            <div className="space-y-4">

              {filteredDocuments.map(
                (doc, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-3xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:bg-slate-50 transition"
                  >

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                      {/* ICON */}
                      <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">

                        <FaFolderOpen className="text-2xl" />

                      </div>

                      {/* INFO */}
                      <div>

                        <h3 className="font-semibold text-slate-800 text-lg">
                          {doc.documentType}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Date:
                          {' '}
                          {new Date(
                            doc.updatedAt
                          ).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-blue-600 font-semibold mt-1">
                          Document:
                          {doc.fileName}

                        </p>

                        <button
                          onClick={async () => {
                            await verifyDocument(
                              doc._id,
                              'VERIFIED',
                              'Approved'
                            )
                            fetchDocuments(
                              selectedLoan
                            )
                          }}
                          className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold"
                        >
                          Approve
                        </button>
                        &nbsp;
                        <button
                          onClick={async () => {
                            await verifyDocument(
                              doc._id,
                              'REJECTED',
                              'Rejected'
                            )

                            fetchDocuments(
                              selectedLoan
                            )
                          }}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-xl text-sm font-semibold"
                        >
                          Reject
                        </button>

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3 flex-wrap">

                      {/* STATUS */}
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${doc.status ===
                          'VERIFIED'
                          ? 'bg-green-100 text-green-700'
                          : doc.status ===
                            'REJECTED'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-orange-100 text-orange-700'
                          }`}
                      >

                        {doc.status ||
                          'PENDING'}

                      </span>

                      {/* VIEW */}
                      <a
                        href={`http://localhost:5000/${doc.filePath}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-xl transition"
                      >

                        <FaEye />

                      </a>

                      {/* DOWNLOAD */}
                      <a
                        href={`http://localhost:5000/${doc.filePath}`}
                        download
                        className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-3 rounded-xl transition"
                      >

                        <FaDownload />

                      </a>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>
        ) : (
          <div className="text-center py-16">

            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">

              <FaFolderOpen className="text-4xl text-slate-400" />

            </div>

            <h3 className="text-2xl font-bold text-slate-700">
              No Documents Found
            </h3>

            <p className="text-slate-500 mt-2">
              Upload documents to
              manage KYC and loan
              records.
            </p>

          </div>
        )}

      </div>

    </DashboardLayout>
  )
}