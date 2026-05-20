import axios from 'axios'

const API_URL =
  'http://localhost:5000'

// TOKEN
const getToken = () => {
  const user = JSON.parse(
    localStorage.getItem('loanUser')
  )

  return user?.token
}

// COMMON CONFIG
const config = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
}

// DASHBOARD STATS
export const getDashboardStats =
  async () => {
    const [
      customers,
      loans,
      repayments,
      assignments,
      employees,
    ] = await Promise.all([
      axios.get(
        `${API_URL}/api/customers`,
        config
      ),

      axios.get(
        `${API_URL}/api/loans`,
        config
      ),

      axios.get(
        `${API_URL}/api/repayments`,
        config
      ),

      axios.get(
        `${API_URL}/api/assignments`,
        config
      ),

      axios.get(
        `${API_URL}/api/employees`,
        config
      ),
    ])

    return {
      customers:
        customers.data || [],

      loans: loans.data || [],

      repayments:
        repayments.data || [],

      assignments:
        assignments.data || [],

      employees:
        employees.data || [],
    }
  }