const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
  createLoan,
  getLoans,
} = require('../controllers/loanController')

router.post('/', protect, createLoan)

router.get('/', protect, getLoans)

module.exports = router