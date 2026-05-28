import {
    useEffect,
    useState,
} from 'react'

import {
    Link
} from 'react-router-dom'

import {
    FaBuilding,
    FaUsers,
    FaMapMarkerAlt,
    FaPhone,
    FaEdit,
    FaTrash,
    FaEye,
} from 'react-icons/fa'

import Loader
    from '../../components/Loader'

import BranchModal
    from '../../components/BranchModal'

import {
    getBranches,
    deleteBranch,
} from '../../services/branchService'

import {
    confirmAlert,
    successAlert,
    errorAlert,
} from '../../utils/alerts'
import DashboardLayout from '../../layouts/DashboardLayout'

const Branches = () => {

    const [
        branches,
        setBranches,
    ] = useState([])

    const [
        loading,
        setLoading,
    ] = useState(true)

    const [
        openModal,
        setOpenModal,
    ] = useState(false)

    const [
        editData,
        setEditData,
    ] = useState(null)

    // FETCH BRANCHES
    useEffect(() => {

        fetchBranches()

    }, [])

    const fetchBranches =
        async () => {

            try {

                setLoading(true)

                const data =
                    await getBranches()

                setBranches(data)

            } catch (error) {

                console.log(error)

                errorAlert(
                    'Failed to load branches'
                )

            } finally {

                setLoading(false)
            }
        }

    // DELETE BRANCH
    const deleteHandler =
        async (id) => {

            const result =
                await congirmAlert(
                    'Delete Branch?',
                    'This action cannot be undone'
                )

            if (
                result.isConfirmed
            ) {

                try {

                    await deleteBranch(id)

                    successAlert(
                        'Branch deleted successfully'
                    )

                    fetchBranches()

                } catch (error) {

                    errorAlert(
                        'Delete failed'
                    )
                }
            }
        }

    // TOTALS
    const activeBranches =
        branches.filter(
            (branch) =>
                branch.isActive
        ).length

    if (loading) {

        return <Loader />
    }

    return (
        <DashboardLayout>
            <div className="bg-slate-100 min-h-screen">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

                    <div>

                        {/* <h1 className="text-4xl font-bold text-slate-800">

            Branches

          </h1> */}

                        <p className="text-slate-500 mt-2">

                            Manage all company branches and operations

                        </p>

                    </div>

                    {/* CREATE BUTTON */}
                    <button
                        onClick={() => {

                            setEditData(null)

                            setOpenModal(true)
                        }}

                        className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-2xl font-semibold shadow-sm"
                    >

                        + Create Branch

                    </button>

                </div>

                {/* ANALYTICS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                    {/* TOTAL */}
                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">

                        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">

                            <FaBuilding />

                        </div>

                        <p className="text-slate-500">

                            Total Branches

                        </p>

                        <h2 className="text-4xl font-bold text-slate-800 mt-2">

                            {
                                branches.length
                            }

                        </h2>

                    </div>

                    {/* ACTIVE */}
                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">

                        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-2xl">

                            <FaUsers />

                        </div>

                        <p className="text-slate-500">

                            Active Branches

                        </p>

                        <h2 className="text-4xl font-bold text-slate-800 mt-2">

                            {
                                activeBranches
                            }

                        </h2>

                    </div>

                    {/* CITIES */}
                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">

                        <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl">

                            <FaMapMarkerAlt />

                        </div>

                        <p className="text-slate-500">

                            Cities Covered

                        </p>

                        <h2 className="text-4xl font-bold text-slate-800 mt-2">

                            {
                                new Set(
                                    branches.map(
                                        (
                                            branch
                                        ) =>
                                            branch.city
                                    )
                                ).size
                            }

                        </h2>

                    </div>

                    {/* MANAGERS */}
                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">

                        <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-2xl">

                            <FaUsers />

                        </div>

                        <p className="text-slate-500">

                            Assigned Managers

                        </p>

                        <h2 className="text-4xl font-bold text-slate-800 mt-2">

                            {
                                branches.filter(
                                    (
                                        branch
                                    ) =>
                                        branch.manager
                                ).length
                            }

                        </h2>

                    </div>

                </div>

                {/* BRANCH GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {
                        branches.map(
                            (branch) => (

                                <div
                                    key={branch._id}
                                    className="bg-white rounded-[32px] p-7 shadow-sm border border-slate-100 hover:shadow-lg transition"
                                >

                                    {/* TOP */}
                                    <div className="flex items-start justify-between">

                                        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">

                                            <FaBuilding />

                                        </div>

                                        <span className={`px-4 py-2 rounded-full text-xs font-semibold ${branch.isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                            }`}>

                                            {
                                                branch.isActive
                                                    ? 'ACTIVE'
                                                    : 'INACTIVE'
                                            }

                                        </span>

                                    </div>

                                    {/* NAME */}
                                    <h2 className="text-2xl font-bold text-slate-800 mt-6">

                                        {
                                            branch.branchName
                                        }

                                    </h2>

                                    {/* CODE */}
                                    <p className="text-slate-500 mt-2">

                                        Branch Code:
                                        {' '}
                                        <span className="font-semibold">

                                            {
                                                branch.branchCode
                                            }

                                        </span>

                                    </p>

                                    {/* CITY */}
                                    <div className="flex items-center gap-3 mt-4 text-slate-600">

                                        <FaMapMarkerAlt />

                                        <span>

                                            {
                                                branch.city
                                            },
                                            {' '}
                                            {
                                                branch.state
                                            }

                                        </span>

                                    </div>

                                    {/* PHONE */}
                                    <div className="flex items-center gap-3 mt-3 text-slate-600">

                                        <FaPhone />

                                        <span>

                                            {
                                                branch.contactNumber
                                                || 'N/A'
                                            }

                                        </span>

                                    </div>

                                    {/* MANAGER */}
                                    <div className="flex items-center gap-3 mt-3 text-slate-600">

                                        <FaUsers />

                                        <span>

                                            {
                                                branch.manager
                                                    ?.fullName
                                                || 'No Manager Assigned'
                                            }

                                        </span>

                                    </div>

                                    {/* ADDRESS */}
                                    <div className="mt-5 p-4 rounded-2xl bg-slate-50 text-slate-600 text-sm leading-6">

                                        {
                                            branch.address
                                            || 'No address available'
                                        }

                                    </div>

                                    {/* ACTIONS */}
                                    <div className="grid grid-cols-3 gap-3 mt-6">

                                        {/* VIEW */}
                                        <Link
                                            to={`/branches/${branch._id}`}
                                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl transition"
                                        >

                                            <FaEye />

                                            View

                                        </Link>

                                        {/* EDIT */}
                                        <button
                                            onClick={() => {

                                                setEditData(
                                                    branch
                                                )

                                                setOpenModal(true)
                                            }}

                                            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-2xl transition"
                                        >

                                            <FaEdit />

                                            Edit

                                        </button>

                                        {/* DELETE */}
                                        <button
                                            onClick={() =>
                                                deleteHandler(
                                                    branch._id
                                                )
                                            }

                                            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl transition"
                                        >

                                            <FaTrash />

                                            Delete

                                        </button>

                                    </div>

                                </div>
                            )
                        )
                    }

                </div>

                {/* EMPTY */}
                {
                    branches.length === 0 && (

                        <div className="bg-white rounded-[32px] p-16 text-center shadow-sm">

                            <div className="text-6xl mb-5">

                                🏢

                            </div>

                            <h2 className="text-3xl font-bold text-slate-700">

                                No Branches Found

                            </h2>

                            <p className="text-slate-500 mt-3">

                                Create your first branch to start operations.

                            </p>

                        </div>
                    )
                }

                {/* MODAL */}
                <BranchModal
                    isOpen={openModal}

                    onClose={() =>
                        setOpenModal(false)
                    }

                    fetchBranches={
                        fetchBranches
                    }

                    editData={editData}
                />

            </div>
        </DashboardLayout>
    )
}

export default Branches