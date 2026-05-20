import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/customers'

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

// GET CUSTOMERS
export const getCustomers =
  async () => {
    const response = await axios.get(
      API_URL,
      config
    )

    return response.data
  }

// ADD CUSTOMER
export const addCustomer =
  async (customerData) => {
    const response = await axios.post(
      API_URL,
      customerData,
      config
    )

    return response.data
  }

export const getCustomerDetails =
  async (id) => {

    const response =
      await axios.get(
        `${API_URL}/${id}/details`,
        config
      )

    return response.data
  }