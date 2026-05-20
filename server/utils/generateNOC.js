const PDFDocument =
  require('pdfkit')

const path =
  require('path')

const fs =
  require('fs')

const generateNOC = (
  loan,
  customer,
  res
) => {

  // =========================
  // PDF SETUP
  // =========================

  const doc =
    new PDFDocument({
      size: 'A4',
      margin: 0,
    })

  res.setHeader(
    'Content-Type',
    'application/pdf'
  )

  res.setHeader(
    'Content-Disposition',
    `attachment; filename=NOC_${loan._id}.pdf`
  )

  doc.pipe(res)

  // =========================
  // COLORS
  // =========================

  const primary =
    '#2563eb'

  const success =
    '#10b981'

  const lightBlue =
    '#eff6ff'

  const borderBlue =
    '#dbeafe'

  const gray =
    '#64748b'

  const pageWidth = 595

  // =========================
  // HEADER BACKGROUND
  // =========================

  doc
    .rect(
      0,
      0,
      pageWidth,
      120
    )
    .fill(primary)

  // =========================
  // LOGO
  // =========================

  const logoPath =
    path.join(
      __dirname,
      '../assets/logo.png'
    )

  if (
    fs.existsSync(
      logoPath
    )
  ) {

    doc.image(
      logoPath,
      40,
      30,
      {
        width: 55,
      }
    )
  }

  // =========================
  // COMPANY NAME
  // =========================

  doc
    .fillColor('white')
    .font(
      'Helvetica-Bold'
    )
    .fontSize(26)
    .text(
      'Loan ERP Finance Pvt Ltd',
      115,
      42
    )

  // ADDRESS
  doc
    .font(
      'Helvetica'
    )
    .fontSize(10)
    .text(
      'Pune, Maharashtra, India',
      118,
      76
    )

  // =========================
  // TITLE
  // =========================

  doc
    .fillColor(primary)
    .font(
      'Helvetica-Bold'
    )
    .fontSize(23)
    .text(
      'NO OBJECTION CERTIFICATE',
      40,
      150,
      {
        width: 515,
        align: 'center',
      }
    )

  // =========================
  // STATUS BADGE
  // =========================

  // doc
  //   .roundedRect(
  //     420,
  //     145,
  //     120,
  //     32,
  //     8
  //   )
  //   .fill(success)

  // doc
  //   .fillColor('white')
  //   .font(
  //     'Helvetica-Bold'
  //   )
  //   .fontSize(11)
  //   .text(
  //     'LOAN CLOSED',
  //     442,
  //     156
  //   )

  // =========================
  // BODY TEXT
  // =========================

  const bodyText =
    `This is to certify that Mr./Ms. ${customer.fullName} has successfully repaid and closed the loan availed from Loan ERP Finance Pvt Ltd. Therefore, the company confirms that there are no outstanding dues pending against the borrower for the mentioned loan account.`

  doc
    .fillColor('black')
    .font(
      'Helvetica'
    )
    .fontSize(13)
    .text(
      bodyText,
      60,
      215,
      {
        width: 455,
        align: 'justify',
        lineGap: 6,
      }
    )

  // =========================
  // WATERMARK
  // =========================

  doc.save()

  doc.rotate(
    -45,
    {
      origin: [300, 400],
    }
  )

  // doc
  //   .fillColor('#f8fafc')
  //   .font(
  //     'Helvetica-Bold'
  //   )
  //   .fontSize(70)
  //   .text(
  //     'LOAN ERP',
  //     140,
  //     360
  //   )

  doc.restore()

  // =========================
  // DETAILS TABLE
  // =========================

  const details = [

    [
      'Customer Name',
      customer.fullName,
    ],

    [
      'Mobile Number',
      customer.mobile,
    ],

    [
      'Loan No',
      loan._id,
    ],

    [
      'Loan Type',
      loan.loanType,
    ],

    [
      'Loan Amount',

      `Rs.${Number(
        loan.loanAmount || 0
      ).toLocaleString(
        'en-IN'
      )}`,
    ],

    [
      'Loan Status',
      loan.status ||
        'CLOSED',
    ],

    [
      'Closure Date',

      new Date()
        .toLocaleDateString(
          'en-IN'
        ),
    ],

    [
      'Outstanding Amount',
      'Rs.0',
    ],
  ]

  let y = 325

  details.forEach(
    (item) => {

      // LABEL
      doc
        .fillColor(gray)
        .font(
          'Helvetica-Bold'
        )
        .fontSize(11)
        .text(
          item[0],
          65,
          y + 7
        )

      // VALUE BOX
      doc
        .roundedRect(
          210,
          y,
          285,
          24,
          5
        )
        .fillAndStroke(
          lightBlue,
          borderBlue
        )

      // VALUE
      doc
        .fillColor('black')
        .font(
          'Helvetica'
        )
        .fontSize(11)
        .text(
          item[1],
          225,
          y + 7
        )

      y += 38
    }
  )

  // =========================
  // DECLARATION
  // =========================

  doc
    .fillColor(gray)
    .font(
      'Helvetica'
    )
    .fontSize(10)
    .text(
      'This certificate is system generated and does not require physical signature.',
      65,
      620
    )

  // =========================
  // SIGNATURE SECTION
  // =========================

  doc
    .moveTo(
      350,
      680
    )
    .lineTo(
      520,
      680
    )
    .stroke('#94a3b8')

  doc
    .fillColor('black')
    .font(
      'Helvetica-Bold'
    )
    .fontSize(11)
    .text(
      'Authorized Signatory',
      380,
      688
    )

  // =========================
  // FOOTER
  // =========================

  doc
    .moveTo(
      50,
      745
    )
    .lineTo(
      545,
      745
    )
    .stroke('#cbd5e1')

  // LEFT FOOTER
  doc
    .fillColor(gray)
    .font(
      'Helvetica-Bold'
    )
    .fontSize(9)
    .text(
      'Loan ERP Finance Pvt Ltd',
      60,
      758
    )

  doc
    .font(
      'Helvetica'
    )
    .text(
      'support@loanerp.com',
      60,
      772
    )

  // RIGHT FOOTER
  doc
    .font(
      'Helvetica-Bold'
    )
    .text(
      'www.loanerp.com',
      420,
      758
    )

  doc
    .font(
      'Helvetica'
    )
    .text(
      `Generated on ${new Date().toLocaleDateString(
        'en-IN'
      )}`,
      420,
      772
    )

  // =========================
  // END PDF
  // =========================

  doc.end()
}

module.exports =
  generateNOC