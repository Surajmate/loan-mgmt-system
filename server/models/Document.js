const mongoose = require('mongoose')

const documentSchema =
  new mongoose.Schema(
    {
      loan: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Loan',

        required: true,
      },

      customer: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Customer',
      },

      fileName: {
        type: String,
        required: true,
      },

      filePath: {
        type: String,
        required: true,
      },

      documentType: {
        type: String,

        enum: [
          'AADHAR',
          'PAN',
          'BANK_STATEMENT',
          'SALARY_SLIP',
          'AGREEMENT',
          'PHOTO',
          'OTHER',
        ],

        default: 'OTHER',
      },

      status: {
        type: String,

        enum: [
          'PENDING',
          'VERIFIED',
          'REJECTED',
        ],

        default: 'PENDING',
      },

      remarks: {
        type: String,
      },

      verifiedBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Employee',
      },

      verifiedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  )

module.exports = mongoose.model(
  'Document',
  documentSchema
)