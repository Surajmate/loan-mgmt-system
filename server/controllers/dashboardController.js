const Loan = require(
  '../models/Loan'
)

const Customer = require(
  '../models/Customer'
)

const Employee = require(
  '../models/Employee'
)

const Repayment = require(
  '../models/Repayment'
)

const getDashboardAnalytics =
  async (req, res) => {

    try {

      // LOANS
      const totalLoans =
        await Loan.countDocuments()

      const activeLoans =
        await Loan.countDocuments({
          status: 'ACTIVE',
        })

      const closedLoans =
        await Loan.countDocuments({
          status: 'CLOSED',
        })

      // CUSTOMERS
      const totalCustomers =
        await Customer.countDocuments()

      // EMPLOYEES
      const totalEmployees =
        await Employee.countDocuments()

      // COLLECTIONS
      const repayments =
        await Repayment.find()

      const totalCollections =
        repayments.reduce(
          (sum, item) =>
            sum +
            item.amountPaid,
          0
        )

      // OVERDUE
      const overdueLoans =
        await Loan.countDocuments({
          nextDueDate: {
            $lt: new Date(),
          },

          outstandingAmount: {
            $gt: 0,
          },
        })

      // MONTHLY COLLECTIONS
      const monthlyCollections =
        await Repayment.aggregate([
          {
            $group: {
              _id: {
                month: {
                  $month:
                    '$createdAt',
                },
              },

              total: {
                $sum:
                  '$amountPaid',
              },
            },
          },

          {
            $sort: {
              '_id.month': 1,
            },
          },
        ])

      // LOAN STATUS
      const loanStatus =
        await Loan.aggregate([
          {
            $group: {
              _id: '$status',

              count: {
                $sum: 1,
              },
            },
          },
        ])

      res.json({
        totalLoans,

        activeLoans,

        closedLoans,

        totalCustomers,

        totalEmployees,

        totalCollections,

        overdueLoans,

        monthlyCollections,

        loanStatus,
      })

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })

    }
  }

module.exports = {
  getDashboardAnalytics,
}