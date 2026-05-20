import jsPDF from 'jspdf'

import autoTable
from 'jspdf-autotable'

import company
from '../config/company'

import logo
from '../assets/logo.png'

const generateReceipt = (
  repayment
) => {

  const doc =
    new jsPDF()

  // PAGE WIDTH
  const pageWidth =
    doc.internal
      .pageSize
      .width

  // BACKGROUND HEADER
  doc.setFillColor(
    37,
    99,
    235
  )

  doc.rect(
    0,
    0,
    pageWidth,
    45,
    'F'
  )

  // LOGO
  doc.addImage(
    logo,
    'PNG',
    15,
    8,
    28,
    28
  )

  // COMPANY NAME
  doc.setFontSize(24)

  doc.setTextColor(
    255,
    255,
    255
  )

  doc.text(
    company.name,
    50,
    22
  )

  doc.setFontSize(10)

  doc.text(
    company.address,
    50,
    30
  )

  doc.text(
    `${company.phone} | ${company.email}`,
    50,
    36
  )

  // RECEIPT TITLE
  doc.setFontSize(22)

  doc.setTextColor(
    30
  )

  doc.text(
    'PAYMENT RECEIPT',
    14,
    65
  )

  // RECEIPT BADGE
  doc.setFillColor(
    16,
    185,
    129
  )

  doc.roundedRect(
    150,
    55,
    40,
    12,
    3,
    3,
    'F'
  )

  doc.setFontSize(10)

  doc.setTextColor(
    255,
    255,
    255
  )

  doc.text(
    'PAID',
    165,
    63
  )

  // CUSTOMER + PAYMENT DETAILS
  autoTable(doc, {

    startY: 75,

    theme: 'grid',

    headStyles: {
      fillColor: [
        37,
        99,
        235,
      ],
    },

    styles: {
      fontSize: 11,
      cellPadding: 5,
    },

    head: [[
      'Field',
      'Details',
    ]],

    body: [

      [
        'Receipt ID',
        repayment._id,
      ],

      [
        'Customer Name',

        repayment.loan?.customer
          ?.fullName ||

        repayment.loan
          ?.customerName ||

        '-',
      ],

      [
        'Mobile Number',

        repayment.loan?.customer
          ?.mobile ||

        '-',
      ],

      [
        'Loan Type',

        repayment.loan
          ?.loanType ||

        '-',
      ],

      [
        'Loan Amount',

        `Rs.${Number(
          repayment.loan
            ?.loanAmount || 0
        ).toLocaleString(
          'en-IN'
        )}`,
      ],

      [
        'Amount Paid',

        `Rs.${Number(
          repayment.amountPaid
        ).toLocaleString(
          'en-IN'
        )}`,
      ],

      [
        'Payment Method',

        repayment.paymentMethod,
      ],

      [
        'Transaction Date',

        new Date(
          repayment.createdAt
        ).toLocaleString(),
      ],
    ],
  })

  // PAYMENT SUMMARY BOX
  const finalY =
    doc.lastAutoTable
      .finalY + 20

  doc.setFillColor(
    239,
    246,
    255
  )

  doc.roundedRect(
    14,
    finalY,
    182,
    30,
    5,
    5,
    'F'
  )

  doc.setFontSize(12)

  doc.setTextColor(
    37,
    99,
    235
  )

  doc.text(
    'Payment Summary',
    20,
    finalY + 10
  )

  doc.setFontSize(18)

  doc.setTextColor(
    16,
    185,
    129
  )

  doc.text(
    `Rs.${Number(
      repayment.amountPaid
    ).toLocaleString(
      'en-IN'
    )}`,
    20,
    finalY + 22
  )

  // SIGNATURE
  doc.setFontSize(11)

  doc.setTextColor(
    100
  )

  doc.text(
    'Authorized Signature',
    140,
    240
  )

  doc.line(
    135,
    235,
    190,
    235
  )

  // FOOTER
  doc.setDrawColor(
    220
  )

  doc.line(
    14,
    270,
    196,
    270
  )

  doc.setFontSize(9)

  doc.setTextColor(
    120
  )

  doc.text(
    'This is a system-generated payment receipt.',
    14,
    278
  )

  doc.text(
    company.website,
    160,
    278
  )

  // SAVE
  doc.save(
    `Receipt_${repayment._id}.pdf`
  )
}

export default generateReceipt