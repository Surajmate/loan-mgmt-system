const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
  addCustomer,
  getCustomers,
  getCustomerDetails,
} = require('../controllers/customerController')

const authorizeRoles =
  require(
    '../middleware/roleMiddleware'
  )

router.post('/', protect, addCustomer)

router.get('/', protect, getCustomers)

router.get(
  '/:id/details',

  protect,

  getCustomerDetails
)

module.exports = router