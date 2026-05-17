const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const dotenv = require('dotenv')

const User = require('./models/User')

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))

const seedAdmin = async () => {
  try {
    // Remove existing admin
    await User.deleteMany()

    // Hash password
    const hashedPassword =
      await bcrypt.hash('admin123', 10)

    // Create admin
    await User.create({
      username: 'admin',
      password: hashedPassword,
      role: 'ADMIN',
    })

    console.log('Admin Created')

    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

seedAdmin()