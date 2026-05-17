const Employee = require('../models/Employee')

// ADD EMPLOYEE
const addEmployee =
  async (req, res) => {
    try {
      const employee =
        await Employee.create(
          req.body
        )

      res.status(201).json(employee)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

// GET EMPLOYEES
const getEmployees =
  async (req, res) => {
    try {
      const employees =
        await Employee.find().sort({
          createdAt: -1,
        })

      res.json(employees)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }

module.exports = {
  addEmployee,
  getEmployees,
}