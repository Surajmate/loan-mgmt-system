const express = require('express')

const router = express.Router()

const {
  addEmployee,
  getEmployees,
} = require(
  '../controllers/employeeController'
)

const protect = require(
  '../middleware/authMiddleware'
)

router.post(
  '/',
  protect,
  addEmployee
)

router.get(
  '/',
  protect,
  getEmployees
)

module.exports = router