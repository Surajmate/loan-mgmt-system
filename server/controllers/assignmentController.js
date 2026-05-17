const CollectionAssignment =
    require(
        '../models/CollectionAssignment'
    )

// CREATE ASSIGNMENT
const assignCollection =
    async (req, res) => {
        try {
            // CHECK EXISTING
            const existingAssignment =
                await CollectionAssignment.findOne(
                    {
                        loan: req.body.loan,
                        status: 'ASSIGNED',
                    }
                )

            if (existingAssignment) {
                return res.status(400).json({
                    message:
                        'Loan already assigned',
                })
            }

            // CREATE
            const assignment =
                await CollectionAssignment.create(
                    req.body
                )

            res
                .status(201)
                .json(assignment)
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    }

const completeAssignment =
    async (req, res) => {
        try {
            const assignment =
                await CollectionAssignment.findById(
                    req.params.id
                )

            if (!assignment) {
                return res.status(404).json({
                    message:
                        'Assignment not found',
                })
            }

            assignment.status =
                'COMPLETED'

            await assignment.save()

            res.json({
                message:
                    'Assignment completed',
            })
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    }

// GET ASSIGNMENTS
const getAssignments =
    async (req, res) => {
        try {
            const assignments =
                await CollectionAssignment.find()
                    .populate('employee')
                    .populate('customer')
                    .populate('loan')
                    .sort({
                        createdAt: -1,
                    })

            res.json(assignments)
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    }

const reassignCollection =
    async (req, res) => {
        try {
            const assignment =
                await CollectionAssignment.findById(
                    req.params.id
                )

            if (!assignment) {
                return res.status(404).json({
                    message:
                        'Assignment not found',
                })
            }

            assignment.employee =
                req.body.employee

            await assignment.save()

            res.json({
                message:
                    'Assignment reassigned',
            })
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    }

module.exports = {
    assignCollection,
    getAssignments,
    completeAssignment,
    reassignCollection,
}