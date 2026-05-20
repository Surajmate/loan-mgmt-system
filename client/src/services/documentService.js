import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/documents'

// TOKEN
const getToken = () => {
  const user = JSON.parse(
    localStorage.getItem('loanUser')
  )

  return user?.token
}

const config = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
}

// GET DOCUMENTS
export const getDocuments =
  async (loanId) => {
    const response =
      await axios.get(
        `${API_URL}/${loanId}`,
        config
      )

    return response.data
  }

// UPLOAD
export const uploadDocument =
  async (
    loanId,
    file,
    documentType
  ) => {
    const formData =
      new FormData()

    formData.append(
      'document',
      file
    )

    formData.append(
      'documentType',
      documentType
    )

    const response =
      await axios.post(
        `${API_URL}/upload/${loanId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type':
              'multipart/form-data',
          },
        }
      )

    return response.data
  }

// VERIFY DOCUMENT
export const verifyDocument =
  async (
    id,
    status,
    remarks
  ) => {
    const response =
      await axios.put(
        `${API_URL}/verify/${id}`,
        {
          status,
          remarks,
        },
        config
      )

    return response.data
  }