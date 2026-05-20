import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/restructure'

// TOKEN
const getToken = () => {
  const user = JSON.parse(
    localStorage.getItem('loanUser')
  )

  return user?.token
}

// CONFIG
const config = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
}

// RESTRUCTURE LOAN
export const restructureLoan =
  async (
    loanId,
    data
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${loanId}`,
        data,
        config
      )

    return response.data
  }