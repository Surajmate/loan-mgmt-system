const Repayment = require('../models/Repayment')

const Loan = require('../models/Loan')

// ADD REPAYMENT
const addRepayment =
  async (req, res) => {

    try {

      const {
        loan,
        customer,
        amountPaid,
        paymentMethod,
        remarks,
      } = req.body

      // FIND LOAN
      const existingLoan =
        await Loan.findById(loan)

      if (!existingLoan) {

        return res
          .status(404)
          .json({
            message:
              'Loan not found',
          })

      }

      let remainingPayment =
        Number(amountPaid)

      // PAY EMI SCHEDULES
      for (
        let schedule of existingLoan.repaymentSchedule
      ) {

        // SKIP PAID
        if (
          schedule.status ===
          'PAID'
        ) {
          continue
        }

        // FULL EMI PAYMENT
        if (
          remainingPayment >=
          schedule.emiAmount
        ) {

          remainingPayment =
            remainingPayment -
            schedule.emiAmount

          schedule.status =
            'PAID'

          schedule.paidAt =
            new Date()

          existingLoan.completedEmis += 1

          existingLoan.remainingEmis -= 1

        } else {

          // PART PAYMENT
          schedule.emiAmount =
            schedule.emiAmount -
            remainingPayment

          remainingPayment = 0
        }

        // PAYMENT FINISHED
        if (
          remainingPayment <= 0
        ) {
          break
        }
      }

      // UPDATE OUTSTANDING
      existingLoan.outstandingAmount =
        Math.max(
          0,
          existingLoan.outstandingAmount -
          Number(amountPaid)
        )

      // NEXT DUE
      const nextPending =
        existingLoan.repaymentSchedule.find(
          (schedule) =>
            schedule.status ===
            'PENDING'
        )

      existingLoan.nextDueDate =
        nextPending?.dueDate ||
        null

      existingLoan.lastPaymentDate =
        new Date()

      // CLOSE LOAN
      if (
        existingLoan.outstandingAmount <=
        0
      ) {

        existingLoan.status =
          'CLOSED'

        existingLoan.outstandingAmount = 0
      }

      await existingLoan.save()

      // CREATE REPAYMENT
      const repayment =
        await Repayment.create({
          loan,

          customer,

          amountPaid,

          paymentMethod,

          remarks,
        })

      res.status(201).json(
        repayment
      )

      await createAuditLog({
        req,

        action:
          'Repayment Added',

        entityType:
          'Repayment',

        entityId:
          repayment._id,

        details:
          `Amount: Rs.${amountPaid}`,
      })

    } catch (error) {

      res.status(500).json({
        message: error.message,
      })

    }
  }

// GET REPAYMENTS
const getRepayments =
  async (req, res) => {
    try {
      const repayments =
        await Repayment.find()
          .populate('customer')
          .populate('loan')
          .sort({
            createdAt: -1,
          })

      res.json(repayments)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

module.exports = {
  addRepayment,
  getRepayments,
}