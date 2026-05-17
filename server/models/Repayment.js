const mongoose = require('mongoose')

const repaymentSchema =
  new mongoose.Schema(
    {
      loan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan',
        required: true,
      },

      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
      },

      amountPaid: {
        type: Number,
        required: true,
      },

      penaltyAmount: {
        type: Number,
        default: 0,
      },

      paymentMethod: {
        type: String,
        default: 'CASH',
      },

      remarks: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )

module.exports = mongoose.model(
  'Repayment',
  repaymentSchema
)