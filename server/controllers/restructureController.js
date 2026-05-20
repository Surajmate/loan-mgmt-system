const Loan = require(
  '../models/Loan'
)

const calculateEMI =
  require(
    '../utils/calculateEMI'
  )

// RESTRUCTURE
const restructureLoan =
  async (req, res) => {

    try {

      const {
        restructureType,
      } = req.body

      // FIND LOAN
      const loan =
        await Loan.findById(
          req.params.loanId
        )

      if (!loan) {

        return res
          .status(404)
          .json({
            message:
              'Loan not found',
          })

      }

      // ELIGIBILITY
      if (
        loan.completedEmis < 6
      ) {

        return res
          .status(400)
          .json({
            message:
              'Minimum 6 EMIs required',
          })

      }

      if (
        !loan.partPaymentDone
      ) {

        return res
          .status(400)
          .json({
            message:
              'Part payment required',
          })

      }

      // OUTSTANDING
      const outstanding =
        loan.outstandingAmount

      // SAME INTEREST
      const interestRate =
        loan.interestRate

      // PAID SCHEDULES
      const paidSchedules =
        loan.repaymentSchedule.filter(
          (schedule) =>
            schedule.status ===
            'PAID'
        )

      let newSchedule = []

      let emiAmount =
        loan.emiAmount

      let tenureMonths =
        loan.remainingEmis

      // ==================================
      // REDUCE EMI
      // ==================================

      if (
        restructureType ===
        'REDUCE_EMI'
      ) {

        // INCREASE TENURE
        tenureMonths =
          loan.remainingEmis + 6

        const emiData =
          calculateEMI(
            outstanding,
            interestRate,
            tenureMonths
          )

        emiAmount =
          emiData.emiAmount

        let nextDate =
          new Date()

        newSchedule =
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
                  loan.completedEmis +
                  index +
                  1,

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
      }

      // ==================================
      // REDUCE TENURE
      // ==================================

      if (
        restructureType ===
        'REDUCE_TENURE'
      ) {

        // SAME EMI
        const monthlyRate =
          interestRate /
          12 /
          100

        let outstandingAmount =
          outstanding

        let nextDate =
          new Date()

        let emiNumber =
          loan.completedEmis + 1

        while (
          outstandingAmount > 0
        ) {

          const interestAmount =
            outstandingAmount *
            monthlyRate

          const principalAmount =
            emiAmount -
            interestAmount

          outstandingAmount =
            outstandingAmount -
            principalAmount

          nextDate =
            new Date(
              nextDate.setMonth(
                nextDate.getMonth() + 1
              )
            )

          newSchedule.push({
            emiNumber,

            dueDate:
              new Date(nextDate),

            emiAmount:
              Math.round(
                emiAmount
              ),

            principalAmount:
              Math.round(
                principalAmount
              ),

            interestAmount:
              Math.round(
                interestAmount
              ),

            outstandingAmount:
              Math.max(
                0,
                Math.round(
                  outstandingAmount
                )
              ),

            status:
              'PENDING',
          })

          emiNumber++
        }

        tenureMonths =
          newSchedule.length
      }

      // UPDATE LOAN
      loan.emiAmount =
        emiAmount

      loan.remainingEmis =
        tenureMonths

      loan.tenureMonths =
        loan.completedEmis +
        tenureMonths

      loan.repaymentSchedule = [
        ...paidSchedules,
        ...newSchedule,
      ]

      loan.nextDueDate =
        newSchedule[0]?.dueDate

      // RESET FLAGS
      loan.partPaymentDone =
        false

      loan.partPaymentAmount = 0

      await loan.save()

      res.json({
        success: true,

        message:
          'Loan restructured successfully',

        loan,
      })

    } catch (error) {

      res.status(500).json({
        message: error.message,
      })

    }
  }

module.exports = {
  restructureLoan,
}