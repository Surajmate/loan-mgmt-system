const express = require('express')

const router = express.Router()

const {
  addGroup,
  getGroups,
} = require('../controllers/groupController')

router.post('/', addGroup)

router.get('/', getGroups)

module.exports = router