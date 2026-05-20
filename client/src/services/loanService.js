import axios from 'axios'

const API_URL =
    'http://localhost:5000/api/loans'

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

// GET LOANS
export const getLoans = async () => {
    const response = await axios.get(
        API_URL,
        config
    )

    return response.data
}

// CREATE LOAN
export const createLoan = async (
    loanData
) => {
    console.log('Creating loan with data:', loanData) // Debug log
    const response = await axios.post(
        API_URL,
        loanData,
        config
    )

    return response.data
}

// GENERATE NOC
export const generateNOC =
    async (loanId) => {
        const response =
            await axios.put(
                `${API_URL}/${loanId}/noc`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                    responseType: 'blob',
                }
            )

        return response.data
    }

export const approveLoan =
    async (
        loanId,
        formData
    ) => {

        const response =
            await axios.put(
                `${API_URL}/approve/${loanId}`,
                formData,
                config
            )

        return response.data
    }