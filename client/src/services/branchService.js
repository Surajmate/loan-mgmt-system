import API
    from '../utils/api'

import axios from 'axios'

const API_URL =
    'https://loan-mgmt-system.onrender.com/api/branches'

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

// GET BRANCHES
export const getBranches =
    async () => {

        const response =
            await API.get(
                API_URL,
                config
            )

        return response.data
    }

// CREATE BRANCH
export const createBranch =
    async (data) => {

        const response =
            await API.post(
                API_URL,
                data,
                config
            )

        return response.data
    }

// GET BRANCH DETAILS
export const getBranchDetails =
    async (id) => {

        const response =
            await API.get(
                `${API_URL}/${id}`,
                config
            )

        return response.data
    }

// UPDATE
export const updateBranch =
    async (
        id,
        data
    ) => {

        const response =
            await API.put(
                `${API_URL}/${id}`,
                data,
                config
            )

        return response.data
    }

// DELETE
export const deleteBranch =
    async (id) => {

        const response =
            await API.delete(
                `${API_URL}/${id}`,
                config
            )

        return response.data
    }