const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
  addRepayment,
  getRepayments,
} = require('../controllers/repaymentController')

const authorizeRoles =
  require(
    '../middleware/roleMiddleware'
  )

router.post('/', protect, addRepayment)

router.get('/', protect, getRepayments)

module.exports = router