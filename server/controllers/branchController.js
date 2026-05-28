const Branch =
    require(
        '../models/Branch'
    )

const Employee =
    require(
        '../models/Employee'
    )

const Customer =
    require(
        '../models/Customer'
    )

const Loan =
    require(
        '../models/Loan'
    )

const Repayment =
    require(
        '../models/Repayment'
    )

// CREATE BRANCH
const createBranch =
    async (req, res) => {

        try {

            const branch =
                await Branch.create(
                    req.body
                )

            res.status(201)
                .json(branch)

        } catch (error) {

            res.status(500)
                .json({
                    message:
                        error.message,
                })
        }
    }

// GET BRANCHES
const getBranches =
    async (req, res) => {

        try {

            const branches =
                await Branch.find()
                    .populate(
                        'manager',
                        'fullName'
                    )
                    .sort({
                        createdAt: -1,
                    })

            res.json(
                branches
            )

        } catch (error) {

            res.status(500)
                .json({
                    message:
                        error.message,
                })
        }
    }

// BRANCH DETAILS
const getBranchDetails =
    async (req, res) => {

        try {

            const branch =
                await Branch.findById(
                    req.params.id
                )
                    .populate(
                        'manager',
                        'fullName mobile'
                    )

            if (!branch) {

                return res
                    .status(404)
                    .json({
                        message:
                            'Branch not found',
                    })
            }

            // EMPLOYEES
            const employees =
                await Employee.find({
                    branch:
                        branch._id,
                })

            // CUSTOMERS
            const customers =
                await Customer.find({
                    branch:
                        branch._id,
                })

            const customerIds =
                customers.map(
                    (
                        customer
                    ) =>
                        customer._id
                )

            // LOANS
            const loans =
                await Loan.find({
                    customer: {
                        $in:
                            customerIds,
                    },
                })
                    .populate(
                        'customer',
                        'fullName mobile'
                    )

            const loanIds =
                loans.map(
                    (loan) =>
                        loan._id
                )

            // REPAYMENTS
            const repayments =
                await Repayment.find({
                    loan: {
                        $in:
                            loanIds,
                    },
                })

            // ANALYTICS
            const totalLoanAmount =
                loans.reduce(
                    (
                        sum,
                        loan
                    ) =>
                        sum +
                        loan.loanAmount,
                    0
                )

            const totalOutstanding =
                loans.reduce(
                    (
                        sum,
                        loan
                    ) =>
                        sum +
                        loan.outstandingAmount,
                    0
                )

            const totalCollections =
                repayments.reduce(
                    (
                        sum,
                        repayment
                    ) =>
                        sum +
                        repayment.amountPaid,
                    0
                )

            res.json({

                branch,

                employees,

                customers,

                loans,

                repayments,

                analytics: {

                    totalEmployees:
                        employees.length,

                    totalCustomers:
                        customers.length,

                    totalLoans:
                        loans.length,

                    totalLoanAmount,

                    totalOutstanding,

                    totalCollections,
                },
            })

        } catch (error) {

            res.status(500)
                .json({
                    message:
                        error.message,
                })
        }
    }

// UPDATE BRANCH
const updateBranch =
    async (req, res) => {

        try {

            const branch =
                await Branch.findById(
                    req.params.id
                )

            if (!branch) {

                return res
                    .status(404)
                    .json({
                        message:
                            'Branch not found',
                    })
            }

            Object.assign(
                branch,
                req.body
            )

            await branch.save()

            res.json(branch)

        } catch (error) {

            res.status(500)
                .json({
                    message:
                        error.message,
                })
        }
    }

// DELETE BRANCH
const deleteBranch =
    async (req, res) => {

        try {

            const branch =
                await Branch.findById(
                    req.params.id
                )

            if (!branch) {

                return res
                    .status(404)
                    .json({
                        message:
                            'Branch not found',
                    })
            }

            await branch.deleteOne()

            res.json({
                message:
                    'Branch deleted',
            })

        } catch (error) {

            res.status(500)
                .json({
                    message:
                        error.message,
                })
        }
    }

module.exports = {

    createBranch,

    getBranches,

    getBranchDetails,

    updateBranch,

    deleteBranch,
}