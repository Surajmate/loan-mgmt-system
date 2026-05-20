import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/notifications'

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

export const getNotifications =
  async () => {

    const response =
      await axios.get(
        API_URL,
        config
      )

    return response.data
  }

export const markAsRead =
  async (id) => {

    const response =
      await axios.put(
        `${API_URL}/read/${id}`,
        {},
        config
      )

    return response.data
  }