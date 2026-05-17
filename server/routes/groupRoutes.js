const express = require('express')

const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
  addGroup,
  getGroups,
} = require('../controllers/groupController')

router.post('/', protect, addGroup)

router.get('/', protect, getGroups)

module.exports = router