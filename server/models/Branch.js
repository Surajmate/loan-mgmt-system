const mongoose =
  require('mongoose')

const branchSchema =
  new mongoose.Schema({

    branchName: {

      type: String,

      required: true,
    },

    branchCode: {

      type: String,

      required: true,

      unique: true,
    },

    address:
      String,

    city:
      String,

    state:
      String,

    pincode:
      String,

    contactNumber:
      String,

    email:
      String,

    manager: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'Employee',
    },

    isActive: {

      type: Boolean,

      default: true,
    },

  }, {
    timestamps: true,
  })

module.exports =
  mongoose.model(
    'Branch',
    branchSchema
  )