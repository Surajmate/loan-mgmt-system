const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
  restructureLoan,
} = require(
  '../controllers/restructureController'
)

const authorizeRoles =
  require(
    '../middleware/roleMiddleware'
  )

router.put(
  '/:loanId',
  protect,
  authorizeRoles(
    'ADMIN',
    'MANAGER'
  ), restructureLoan
)

module.exports = router