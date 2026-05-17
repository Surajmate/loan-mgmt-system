const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      unique: true,
    },

    groupCode: {
      type: String,
      required: true,
      unique: true,
    },

    leader: {
      type: String,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
      },
    ],

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
  'Group',
  groupSchema
)