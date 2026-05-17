const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
  calculateForeclosure,
  closeForeclosure,
} = require(
  '../controllers/foreclosureController'
)

router.get(
  '/:loanId',
  protect,
  calculateForeclosure
)

router.put(
  '/:loanId/close',
  protect,
  closeForeclosure
)

module.exports = router