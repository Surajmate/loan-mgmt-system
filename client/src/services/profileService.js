import axios from 'axios'

const API_URL =
    'http://localhost:5000/api/profile'

const user =
    JSON.parse(
        localStorage.getItem(
            'loanUser'
        )
    )

const config = {
    headers: {
        Authorization: `Bearer ${user?.token}`,
    },
}

// GET PROFILE
export const getProfile =
    async () => {

        const response =
            await axios.get(
                API_URL,
                config
            )

        return response.data
    }

// UPDATE PROFILE
export const updateProfile =
    async (formData) => {

        const response =
            await axios.put(
                API_URL,
                formData,
                config
            )

        return response.data
    }

// CHANGE PASSWORD
export const changePassword =
    async (formData) => {

        const response =
            await axios.put(
                `${API_URL}/change-password`,
                formData,
                config
            )

        return response.data
    }

export const uploadProfilePicture =
    async (formData) => {

        const response =
            await axios.put(
                `${API_URL}/upload-picture`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                        'Content-Type':
                            'multipart/form-data',
                    },
                }
            )

        return response.data
    }