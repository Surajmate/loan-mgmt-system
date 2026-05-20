import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  FaBell,
  FaChevronDown,
  FaSearch,
  FaSignOutAlt,
  FaUserCircle,
  FaCog,
} from 'react-icons/fa'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  getProfile,
} from '../services/profileService'

import { logout } from '../services/authService'

import {
  getNotifications,
  markAsRead,
} from '../services/notificationService'

const Navbar = () => {

  const navigate =
    useNavigate()

  const dropdownRef =
    useRef()

  const [showDropdown,
    setShowDropdown] =
    useState(false)

  const [
    notifications,
    setNotifications,
  ] = useState([])

  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false)

  const user =
    JSON.parse(
      localStorage.getItem(
        'loanUser'
      )
    )

  const [profile, setProfile] =
    useState(null)

  // const profile =
  //   JSON.parse(
  //     localStorage.getItem(
  //       'loanProfile'
  //     )
  //   ) || {}

  // LOGOUT
  const handleLogout = () => {

    logout()

    navigate('/login')
  }

  useEffect(() => {

    const fetchProfile =
      async () => {

        try {

          const data =
            await getProfile()

          setProfile(data)

        } catch (error) {

          console.log(error)
        }
      }

    fetchProfile()

    const handleClickOutside =
      (event) => {

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            event.target
          )
        ) {

          setShowDropdown(false)
        }
      }

    const fetchNotifications =
      async () => {

        try {

          const data =
            await getNotifications()

          setNotifications(data)

        } catch (error) {

          console.log(error)
        }
      }

    fetchNotifications()

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {

      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }

  }, [])

  // GREETING
  const currentHour =
    new Date().getHours()

  let greeting =
    'Good Evening'

  if (currentHour < 12) {
    greeting =
      'Good Morning'
  } else if (
    currentHour < 18
  ) {
    greeting =
      'Good Afternoon'
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200 px-6 py-4">

      <div className="flex items-center justify-between gap-5">

        {/* LEFT */}
        <div>

          <h1 className="text-2xl font-bold text-slate-800">

            {greeting},
            {' '}
            {
              (profile?.fullName?.split(' ')[0]) || ''
            }

          </h1>

          <p className="text-slate-500 mt-1">

            Welcome back to Loan ERP System

          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div className="hidden lg:flex items-center bg-slate-100 rounded-2xl px-4 py-3 w-[320px]">

            <FaSearch className="text-slate-400" />

            <input
              type="text"
              placeholder="Search customers, loans..."
              className="bg-transparent outline-none ml-3 w-full text-sm"
            />

          </div>

          {/* NOTIFICATION */}
          <div className="relative">

            <button
              onClick={() =>
                setNotificationOpen(
                  !notificationOpen
                )
              }
              className="relative bg-white border border-slate-200 rounded-2xl p-3 shadow-sm"
            >

              <FaBell className="text-slate-700 text-xl" />

              {notifications.filter(
                (n) => !n.isRead
              ).length > 0 && (

                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">

                    {
                      notifications.filter(
                        (n) => !n.isRead
                      ).length
                    }

                  </span>
                )}

            </button>

            {/* DROPDOWN */}
            {notificationOpen && (

              <div className="absolute right-0 mt-4 w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden">

                <div className="p-5 border-b border-slate-200">

                  <h2 className="text-xl font-bold">

                    Notifications

                  </h2>

                </div>

                <div className="max-h-[500px] overflow-y-auto">

                  {notifications.length >
                    0 ? (

                    notifications.map(
                      (
                        notification
                      ) => (

                        <div
                          key={
                            notification._id
                          }
                          onClick={async () => {

                            if (
                              !notification.isRead
                            ) {

                              await markAsRead(
                                notification._id
                              )

                              setNotifications(
                                notifications.map(
                                  (
                                    item
                                  ) => {

                                    if (
                                      item._id ===
                                      notification._id
                                    ) {

                                      return {
                                        ...item,
                                        isRead: true,
                                      }
                                    }

                                    return item
                                  }
                                )
                              )
                            }
                          }}
                          className={`p-5 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition ${!notification.isRead
                              ? 'bg-blue-50'
                              : ''
                            }`}
                        >

                          <div className="flex items-start justify-between">

                            <div>

                              <h3 className="font-semibold text-slate-800">

                                {
                                  notification.title
                                }

                              </h3>

                              <p className="text-sm text-slate-500 mt-2">

                                {
                                  notification.message
                                }

                              </p>

                              <p className="text-xs text-slate-400 mt-3">

                                {new Date(
                                  notification.createdAt
                                ).toLocaleString()}

                              </p>

                            </div>

                          </div>

                        </div>
                      )
                    )

                  ) : (

                    <div className="p-10 text-center text-slate-500">

                      No notifications

                    </div>
                  )}

                </div>

              </div>
            )}

          </div>

          {/* PROFILE */}
          <div
            className="relative"
            ref={dropdownRef}
          >

            <button
              onClick={() =>
                setShowDropdown(
                  !showDropdown
                )
              }
              className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm hover:bg-slate-50 transition-all"
            >

              {/* AVATAR */}
              {
                profile?.profilePicture ? (

                  <img
                    src={`http://localhost:5000/${profile.profilePicture}`}
                    alt="profile"
                    className="w-12 h-12 rounded-2xl object-cover"
                  />

                ) : (

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-lg">

                    {
                      profile?.fullName
                        ?.charAt(0)
                        ?.toUpperCase() ||
                      'U'
                    }

                  </div>

                )
              }

              {/* INFO */}
              <div className="hidden md:block text-left">

                <h3 className="font-semibold text-slate-800">

                  {
                    profile?.fullName || ''
                  }

                </h3>

                <p className="text-sm text-slate-500">

                  {user?.role}

                </p>

              </div>

              <FaChevronDown className="text-slate-500" />

            </button>

            {/* DROPDOWN */}
            {showDropdown && (
              <div className="absolute right-0 top-20 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

                {/* TOP */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">

                  <div className="flex items-center gap-4">

                    {
                      profile?.profilePicture ? (

                        <img
                          src={`http://localhost:5000/${profile.profilePicture}`}
                          alt="profile"
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20"
                        />

                      ) : (

                        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">

                          {
                            profile?.fullName
                              ?.charAt(0)
                              ?.toUpperCase() ||
                            'U'
                          }

                        </div>

                      )
                    }

                    <div>

                      <h3 className="text-xl font-bold">

                        {
                          profile?.fullName || ''
                        }

                      </h3>

                      <p className="text-blue-100 mt-1">

                        {user?.role}

                      </p>

                    </div>

                  </div>

                </div>

                {/* MENU */}
                <div className="p-4">

                  <Link
                    to="/profile"
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-100 transition-all text-slate-700"
                  >

                    <FaUserCircle />

                    My Profile

                  </Link>

                  <button
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-100 transition-all text-slate-700"
                  >

                    <FaCog />

                    Settings

                  </button>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-red-50 transition-all text-red-600"
                  >

                    <FaSignOutAlt />

                    Logout

                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </header>
  )
}

export default Navbar