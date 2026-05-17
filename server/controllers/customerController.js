const Customer = require('../models/Customer')

// ADD CUSTOMER
const addCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(
      req.body
    )

    res.status(201).json(customer)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// GET CUSTOMERS
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({
      createdAt: -1,
    })

    res.json(customers)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  addCustomer,
  getCustomers,
}