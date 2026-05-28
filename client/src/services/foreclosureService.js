import axios from 'axios'

const API_URL =
  'https://loan-mgmt-system.onrender.com/api/foreclosure'

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

// CALCULATE
export const calculateForeclosure =
  async (loanId) => {
    const response = await axios.get(
      `${API_URL}/${loanId}`,
      config
    )

    return response.data
  }

// CLOSE LOAN
export const closeForeclosure =
  async (loanId) => {
    const response = await axios.put(
      `${API_URL}/${loanId}/close`,
      config
    )

    return response.data
  }