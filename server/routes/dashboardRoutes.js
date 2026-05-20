const express = require(
  'express'
)

const router =
  express.Router()

const protect = require(
  '../middleware/authMiddleware'
)

const {
  getDashboardAnalytics,
} = require(
  '../controllers/dashboardController'
)

router.get(
  '/analytics',

  protect,

  getDashboardAnalytics
)

module.exports = router