const express = require(
    'express'
)

const router =
    express.Router()

const protect = require(
    '../middleware/authMiddleware'
)

const Employee = require(
    '../models/Employee'
)

const upload = require(
    '../config/multer'
)

const authorizeRoles =
  require(
    '../middleware/roleMiddleware'
  )

const {
    getProfile,
    updateProfile,
    changePassword,
} = require(
    '../controllers/profileController'
)

router.get(
    '/',
    protect,
    getProfile
)

router.put(
    '/',
    protect,
    updateProfile
)

router.put(
    '/change-password',
    protect,
    changePassword
)

router.put(
    '/upload-picture',
    protect,
    upload.single('image'),
    async (req, res) => {

        try {

            const employee =
                await Employee.findOne({
                    user: req.user._id,
                })

            employee.profilePicture =
                req.file.path

            await employee.save()

            res.json({
                success: true,

                profilePicture:
                    req.file.path,
            })

        } catch (error) {

            res.status(500).json({
                message: error.message,
            })

        }
    }
)

module.exports = router