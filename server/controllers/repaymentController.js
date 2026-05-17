const Repayment = require('../models/Repayment')

const Loan = require('../models/Loan')

// ADD REPAYMENT
const addRepayment = async (req, res) => {
  try {
    const {
      loan,
      customer,
      amountPaid,
      penaltyAmount,
      paymentMethod,
      remarks,
    } = req.body

    // Create repayment
    const repayment =
      await Repayment.create({
        loan,
        customer,
        amountPaid,
        penaltyAmount,
        paymentMethod,
        remarks,
      })

    // Find loan
    const existingLoan =
      await Loan.findById(loan)

    // Reduce outstanding
    existingLoan.outstandingAmount =
      existingLoan.outstandingAmount -
      amountPaid

    // Auto close loan
    if (
      existingLoan.outstandingAmount <= 0
    ) {
      existingLoan.status = 'CLOSED'

      existingLoan.outstandingAmount = 0
    }

    await existingLoan.save()

    res.status(201).json(repayment)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// GET REPAYMENTS
const getRepayments = async (req, res) => {
  try {
    const repayments =
      await Repayment.find()
        .populate('loan')
        .populate('customer')
        .sort({
          createdAt: -1,
        })

    res.json(repayments)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  addRepayment,
  getRepayments,
}