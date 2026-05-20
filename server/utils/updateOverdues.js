const Loan = require('../models/Loan')

const updateOverdues =
  async () => {
    try {
      const today = new Date()

      const loans = await Loan.find({
        status: 'ACTIVE',
      })

      for (const loan of loans) {
        // Skip if no due date
        if (!loan.nextDueDate)
          continue

        // Difference
        const diffTime =
          today -
          new Date(
            loan.nextDueDate
          )

        const overdueDays =
          Math.floor(
            diffTime /
              (1000 *
                60 *
                60 *
                24)
          )

        // OVERDUE
        if (overdueDays > 0) {
          loan.isOverdue = true

          loan.overdueDays =
            overdueDays

          // Rs.50/day penalty
          loan.penaltyAmount =
            overdueDays * 50
        } else {
          loan.isOverdue = false

          loan.overdueDays = 0

          loan.penaltyAmount = 0
        }

        await loan.save()
      }

      console.log(
        'Overdue update completed'
      )
    } catch (error) {
      console.log(error)
    }
  }

module.exports = updateOverdues