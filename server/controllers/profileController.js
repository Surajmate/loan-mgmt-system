const Employee = require(
    '../models/Employee'
)

const bcrypt = require(
    'bcryptjs'
)

const User = require(
    '../models/User'
)

// GET PROFILE
const getProfile =
    async (req, res) => {

        try {

            const employee =
                await Employee.findOne({
                    user: req.user._id,
                })
                    .populate({
                        path: 'assignedLoans',

                        populate: {
                            path: 'customer',
                        },
                    })
                    .populate(
                        'assignedCustomers'
                    )
                    .populate('manager')

            res.json(employee)

        } catch (error) {

            res.status(500).json({
                message: error.message,
            })

        }
    }

// UPDATE PROFILE
const updateProfile =
    async (req, res) => {

        try {

            const employee =
                await Employee.findOne({
                    user: req.user._id,
                })

            const teamMembers =
                await Employee.find({
                    manager: employee?._id,
                })

            if (!employee) {

                return res
                    .status(404)
                    .json({
                        message:
                            'Employee not found',
                    })

            }

            Object.assign(
                employee,
                req.body
            )

            await employee.save()

            res.json({
                ...employee.toObject(),

                teamMembers,
            })

        } catch (error) {

            res.status(500).json({
                message: error.message,
            })

        }
    }

// CHANGE PASSWORD
const changePassword =
    async (req, res) => {

        try {

            const {
                oldPassword,
                newPassword,
            } = req.body

            const user =
                await User.findById(
                    req.user._id
                )

            const isMatch =
                await bcrypt.compare(
                    oldPassword,
                    user.password
                )

            if (!isMatch) {

                return res
                    .status(400)
                    .json({
                        message:
                            'Old password incorrect',
                    })

            }

            const salt =
                await bcrypt.genSalt(10)

            user.password =
                await bcrypt.hash(
                    newPassword,
                    salt
                )

            await user.save()

            res.json({
                success: true,
                message:
                    'Password updated',
            })

        } catch (error) {

            res.status(500).json({
                message: error.message,
            })

        }
    }

module.exports = {
    getProfile,
    updateProfile,
    changePassword,
}