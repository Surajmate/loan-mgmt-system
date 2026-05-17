const Loan = require('../models/Loan')

// UPLOAD DOCUMENT
const uploadDocument =
  async (req, res) => {
    try {
      const loan =
        await Loan.findById(
          req.params.loanId
        )

      if (!loan) {
        return res.status(404).json({
          message: 'Loan not found',
        })
      }

      loan.documents.push({
        fileName:
          req.file.originalname,

        filePath: req.file.path,
      })

      await loan.save()

      res.json({
        message:
          'Document uploaded successfully',

        documents: loan.documents,
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

// GET DOCUMENTS
const getDocuments = async (req, res) => {
  try {
    const loan =
      await Loan.findById(
        req.params.loanId
      )

    if (!loan) {
      return res.status(404).json({
        message: 'Loan not found',
      })
    }

    res.json(loan.documents)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  uploadDocument,
  getDocuments,
}