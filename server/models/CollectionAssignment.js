const mongoose = require('mongoose')

const assignmentSchema =
  new mongoose.Schema(
    {
      employee: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Employee',

        required: true,
      },

      customer: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Customer',

        required: true,
      },

      loan: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Loan',

        required: true,
      },

      assignedDate: {
        type: Date,
        default: Date.now,
      },

      status: {
        type: String,
        enum: [
          'ASSIGNED',
          'COMPLETED',
        ],
        default: 'ASSIGNED',
      },
    },
    {
      timestamps: true,
    }
  )

module.exports = mongoose.model(
  'CollectionAssignment',
  assignmentSchema
)