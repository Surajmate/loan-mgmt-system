const Document = require(
  '../models/Document'
)

const Loan = require(
  '../models/Loan'
)

// UPLOAD DOCUMENT
const uploadDocument =
  async (req, res) => {
    try {
      const { loan } = req.params

      const {
        documentType,
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

      const document =
        await Document.create({
          loan,

          customer:
            existingLoan.customer,

          fileName:
            req.file.filename,

          filePath:
            req.file.path,

          documentType:
            documentType ||
            'OTHER',
        })

      res.status(201).json(
        document
      )
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

// GET DOCUMENTS
const getDocuments =
  async (req, res) => {
    try {
      const documents =
        await Document.find({
          loan: req.params.loan,
        })
          .populate('customer')
          .populate('loan')
          .sort({
            createdAt: -1,
          })

      res.json(documents)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

// VERIFY DOCUMENT
const verifyDocument =
  async (req, res) => {
    try {
      const {
        status,
        remarks,
      } = req.body

      const document =
        await Document.findById(
          req.params.id
        )

      if (!document) {
        return res
          .status(404)
          .json({
            message:
              'Document not found',
          })
      }

      document.status = status

      document.remarks =
        remarks

      document.verifiedAt =
        new Date()

      await document.save()

      res.json(document)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

module.exports = {
  uploadDocument,
  getDocuments,
  verifyDocument,
}