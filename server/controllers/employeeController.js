const Employee = require(
  '../models/Employee'
)

const User = require(
  '../models/User'
)

const bcrypt = require(
  'bcryptjs'
)

// CREATE EMPLOYEE
const createEmployee =
  async (req, res) => {

    try {

      const {
        fullName,
        email,
        mobile,
        role,
        department,
        branch,
        salary,
        incentive,
        password,
      } = req.body

      // VALIDATION
      if (!fullName) {

        return res
          .status(400)
          .json({
            message:
              'Full name is required',
          })

      }

      // CHECK EXISTING USER
      const existingUser =
        await User.findOne({
          email,
        })

      if (existingUser) {

        return res
          .status(400)
          .json({
            message:
              'User already exists',
          })

      }

      // HASH PASSWORD
      const salt =
        await bcrypt.genSalt(10)

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        )

      // CREATE USER
      const user =
        await User.create({
          username: email,

          email,

          password:
            hashedPassword,

          role,
        })

      // EMPLOYEE COUNT
      const employeeCount =
        await Employee.countDocuments()

      // CREATE EMPLOYEE
      const employee =
        await Employee.create({

          fullName,

          email,

          mobile,

          role,

          department,

          branch,

          salary,

          incentive,

          user: user._id,

          employeeId: `EMP${String(
            employeeCount + 1
          ).padStart(4, '0')}`,
        })

      res.status(201).json(
        employee
      )

      await createAuditLog({
        req,

        action:
          'Employee Created',

        entityType:
          'Employee',

        entityId:
          employee._id,

        details:
          employee.fullName,
      })

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
        await Employee.find()
          .populate(
            'assignedLoans'
          )
          .populate(
            'assignedCustomers'
          )
          .sort({
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
  createEmployee,
  getEmployees,
}