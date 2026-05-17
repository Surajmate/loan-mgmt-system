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

// GET LOANS
export const getLoans = async () => {
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

// CREATE LOAN
export const createLoan = async (
    loanData
) => {
    const response = await axios.post(
        API_URL,
        loanData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    )

    return response.data
}