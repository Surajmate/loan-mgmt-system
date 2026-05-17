const Loan = require('../models/Loan')

// CREATE LOAN
const createLoan = async (req, res) => {
    try {
        const {
            loanAmount,
            interestRate,
            processingFee,
            insuranceEnabled,
            insuranceAmount,
        } = req.body

        // Interest
        const interest =
            (loanAmount * interestRate) / 100

        // Total payable
        const totalPayable =
            loanAmount + interest

        // Disbursed amount
        const disbursedAmount =
            loanAmount -
            processingFee -
            insuranceAmount

        const today = new Date()

        // Default next due date
        const nextDueDate = new Date()

        // Monthly loans
        if (req.body.tenureMonths > 0) {
            nextDueDate.setMonth(
                nextDueDate.getMonth() + 1
            )
        }

        // Quick loans
        if (req.body.tenureDays > 0) {
            nextDueDate.setDate(
                nextDueDate.getDate() +
                req.body.tenureDays
            )
        }

        const loan = await Loan.create({
            ...req.body,

            totalPayable,

            disbursedAmount,

            outstandingAmount:
                totalPayable,

            nextDueDate,
        })

        res.status(201).json(loan)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

// GET LOANS
const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find()
            .populate('customer')
            .sort({
                createdAt: -1,
            })

        res.json(loans)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

module.exports = {
    createLoan,
    getLoans,
}