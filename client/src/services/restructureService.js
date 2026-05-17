import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/restructure'

// RESTRUCTURE LOAN
export const restructureLoan =
  async (loanId, data) => {
    const response = await axios.put(
      `${API_URL}/${loanId}`,
      data
    )

    return response.data
  }