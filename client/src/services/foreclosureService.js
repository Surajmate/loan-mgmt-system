import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/foreclosure'

// CALCULATE
export const calculateForeclosure =
  async (loanId) => {
    const response = await axios.get(
      `${API_URL}/${loanId}`
    )

    return response.data
  }

// CLOSE LOAN
export const closeForeclosure =
  async (loanId) => {
    const response = await axios.put(
      `${API_URL}/${loanId}/close`
    )

    return response.data
  }