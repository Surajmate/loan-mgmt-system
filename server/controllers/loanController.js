const Loan = require(
    '../models/Loan'
)

const calculateEMI =
    require(
        '../utils/calculateEMI'
    )

const generateNOCPdf = require(
    '../utils/generateNOC'
)

const createAuditLog =
    require(
        '../utils/auditLogger'
    )

const createNotification =
    require(
        '../utils/createNotification'
    )

// CREATE LOAN
const createLoan = async (req, res) => {
    try {
        const {
            customer,
            loanType,
            loanAmount,
            interestRate,
            processingFee,
            insuranceEnabled,
            tenureMonths,
            tenureDays,
            insuranceAmount,
        } = req.body

        // DISBURSED AMOUNT
        const disbursedAmount =
            Number(loanAmount) -
            Number(processingFee || 0) -
            Number(insuranceAmount || 0)

        // EMI VARIABLES
        let emiAmount = 0

        let totalPayable = 0

        let repaymentSchedule = []

        // NEXT DUE DATE
        let nextDueDate =
            new Date()

        // ===================================
        // MONTHLY EMI LOANS
        // ===================================

        if (
            tenureMonths &&
            tenureMonths > 0
        ) {

            // EMI ENGINE
            const emiData =
                calculateEMI(
                    Number(loanAmount),
                    Number(interestRate),
                    Number(tenureMonths)
                )

            emiAmount =
                emiData.emiAmount

            let nextDate =
                new Date()

            repaymentSchedule =
                emiData.schedule.map(
                    (
                        item,
                        index
                    ) => {

                        nextDate =
                            new Date(
                                nextDate.setMonth(
                                    nextDate.getMonth() + 1
                                )
                            )

                        return {
                            emiNumber:
                                item.emiNumber,

                            dueDate:
                                new Date(nextDate),

                            emiAmount:
                                item.emiAmount,

                            principalAmount:
                                item.principalAmount,

                            interestAmount:
                                item.interestAmount,

                            outstandingAmount:
                                item.outstandingAmount,

                            status:
                                'PENDING',
                        }
                    }
                )

            totalPayable =
                repaymentSchedule.reduce(
                    (sum, item) =>
                        sum +
                        item.emiAmount,
                    0
                )

            nextDueDate =
                repaymentSchedule[0]
                    ?.dueDate
        }

        // ===================================
        // QUICK / DAILY LOANS
        // ===================================

        if (
            tenureDays &&
            tenureDays > 0
        ) {

            const interest =
                (
                    Number(loanAmount) *
                    Number(interestRate)
                ) / 100

            totalPayable =
                Number(loanAmount) +
                Number(interest)

            emiAmount =
                Math.round(
                    totalPayable /
                    tenureDays
                )

            let outstanding =
                totalPayable

            let nextDate =
                new Date()

            for (
                let i = 1;
                i <= tenureDays;
                i++
            ) {

                nextDate =
                    new Date(
                        nextDate.setDate(
                            nextDate.getDate() + 1
                        )
                    )

                outstanding =
                    outstanding -
                    emiAmount

                repaymentSchedule.push({
                    emiNumber: i,

                    dueDate:
                        new Date(nextDate),

                    emiAmount,

                    principalAmount:
                        emiAmount,

                    interestAmount: 0,

                    outstandingAmount:
                        Math.max(
                            0,
                            Math.round(
                                outstanding
                            )
                        ),

                    status:
                        'PENDING',
                })
            }

            nextDueDate =
                repaymentSchedule[0]
                    ?.dueDate
        }

        // CREATE LOAN
        const loan =
            await Loan.create({
                customer,

                loanType,

                loanAmount,

                interestRate,

                processingFee,

                insuranceEnabled,

                insuranceAmount,

                tenureMonths,

                tenureDays,

                emiAmount,

                totalPayable,

                disbursedAmount,

                outstandingAmount:
                    totalPayable,

                emiStartDate:
                    new Date(),

                nextDueDate,

                completedEmis: 0,

                remainingEmis:
                    repaymentSchedule.length,

                repaymentSchedule,

                approvalStatus:
                    'PENDING',
            })

        res.status(201).json(
            loan
        )

    } catch (error) {

        res.status(500).json({
            message: error.message,
        })

    }
}

// GENERATE NOC
const generateNOC =
    async (req, res) => {
        try {
            const loan =
                await Loan.findById(
                    req.params.id
                ).populate('customer')

            if (!loan) {
                return res
                    .status(404)
                    .json({
                        message:
                            'Loan not found',
                    })
            }

            if (
                loan.outstandingAmount >
                0
            ) {
                return res
                    .status(400)
                    .json({
                        message:
                            'Loan still active',
                    })
            }

            loan.nocGenerated = true

            loan.nocGeneratedAt =
                new Date()

            await loan.save()

            // GENERATE PDF
            generateNOCPdf(
                loan,
                loan.customer,
                res
            )
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    }

// GET LOANS
const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find()
            .populate('customer')
            .sort({
                createdAt: -1,
            })

        res.json(loans)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

// APPROVE LOAN
const approveLoan =
    async (req, res) => {

        try {

            const {
                approvalStatus,
                approvalRemarks,
            } = req.body

            const loan =
                await Loan.findById(
                    req.params.id
                )

            if (!loan) {

                return res
                    .status(404)
                    .json({
                        message:
                            'Loan not found',
                    })

            }

            loan.approvalStatus =
                approvalStatus

            loan.approvalRemarks =
                approvalRemarks

            loan.approvedBy =
                req.user._id

            loan.approvedAt =
                new Date()

            await loan.save()

            await createNotification({
                user:
                    loan.customer,

                title:
                    'Loan Update',

                message:
                    `Your loan has been ${approvalStatus.toLowerCase()}`,

                type:
                    approvalStatus ===
                        'APPROVED'
                        ? 'SUCCESS'
                        : 'ERROR',

                link:
                    '/loans',
            })

            await createAuditLog({
                req,

                action:
                    `Loan ${approvalStatus}`,

                entityType: 'Loan',

                entityId: loan._id,

                details:
                    approvalRemarks,
            })

            res.json({
                success: true,

                message:
                    `Loan ${approvalStatus.toLowerCase()} successfully`,
            })

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            })

        }
    }

module.exports = {
    createLoan,
    getLoans,
    generateNOC,
    approveLoan
}