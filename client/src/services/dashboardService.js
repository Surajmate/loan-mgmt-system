import axios from 'axios'

const API_URL =
  'https://loan-mgmt-system.onrender.com/api/dashboard'

const user =
  JSON.parse(
    localStorage.getItem(
      'loanUser'
    )
  )

const config = {
  headers: {
    Authorization:
      `Bearer ${user?.token}`,
  },
}

export const getAnalytics =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/analytics`,
        config
      )

    return response.data
  }