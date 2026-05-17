const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
  restructureLoan,
} = require(
  '../controllers/restructureController'
)

router.put(
  '/:loanId',
  protect, restructureLoan
)

module.exports = router