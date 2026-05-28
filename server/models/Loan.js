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

        emiStartDate: {
            type: Date,
        },

        nextDueDate: {
            type: Date,
        },

        lastPaymentDate: {
            type: Date,
        },

        completedEmis: {
            type: Number,
            default: 0,
        },

        remainingEmis: {
            type: Number,
            default: 0,
        },

        penaltyAmount: {
            type: Number,
            default: 0,
        },

        nocGenerated: {
            type: Boolean,
            default: false,
        },

        nocGeneratedAt: {
            type: Date,
        },

        repaymentSchedule: [
            {
                emiNumber: Number,

                dueDate: Date,

                emiAmount: Number,

                principalAmount: Number,

                interestAmount: Number,

                outstandingAmount: Number,

                status: {
                    type: String,

                    enum: [
                        'PENDING',
                        'PAID',
                        'OVERDUE',
                    ],

                    default: 'PENDING',
                },

                paidAt: Date,
            },
        ],

        partPaymentDone: {
            type: Boolean,
            default: false,
        },

        partPaymentAmount: {
            type: Number,
            default: 0,
        },

        lastPartPaymentDate: {
            type: Date,
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

        approvalStatus: {
            type: String,

            enum: [
                'PENDING',
                'APPROVED',
                'REJECTED',
            ],

            default: 'PENDING',
        },

        approvalRemarks: {
            type: String,
        },

        branch: {
            type:
                mongoose.Schema.Types.ObjectId,

            ref: 'Branch',
        },

        approvedBy: {
            type:
                mongoose.Schema.Types.ObjectId,

            ref: 'User',
        },

        approvedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model(
    'Loan',
    loanSchema
)