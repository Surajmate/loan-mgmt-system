const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./routes/authRoutes')
const customerRoutes = require('./routes/customerRoutes')
const groupRoutes = require('./routes/groupRoutes')
const loanRoutes = require('./routes/loanRoutes')
const repaymentRoutes = require('./routes/repaymentRoutes')
const foreclosureRoutes = require('./routes/foreclosureRoutes')
const restructureRoutes = require('./routes/restructureRoutes')
const documentRoutes = require('./routes/documentRoutes')
const updateOverdues = require('./utils/updateOverdues')
const employeeRoutes = require('./routes/employeeRoutes')
const assignmentRoutes = require('./routes/assignmentRoutes')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/groups', groupRoutes)
app.use('/api/loans', loanRoutes)
app.use('/api/repayments', repaymentRoutes)
app.use('/api/foreclosure', foreclosureRoutes)
app.use('/api/restructure', restructureRoutes)
app.use('/uploads', express.static('uploads'))
app.use('/api/documents', documentRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/assignments', assignmentRoutes)

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

// Test Route
app.get('/', (req, res) => {
  res.send('Loan Management API Running')
})

// RUN EVERY 1 HOUR
setInterval(() => {
  updateOverdues()
}, 600000)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})