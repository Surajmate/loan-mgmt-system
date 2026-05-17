const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./routes/authRoutes')
const customerRoutes = require('./routes/customerRoutes')
const groupRoutes = require('./routes/groupRoutes')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/groups', groupRoutes)

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

// Test Route
app.get('/', (req, res) => {
  res.send('Loan Management API Running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})