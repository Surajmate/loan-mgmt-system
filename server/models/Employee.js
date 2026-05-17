const mongoose = require('mongoose')

const employeeSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
      },

      mobile: {
        type: String,
        required: true,
      },

      role: {
        type: String,

        enum: [
          'MANAGER',
          'COLLECTION_AGENT',
          'AUDITOR',
          'DATA_ENTRY',
        ],

        default:
          'COLLECTION_AGENT',
      },

      branch: {
        type: String,
        default: 'Main Branch',
      },

      status: {
        type: String,
        enum: [
          'ACTIVE',
          'INACTIVE',
        ],
        default: 'ACTIVE',
      },

      joiningDate: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  )

module.exports = mongoose.model(
  'Employee',
  employeeSchema
)