const express = require('express')

const router = express.Router()

const {
  uploadDocument,
  getDocuments,
  verifyDocument,
} = require(
  '../controllers/documentController'
)

const protect = require(
  '../middleware/authMiddleware'
)

const upload = require(
  '../config/multer'
)

const authorizeRoles =
  require(
    '../middleware/roleMiddleware'
  )

// UPLOAD DOCUMENT
router.post(
  '/upload/:loan',
  protect,
  upload.single('document'),
  uploadDocument
)

// GET DOCUMENTS
router.get(
  '/:loan',
  protect,
  getDocuments
)

// VERIFY DOCUMENT
router.put(
  '/verify/:id',
  protect,
  authorizeRoles(
    'ADMIN',
    'MANAGER'
  ),
  verifyDocument
)

module.exports = router