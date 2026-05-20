const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
  calculateForeclosure,
  closeForeclosure,
} = require(
  '../controllers/foreclosureController'
)

const authorizeRoles =
  require(
    '../middleware/roleMiddleware'
  )

router.get(
  '/:loanId',
  protect,
  calculateForeclosure
)

router.put(
  '/:loanId/close',
  protect,
  authorizeRoles(
    'ADMIN',
    'MANAGER'
  ),
  closeForeclosure
)



module.exports = router