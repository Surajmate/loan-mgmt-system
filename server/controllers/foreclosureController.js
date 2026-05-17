const Loan = require('../models/Loan')
const Repayment = require('../models/Repayment')

// CALCULATE FORECLOSURE
const calculateForeclosure =
  async (req, res) => {
    try {
      const loan =
        await Loan.findById(
          req.params.loanId
        ).populate('customer')

      if (!loan) {
        return res.status(404).json({
          message: 'Loan not found',
        })
      }

      // Example additional foreclosure charge
      const foreclosureCharge =
        loan.outstandingAmount * 0.02

      // Final amount
      const foreclosureAmount =
        loan.outstandingAmount +
        foreclosureCharge

      res.json({
        customer:
          loan.customer.fullName,

        loanAmount: loan.loanAmount,

        outstanding:
          loan.outstandingAmount,

        foreclosureCharge,

        foreclosureAmount,
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

// CLOSE FORECLOSURE
const closeForeclosure =
  async (req, res) => {
    try {
      const loan =
        await Loan.findById(
          req.params.loanId
        )

      if (!loan) {
        return res.status(404).json({
          message: 'Loan not found',
        })
      }

      // Foreclosure charge
      const foreclosureCharge =
        loan.outstandingAmount * 0.02

      // Final settlement
      const foreclosureAmount =
        loan.outstandingAmount +
        foreclosureCharge

      // CREATE REPAYMENT ENTRY
      await Repayment.create({
        loan: loan._id,

        customer: loan.customer,

        amountPaid:
          foreclosureAmount,

        penaltyAmount:
          foreclosureCharge,

        paymentMethod:
          'FORECLOSURE',

        remarks:
          'Loan foreclosure settlement',
      })

      // CLOSE LOAN
      loan.status = 'CLOSED'

      loan.isForeclosed = true

      loan.foreclosureDate = new Date()

      loan.outstandingAmount = 0

      await loan.save()

      res.json({
        message:
          'Loan foreclosed successfully',

        foreclosureAmount,
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

module.exports = {
  calculateForeclosure,
  closeForeclosure,
}