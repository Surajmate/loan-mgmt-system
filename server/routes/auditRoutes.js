const express = require(
  'express'
)

const router =
  express.Router()

const protect = require(
  '../middleware/authMiddleware'
)

const authorizeRoles =
  require(
    '../middleware/roleMiddleware'
  )

const {
  getAuditLogs,
} = require(
  '../controllers/auditController'
)

router.get(
  '/',

  protect,

  authorizeRoles(
    'ADMIN',
    'AUDITOR'
  ),

  getAuditLogs
)

module.exports = router