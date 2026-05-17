const express = require('express')

const router = express.Router()

const {
  assignCollection,
  getAssignments,
  completeAssignment,
  reassignCollection
} = require(
  '../controllers/assignmentController'
)

const protect = require(
  '../middleware/authMiddleware'
)

router.post(
  '/',
  protect,
  assignCollection
)

router.get(
  '/',
  protect,
  getAssignments
)

router.put(
  '/:id/complete',
  protect,
  completeAssignment
)

router.put(
  '/:id/reassign',
  protect,
  reassignCollection
)

module.exports = router