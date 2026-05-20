const calculateEMI = (
  principal,
  annualInterestRate,
  tenureMonths
) => {

  // MONTHLY RATE
  const monthlyRate =
    annualInterestRate /
    12 /
    100

  // EMI FORMULA
  const emi =
    principal *
    (
      (
        monthlyRate *
        Math.pow(
          1 + monthlyRate,
          tenureMonths
        )
      ) /
      (
        Math.pow(
          1 + monthlyRate,
          tenureMonths
        ) - 1
      )
    )

  let outstanding =
    principal

  const schedule = []

  for (
    let month = 1;
    month <= tenureMonths;
    month++
  ) {

    // INTEREST
    const interestAmount =
      outstanding *
      monthlyRate

    // PRINCIPAL
    const principalAmount =
      emi -
      interestAmount

    // UPDATE OUTSTANDING
    outstanding =
      outstanding -
      principalAmount

    schedule.push({
      emiNumber: month,

      emiAmount:
        Math.round(emi),

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
            outstanding
          )
        ),
    })
  }

  return {
    emiAmount:
      Math.round(emi),

    schedule,
  }
}

module.exports =
  calculateEMI