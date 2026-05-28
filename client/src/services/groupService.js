import axios from 'axios'

const API_URL =
  'https://loan-mgmt-system.onrender.com/api/groups'

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

// GET GROUPS
export const getGroups = async () => {
  const response = await axios.get(API_URL, config)

  return response.data
}

// ADD GROUP
export const addGroup = async (groupData) => {
  const response = await axios.post(
    API_URL,
    groupData,
    config
  )

  return response.data
}