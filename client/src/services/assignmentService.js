import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/assignments'

// TOKEN
const getToken = () => {
  const user = JSON.parse(
    localStorage.getItem('loanUser')
  )

  return user?.token
}

// GET ASSIGNMENTS
export const getAssignments =
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

// CREATE ASSIGNMENT
export const createAssignment =
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

  // COMPLETE ASSIGNMENT
export const completeAssignment =
  async (id) => {
    const response = await axios.put(
      `${API_URL}/${id}/complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )

    return response.data
  }