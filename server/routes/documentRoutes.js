const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const upload = require('../config/multer')

const {
  uploadDocument,
  getDocuments,
} = require(
  '../controllers/documentController'
)

router.post(
  '/:loanId',
  upload.single('document'),
  protect,
  uploadDocument
)

router.get(
  '/:loanId',
  protect,
  getDocuments
)

module.exports = router