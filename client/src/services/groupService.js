import axios from 'axios'

const API_URL =
  'http://localhost:5000/api/groups'

// GET GROUPS
export const getGroups = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

// ADD GROUP
export const addGroup = async (groupData) => {
  const response = await axios.post(
    API_URL,
    groupData
  )

  return response.data
}