const Loan = require('../models/Loan')

// RESTRUCTURE LOAN
const restructureLoan =
  async (req, res) => {
    try {
      const {
        newEmiAmount,
        newTenureMonths,
        reason,
      } = req.body

      const loan =
        await Loan.findById(
          req.params.loanId
        )

      if (!loan) {
        return res.status(404).json({
          message: 'Loan not found',
        })
      }

      // Save original values
      if (!loan.restructured) {
        loan.originalEmiAmount =
          loan.emiAmount

        loan.originalTenureMonths =
          loan.tenureMonths
      }

      // Update new structure
      loan.emiAmount =
        newEmiAmount

      loan.tenureMonths =
        newTenureMonths

      loan.restructured = true

      loan.restructureReason =
        reason

      await loan.save()

      res.json({
        message:
          'Loan restructured successfully',

        loan,
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

module.exports = {
  restructureLoan,
}