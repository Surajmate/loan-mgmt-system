import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/documents'

// GET DOCUMENTS
export const getDocuments =
  async (loanId) => {
    const response = await axios.get(
      `${API_URL}/${loanId}`
    )

    return response.data
  }

// UPLOAD DOCUMENT
export const uploadDocument =
  async (loanId, file) => {
    const formData = new FormData()

    formData.append('document', file)

    const response = await axios.post(
      `${API_URL}/${loanId}`,
      formData,
      {
        headers: {
          'Content-Type':
            'multipart/form-data',
        },
      }
    )

    return response.data
  }