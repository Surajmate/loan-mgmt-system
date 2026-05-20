const mongoose = require('mongoose')

const employeeSchema =
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
      },

      employeeId: {
        type: String,
        unique: true,
      },

      email: {
        type: String,
      },

      mobile: {
        type: String,
      },

      role: {
        type: String,

        enum: [
          'ADMIN',
          'MANAGER',
          'COLLECTION_AGENT',
          'FIELD_OFFICER',
          'ACCOUNTANT',
          'VERIFIER',
          'AUDITOR',
        ],

        default:
          'COLLECTION_AGENT',
      },

      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'User',
      },

      department: {
        type: String,
      },

      branch: {
        type: String,
      },

      joiningDate: {
        type: Date,
        default: Date.now,
      },

      salary: {
        type: Number,
        default: 0,
      },

      incentive: {
        type: Number,
        default: 0,
      },

      assignedLoans: [
        {
          type:
            mongoose.Schema.Types.ObjectId,

          ref: 'Loan',
        },
      ],

      assignedCustomers: [
        {
          type:
            mongoose.Schema.Types.ObjectId,

          ref: 'Customer',
        },
      ],

      totalCollections: {
        type: Number,
        default: 0,
      },

      recoveryRate: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,

        enum: [
          'ACTIVE',
          'INACTIVE',
        ],

        default: 'ACTIVE',
      },

      profilePicture: {
        type: String,
      },

      dateOfBirth: {
        type: Date,
      },

      address: {
        type: String,
      },

      gender: {
        type: String,
      },

      manager: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Employee',
      },

      attendance: [
        {
          date: Date,

          status: {
            type: String,

            enum: [
              'PRESENT',
              'ABSENT',
              'HALF_DAY',
              'LEAVE',
            ],

            default: 'PRESENT',
          },
        },
      ],

      leaves: [
        {
          fromDate: Date,

          toDate: Date,

          reason: String,

          status: {
            type: String,

            enum: [
              'PENDING',
              'APPROVED',
              'REJECTED',
            ],

            default: 'PENDING',
          },
        },
      ],
    },
    {
      timestamps: true,
    }
  )

module.exports = mongoose.model(
  'Employee',
  employeeSchema
)