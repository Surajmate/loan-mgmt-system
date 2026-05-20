import jsPDF from 'jspdf'

import autoTable
from 'jspdf-autotable'

import company
from '../config/company'

import logo
from '../assets/logo.png'

const generateSOA = (
  customer,
  loans,
  repayments
) => {

  const doc =
    new jsPDF()

  // LOGO
  doc.addImage(
    logo,
    'PNG',
    14,
    10,
    25,
    25
  )

  // COMPANY
  doc.setFontSize(22)

  doc.setTextColor(
    37,
    99,
    235
  )

  doc.text(
    company.name,
    45,
    18
  )

  doc.setFontSize(10)

  doc.setTextColor(
    100
  )

  doc.text(
    company.address,
    45,
    26
  )

  doc.text(
    `Phone: ${company.phone}`,
    45,
    32
  )

  doc.text(
    `Email: ${company.email}`,
    45,
    38
  )

  // TITLE
  doc.setFontSize(18)

  doc.setTextColor(
    0
  )

  doc.text(
    'Statement Of Account',
    14,
    55
  )

  // CUSTOMER DETAILS
  autoTable(doc, {
    startY: 65,

    theme: 'grid',

    head: [[
      'Customer Details',
      '',
    ]],

    body: [
      [
        'Name',
        customer.fullName,
      ],

      [
        'Mobile',
        customer.mobile,
      ],

      [
        'Email',
        customer.email ||
          '-',
      ],

      [
        'Address',
        customer.address ||
          '-',
      ],

      [
        'PAN',
        customer.panNumber ||
          '-',
      ],
    ],
  })

  // LOAN DETAILS
  autoTable(doc, {
    startY:
      doc.lastAutoTable
        .finalY + 10,

    head: [[
      'Loan Type',
      'Loan Amount',
      'Outstanding',
      'Interest',
      'Status',
    ]],

    body: loans.map(
      (loan) => [

        loan.loanType,

        `Rs.${loan.loanAmount}`,

        `Rs.${loan.outstandingAmount}`,

        `${loan.interestRate}%`,

        loan.status,
      ]
    ),
  })

  // REPAYMENTS
  autoTable(doc, {
    startY:
      doc.lastAutoTable
        .finalY + 10,

    head: [[
      'Date',
      'Loan',
      'Amount',
      'Method',
    ]],

    body:
      repayments.map(
        (
          repayment
        ) => [

          new Date(
            repayment.createdAt
          ).toLocaleDateString(),

          repayment.loan
            ?.loanType,

          `Rs.${repayment.amountPaid}`,

          repayment.paymentMethod,
        ]
      ),
  })

  // FOOTER
  doc.setFontSize(10)

  doc.setTextColor(
    120
  )

  doc.text(
    'This is system generated statement.',
    14,
    285
  )

  doc.text(
    company.website,
    160,
    285
  )

  doc.save(
    `${customer.fullName}_SOA.pdf`
  )
}

export default generateSOA