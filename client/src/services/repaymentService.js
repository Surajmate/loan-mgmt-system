import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/repayments'

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

// GET REPAYMENTS
export const getRepayments =
  async () => {
    const response = await axios.get(
      API_URL,
      config
    )

    return response.data
  }

// ADD REPAYMENT
export const addRepayment =
  async (data) => {
    const response = await axios.post(
      API_URL,
      data,
      config
    )

    return response.data
  }