import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/employees'

// TOKEN
const getToken = () => {
  const user = JSON.parse(
    localStorage.getItem('loanUser')
  )

  return user?.token
}

// GET EMPLOYEES
export const getEmployees =
  async () => {
    const response = await axios.get(
      API_URL,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )

    return response.data
  }

// ADD EMPLOYEE
export const addEmployee =
  async (data) => {
    const response = await axios.post(
      API_URL,
      data,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )

    return response.data
  }