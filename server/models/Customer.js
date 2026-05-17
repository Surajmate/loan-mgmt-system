const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    aadhaar: {
      type: String,
    },

    pan: {
      type: String,
    },

    occupation: {
      type: String,
    },

    groupName: {
      type: String,
    },

    status: {
      type: String,
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(
  'Customer',
  customerSchema
)