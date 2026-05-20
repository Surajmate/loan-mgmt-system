import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth'

// LOGIN
export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
      )

    if (response.data) {

      localStorage.setItem(
        'loanUser',
        JSON.stringify(
          response.data
        )
      )
    }

    return response.data
  }

// LOGOUT
export const logout = () => {

  localStorage.removeItem(
    'loanUser'
  )
}