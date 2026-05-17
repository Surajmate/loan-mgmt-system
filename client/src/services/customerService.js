import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/customers'

// GET CUSTOMERS
export const getCustomers = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

// ADD CUSTOMER
export const addCustomer = async (
  customerData
) => {
  const response = await axios.post(
    API_URL,
    customerData
  )

  return response.data
}