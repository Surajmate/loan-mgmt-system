import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/repayments'

// GET REPAYMENTS
export const getRepayments =
  async () => {
    const response = await axios.get(
      API_URL
    )

    return response.data
  }

// ADD REPAYMENT
export const addRepayment =
  async (repaymentData) => {
    const response = await axios.post(
      API_URL,
      repaymentData
    )

    return response.data
  }