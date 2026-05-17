const bcrypt = require('bcryptjs')

const User = require('../models/User')

const generateToken = require('../utils/generateToken')

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    // Check user
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid username',
      })
    }

    // Check password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid password',
      })
    }

    res.json({
      _id: user._id,

      username: user.username,

      email: user.email,

      role: user.role,

      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  loginUser,
}