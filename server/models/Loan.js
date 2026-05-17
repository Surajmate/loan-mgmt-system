const mongoose = require('mongoose')

const loanSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },

        loanType: {
            type: String,
            enum: [
                'STANDARD',
                'GROUP',
                'QUICK_LOAN',
            ],
            required: true,
        },

        loanAmount: {
            type: Number,
            required: true,
        },

        interestRate: {
            type: Number,
            required: true,
        },

        processingFee: {
            type: Number,
            default: 0,
        },

        insuranceEnabled: {
            type: Boolean,
            default: false,
        },

        insuranceAmount: {
            type: Number,
            default: 0,
        },

        disbursedAmount: {
            type: Number,
        },

        totalPayable: {
            type: Number,
        },

        tenureMonths: {
            type: Number,
            default: 0,
        },

        tenureDays: {
            type: Number,
            default: 0,
        },

        emiAmount: {
            type: Number,
            default: 0,
        },

        restructured: {
            type: Boolean,
            default: false,
        },

        restructureReason: {
            type: String,
        },

        originalEmiAmount: {
            type: Number,
        },

        originalTenureMonths: {
            type: Number,
        },

        outstandingAmount: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            default: 'ACTIVE',
        },

        nextDueDate: {
            type: Date,
        },

        overdueDays: {
            type: Number,
            default: 0,
        },

        penaltyAmount: {
            type: Number,
            default: 0,
        },

        isOverdue: {
            type: Boolean,
            default: false,
        },

        foreclosureDate: {
            type: Date,
        },

        isForeclosed: {
            type: Boolean,
            default: false,
        },

        documents: [
            {
                fileName: String,
                filePath: String,
                uploadedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model(
    'Loan',
    loanSchema
)