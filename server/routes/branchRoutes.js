const express =
    require('express')

const router =
    express.Router()

const protect =
    require(
        '../middleware/authMiddleware'
    )

const {

    createBranch,

    getBranches,

    getBranchDetails,

    updateBranch,

    deleteBranch,

} = require(
    '../controllers/branchController'
)

router.post(
    '/',
    protect,
    createBranch
)

router.get(
    '/',
    protect,
    getBranches
)

router.get(
    '/:id',
    protect,
    getBranchDetails
)

router.put(
  '/:id',
  protect,
  updateBranch
)

router.delete(
  '/:id',
  protect,
  deleteBranch
)

module.exports =
    router