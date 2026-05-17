import axios from 'axios'

const API_URL =
  'http://localhost:5000'

// DASHBOARD DATA
export const getDashboardStats =
  async () => {
    const [
      customers,
      loans,
      repayments,
    ] = await Promise.all([
      axios.get(`${API_URL}/api/customers`),
      axios.get(`${API_URL}/api/loans`),
      axios.get(
        `${API_URL}/api/repayments`
      ),
    ])

    return {
      customers:
        customers.data || [],

      loans: loans.data || [],

      repayments:
        repayments.data || [],
    }
  }