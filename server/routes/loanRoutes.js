const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
  createLoan,
  getLoans,
  generateNOC,
  approveLoan
} = require('../controllers/loanController')

const authorizeRoles =
  require(
    '../middleware/roleMiddleware'
  )

router.post('/', protect, createLoan)

router.get('/', protect, getLoans)

router.put(
  '/:id/noc',
  protect,
  authorizeRoles(
    'ADMIN',
    'MANAGER'
  ),
  generateNOC
)

router.put(
  '/approve/:id',

  protect,

  authorizeRoles(
    'ADMIN',
    'MANAGER'
  ),

  approveLoan
)

module.exports = router