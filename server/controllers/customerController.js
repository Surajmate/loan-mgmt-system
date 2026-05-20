const Customer = require('../models/Customer')

const Loan = require(
  '../models/Loan'
)

const Repayment = require(
  '../models/Repayment'
)

const Document = require(
  '../models/Document'
)

const AuditLog = require(
  '../models/AuditLog'
)

// ADD CUSTOMER
const addCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(
      req.body
    )

    res.status(201).json(customer)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// GET CUSTOMERS
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().lean().sort({
      createdAt: -1,
    })

    res.json(customers)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// CUSTOMER DETAILS
// CUSTOMER DETAILS
const getCustomerDetails =
  async (req, res) => {

    try {

      console.log(
        'Fetching customer'
      )

      const customer =
        await Customer.findById(
          req.params.id
        ).lean()

      if (!customer) {

        return res
          .status(404)
          .json({
            message:
              'Customer not found',
          })

      }

      console.log(
        'Customer fetched'
      )

      // LOANS
      const loans =
        await Loan.find({
          customer:
            customer._id,
        })
          .lean()
          .sort({
            createdAt: -1,
          })

      console.log(
        'Loans fetched'
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
            $in: loanIds,
          },
        })
          .populate({
            path: 'loan',

            select:
              'loanType loanAmount',

            populate: {
              path: 'customer',

              select:
                'fullName mobile',
            },
          })
          .lean()
          .sort({
            createdAt: -1,
          })

      console.log(
        'Repayments fetched'
      )

      // DOCUMENTS
      const documents =
        await Document.find({
          customer:
            customer._id,
        }).lean()

      console.log(
        'Documents fetched'
      )

      // AUDIT LOGS
      let auditLogs = []

      try {

        auditLogs =
          await AuditLog.find({
            entityType:
              'Loan',

            entityId: {
              $in: loanIds,
            },
          })
            .populate(
              'user',
              'username role'
            )
            .lean()
            .sort({
              createdAt: -1,
            })
            .limit(50)

        console.log(
          'Audit logs fetched'
        )

      } catch (error) {

        console.log(
          'Audit log error:',
          error.message
        )

      }

      // FINAL RESPONSE
      res.json({
        customer,

        loans,

        repayments,

        documents,

        auditLogs,
      })

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })

    }
  }

module.exports = {
  addCustomer,
  getCustomers,
  getCustomerDetails,
}