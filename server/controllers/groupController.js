const Group = require('../models/Group')

// ADD GROUP
const addGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body)

    res.status(201).json(group)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// GET GROUPS
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().sort({
      createdAt: -1,
    })

    res.json(groups)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  addGroup,
  getGroups,
}