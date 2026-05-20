import {
    useEffect,
    useState,
} from 'react'

import {
    successAlert,
    errorAlert,
    warningAlert,
    closeAlert
} from '../../utils/alerts'

import {
    FaUserTie,
    FaMoneyBillWave,
    FaUsers,
    FaKey,
    FaClipboardCheck,
} from 'react-icons/fa'

import {
    getProfile,
    updateProfile,
    changePassword,
    uploadProfilePicture
} from '../../services/profileService'

import DashboardLayout from '../../layouts/DashboardLayout'

const Profile = () => {

    const [profile, setProfile] =
        useState(null)

    const [loading, setLoading] =
        useState(true)

    const [showPassword,
        setShowPassword] =
        useState(false)

    const [passwordData,
        setPasswordData] =
        useState({
            oldPassword: '',
            newPassword: '',
        })

    // FETCH PROFILE
    const fetchProfile =
        async () => {

            try {

                const data =
                    await getProfile()

                setProfile(data)

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)

            }
        }

    useEffect(() => {
        fetchProfile()
    }, [])

    const handleProfilePicture =
        async (e) => {

            try {

                const formData =
                    new FormData()

                formData.append(
                    'image',
                    e.target.files[0]
                )

                const response =
                    await uploadProfilePicture(
                        formData
                    )

                setProfile({
                    ...profile,

                    profilePicture:
                        response.profilePicture,
                })

            } catch (error) {

                console.log(error)

                errorAlert('Error', 'Failed to upload image')

            }
        }

    // UPDATE PROFILE
    const handleUpdate =
        async (e) => {

            e.preventDefault()

            try {

                await updateProfile(
                    profile
                )

                successAlert(
                    'Success',
                    'Profile updated successfully'
                )

            } catch (error) {

                console.log(error)

                errorAlert('Error',
                    error?.response?.data
                        ?.message ||
                    'Failed to update profile'
                )

            }
        }

    // CHANGE PASSWORD
    const handlePasswordChange =
        async (e) => {

            e.preventDefault()

            try {

                await changePassword(
                    passwordData
                )

                successAlert(
                    'Success',
                    'Password updated successfully'
                )

                setPasswordData({
                    oldPassword: '',
                    newPassword: '',
                })

                setShowPassword(false)

            } catch (error) {

                console.log(error)

                errorAlert('Error',
                    error?.response?.data
                        ?.message ||
                    'Failed to change password'
                )

            }
        }

    if (loading) {

        return (
            <div className="p-10">
                Loading...
            </div>
        )

    }

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-slate-100">

                {/* TOP HERO */}
                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 rounded-[32px] md:p-10 text-white shadow-2xl mb-8">

                    {/* GLOW */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-8">

                        {/* PROFILE INFO */}
                        <div className="flex flex-col md:flex-row md:items-center gap-6">

                            {/* AVATAR */}
                            <div className="relative">

                                {
                                    profile?.profilePicture ? (

                                        <img
                                            src={`http://localhost:5000/${profile.profilePicture}`}
                                            alt="profile"
                                            className="w-32 h-32 rounded-[28px] object-cover border-4 border-white/20 shadow-xl"
                                        />

                                    ) : (

                                        <div className="w-32 h-32 rounded-[28px] bg-white/20 backdrop-blur-lg border border-white/20 flex items-center justify-center text-5xl font-bold shadow-xl">

                                            {profile?.fullName
                                                ?.charAt(0)
                                                ?.toUpperCase()}

                                        </div>

                                    )
                                }

                                <label className="absolute -bottom-2 -right-2 bg-white text-slate-700 w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer">

                                    📷

                                    <input
                                        type="file"
                                        hidden
                                        onChange={
                                            handleProfilePicture
                                        }
                                    />

                                </label>

                            </div>

                            {/* DETAILS */}
                            <div>

                                <div className="flex flex-wrap items-center gap-4">

                                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">

                                        {profile?.fullName}

                                    </h1>

                                    <span className="bg-white/20 backdrop-blur-lg border border-white/20 px-5 py-2 rounded-full text-sm font-semibold">

                                        {profile?.role}

                                    </span>

                                </div>
                                <div className='text-left'>
                                    <p className="text-blue-100 text-lg mt-5">

                                        {profile?.department} • {profile?.branch}

                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-6 mt-5 text-sm text-blue-50">

                                    <span>
                                        📧 {profile?.email}
                                    </span>

                                    <span>
                                        📱 {profile?.mobile}
                                    </span>

                                    <span>
                                        🏢 Employee ID:
                                        {' '}
                                        {profile?.employeeId}
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* QUICK ACTIONS */}
                        <div className="flex flex-wrap gap-4">

                            {/* <button
                                onClick={() =>
                                    setShowPassword(true)
                                }
                                className="bg-white text-slate-800 hover:bg-slate-100 px-6 py-4 rounded-2xl font-semibold shadow-lg"
                            >

                                Change Password

                            </button> */}

                        </div>

                    </div>

                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                    {/* LEFT SIDEBAR */}
                    <div className="xl:col-span-4 space-y-8">

                        {/* ANALYTICS */}
                        <div className="grid grid-cols-2 gap-5">

                            {/* COLLECTIONS */}
                            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-200">

                                <p className="text-slate-500 text-sm">

                                    Collections

                                </p>

                                <h2 className="text-3xl font-bold text-slate-800 mt-3">

                                    Rs.
                                    {
                                        profile?.totalCollections ||
                                        0
                                    }

                                </h2>

                            </div>

                            {/* LOANS */}
                            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-200">

                                <p className="text-slate-500 text-sm">

                                    Loans

                                </p>

                                <h2 className="text-3xl font-bold text-slate-800 mt-3">

                                    {
                                        profile?.assignedLoans
                                            ?.length || 0
                                    }

                                </h2>

                            </div>

                            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200">

                                <div className="mb-6">

                                    <h2 className="text-3xl font-bold text-slate-800">

                                        Team Members

                                    </h2>

                                    <p className="text-slate-500 mt-2">

                                        Agents reporting under manager

                                    </p>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    {profile?.teamMembers
                                        ?.length > 0 ? (

                                        profile.teamMembers.map(
                                            (member) => (

                                                <div
                                                    key={member._id}
                                                    className="border border-slate-200 rounded-3xl p-5 flex items-center justify-between"
                                                >

                                                    <div>

                                                        <h3 className="font-bold text-slate-800">

                                                            {
                                                                member.fullName
                                                            }

                                                        </h3>

                                                        <p className="text-slate-500 text-sm mt-1">

                                                            {
                                                                member.role
                                                            }

                                                        </p>

                                                    </div>

                                                    <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">

                                                        {
                                                            member.status
                                                        }

                                                    </span>

                                                </div>
                                            )
                                        )

                                    ) : (

                                        <div className="text-slate-500">

                                            No team members assigned

                                        </div>

                                    )}

                                </div>

                            </div>

                            {/* CUSTOMERS */}
                            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-200">

                                <p className="text-slate-500 text-sm">

                                    Customers

                                </p>

                                <h2 className="text-3xl font-bold text-slate-800 mt-3">

                                    {
                                        profile
                                            ?.assignedCustomers
                                            ?.length || 0
                                    }

                                </h2>

                            </div>

                            {/* RECOVERY */}
                            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-200">

                                <p className="text-slate-500 text-sm">

                                    Recovery

                                </p>

                                <h2 className="text-3xl font-bold text-slate-800 mt-3">

                                    {
                                        profile?.recoveryRate ||
                                        0
                                    }%

                                </h2>

                            </div>

                        </div>

                        {/* ATTENDANCE */}
                        <div className="bg-white rounded-[28px] p-8 shadow-sm border border-slate-200">

                            <div className="flex items-center justify-between mb-6">

                                <div>

                                    <h2 className="text-2xl font-bold text-slate-800">

                                        Attendance

                                    </h2>

                                    <p className="text-slate-500 mt-1">

                                        Monthly attendance overview

                                    </p>

                                </div>

                            </div>

                            <div className="space-y-4 max-h-[350px] overflow-y-auto">

                                {profile?.attendance
                                    ?.length > 0 ? (
                                    profile.attendance.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between border border-slate-200 rounded-2xl px-5 py-4"
                                            >

                                                <div>

                                                    <h3 className="font-semibold text-slate-800">

                                                        {new Date(
                                                            item.date
                                                        ).toLocaleDateString()}

                                                    </h3>

                                                </div>

                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-semibold ${item.status ===
                                                        'PRESENT'
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : item.status ===
                                                            'ABSENT'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-orange-100 text-orange-700'
                                                        }`}
                                                >

                                                    {
                                                        item.status
                                                    }

                                                </span>

                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="text-slate-500">

                                        No attendance data available

                                    </p>
                                )}

                            </div>

                        </div>

                        <div className="bg-white rounded-[28px] p-8 shadow-sm border border-slate-200">

                            <div className="flex items-center justify-between mb-6">

                                <div>

                                    <h2 className="text-2xl font-bold text-slate-800">

                                        Leave Requests

                                    </h2>

                                    <p className="text-slate-500 mt-1">

                                        Leave history and approvals

                                    </p>

                                </div>

                            </div>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto">

                                {profile?.leaves
                                    ?.length > 0 ? (

                                    profile.leaves.map(
                                        (
                                            leave,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                                className="border border-slate-200 rounded-2xl p-5"
                                            >

                                                <div className="flex items-center justify-between">

                                                    <div>

                                                        <h3 className="font-semibold text-slate-800">

                                                            {
                                                                leave.reason
                                                            }

                                                        </h3>

                                                        <p className="text-sm text-slate-500 mt-1">

                                                            {
                                                                new Date(
                                                                    leave.fromDate
                                                                ).toLocaleDateString()
                                                            }

                                                            {' '}-
                                                            {' '}

                                                            {
                                                                new Date(
                                                                    leave.toDate
                                                                ).toLocaleDateString()
                                                            }

                                                        </p>

                                                    </div>

                                                    <span
                                                        className={`px-4 py-2 rounded-full text-sm font-semibold ${leave.status ===
                                                            'APPROVED'
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : leave.status ===
                                                                'REJECTED'
                                                                ? 'bg-red-100 text-red-700'
                                                                : 'bg-orange-100 text-orange-700'
                                                            }`}
                                                    >

                                                        {
                                                            leave.status
                                                        }

                                                    </span>

                                                </div>

                                            </div>
                                        )
                                    )

                                ) : (

                                    <p className="text-slate-500">

                                        No leave requests

                                    </p>

                                )}

                            </div>

                        </div>

                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="xl:col-span-8 space-y-8">

                        {/* PROFILE FORM */}
                        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200">

                            <div className="mb-8">

                                <h2 className="text-3xl font-bold text-slate-800">

                                    Profile Details

                                </h2>

                                <p className="text-slate-500 mt-2">

                                    Update personal and work information

                                </p>

                            </div>

                            <form
                                onSubmit={
                                    handleUpdate
                                }
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >

                                <input
                                    type="text"
                                    value={
                                        profile?.fullName || ''
                                    }
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            fullName:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="Full Name"
                                    className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                                />

                                <input
                                    type="text"
                                    value={
                                        profile?.mobile || ''
                                    }
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            mobile:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="Mobile"
                                    className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                                />

                                <input
                                    type="text"
                                    value={
                                        profile?.branch || ''
                                    }
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            branch:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="Branch"
                                    className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                                />

                                <input
                                    type="text"
                                    value={
                                        profile?.department ||
                                        ''
                                    }
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            department:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="Department"
                                    className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                                />

                                <textarea
                                    value={
                                        profile?.address || ''
                                    }
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            address:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="Address"
                                    rows="5"
                                    className="md:col-span-2 border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                                />

                                <button
                                    type="submit"
                                    className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-95 text-white py-5 rounded-2xl font-semibold shadow-lg"
                                >

                                    Update Profile

                                </button>

                            </form>

                        </div>

                        {/* ASSIGNED LOANS */}
                        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200">

                            <div className="flex items-center justify-between mb-6">

                                <div>

                                    <h2 className="text-3xl font-bold text-slate-800">

                                        Assigned Loans

                                    </h2>

                                    <p className="text-slate-500 mt-2">

                                        Loans assigned for recovery and servicing

                                    </p>

                                </div>

                            </div>

                            <div className="overflow-auto">

                                <table className="w-full">

                                    <thead className="bg-slate-100">

                                        <tr>

                                            <th className="p-4 text-left">

                                                Customer

                                            </th>

                                            <th className="p-4 text-left">

                                                Amount

                                            </th>

                                            <th className="p-4 text-left">

                                                Outstanding

                                            </th>

                                            <th className="p-4 text-left">

                                                Status

                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {profile?.assignedLoans
                                            ?.length > 0 ? (
                                            profile.assignedLoans.map(
                                                (
                                                    loan
                                                ) => (
                                                    <tr
                                                        key={loan._id}
                                                        className="border-b border-slate-200"
                                                    >

                                                        <td className="p-4">

                                                            {
                                                                loan
                                                                    ?.customer
                                                            }

                                                        </td>

                                                        <td className="p-4">

                                                            Rs.
                                                            {
                                                                loan
                                                                    ?.loanAmount
                                                            }

                                                        </td>

                                                        <td className="p-4">

                                                            Rs.
                                                            {
                                                                loan
                                                                    ?.outstandingAmount
                                                            }

                                                        </td>

                                                        <td className="p-4">

                                                            <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">

                                                                {
                                                                    loan
                                                                        ?.status
                                                                }

                                                            </span>

                                                        </td>

                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="p-8 text-center text-slate-500"
                                                >

                                                    No loans assigned

                                                </td>

                                            </tr>
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default Profile