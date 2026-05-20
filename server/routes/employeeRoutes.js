const express = require(
  'express'
)

const router =
  express.Router()

const {
  createEmployee,
  getEmployees,
} = require(
  '../controllers/employeeController'
)

const protect = require(
  '../middleware/authMiddleware'
)

const authorizeRoles =
  require(
    '../middleware/roleMiddleware'
  )

// CREATE EMPLOYEE
router.post(
  '/',
  protect,
  authorizeRoles(
    'ADMIN'
  ),
  createEmployee
)

// GET EMPLOYEES
router.get(
  '/',
  protect,
  getEmployees
)

module.exports = router