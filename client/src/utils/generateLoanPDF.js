import jsPDF from 'jspdf'

export const generateLoanPDF = (
  loan
) => {
  const doc = new jsPDF()

  // TITLE
  doc.setFontSize(20)

  doc.text(
    'Loan Agreement',
    70,
    20
  )

  // CUSTOMER
  doc.setFontSize(12)

  doc.text(
    `Customer Name: ${loan.customer?.fullName}`,
    20,
    40
  )

  doc.text(
    `Loan Type: ${loan.loanType}`,
    20,
    50
  )

  doc.text(
    `Loan Amount: ₹${loan.loanAmount}`,
    20,
    60
  )

  doc.text(
    `Interest Rate: ${loan.interestRate}%`,
    20,
    70
  )

  doc.text(
    `Total Payable: ₹${loan.totalPayable}`,
    20,
    80
  )

  doc.text(
    `Outstanding Amount: ₹${loan.outstandingAmount}`,
    20,
    90
  )

  // TERMS
  doc.setFontSize(14)

  doc.text(
    'Terms & Conditions',
    20,
    115
  )

  doc.setFontSize(11)

  const terms = `
1. Borrower agrees to repay loan within agreed tenure.

2. Delay in repayment may attract penalties.

3. Lender reserves right for recovery actions.

4. Foreclosure charges may apply for early closure.

5. Restructuring may be allowed in hardship cases.
  `

  doc.text(terms, 20, 125)

  // SIGNATURES
  doc.text(
    'Borrower Signature',
    20,
    220
  )

  doc.text(
    'Authorized Signatory',
    130,
    220
  )

  // SAVE
  doc.save(
    `${loan.customer?.fullName}-loan-agreement.pdf`
  )
}