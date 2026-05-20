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
const profileRoutes = require('./routes/profileRoutes')
const auditRoutes = require('./routes/auditRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const path = require('path')

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
// app.use('/uploads', express.static('uploads'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/documents', documentRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/audit', auditRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/notifications', notificationRoutes)
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log(err))

// Test Route
app.get('/', (req, res) => {
  res.send('Loan ERP APIs Running')
})

// RUN EVERY 1 HOUR
// setInterval(() => {
//   updateOverdues()
// }, 60000 * 60)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})