import { useState } from 'react'

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa'

import { motion } from 'framer-motion'

import { loginUser } from '../services/authService'

import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] =
    useState(false)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      const data = await loginUser(formData)

      // Store token
      localStorage.setItem(
        'loanUser',
        JSON.stringify(data)
      )

      // Redirect
      navigate('/dashboard')

      console.log(data)

      // Redirect later
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Login failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4 overflow-hidden">

      {/* Background Blur */}
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />

      <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2"
      >

        {/* Left */}
        <div className="hidden lg:flex flex-col justify-center p-16 bg-gradient-to-br from-blue-600/30 to-indigo-700/30">

          <h1 className="text-5xl font-bold text-white leading-tight">
            Smart Loan
            <br />
            Management
          </h1>

          <p className="text-blue-100 mt-6 text-lg leading-relaxed">
            Internal finance management platform
            for customer onboarding, group
            lending, repayments and foreclosure
            tracking.
          </p>

          <div className="mt-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
              alt="finance"
              className="w-72 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Right */}
        <div className="bg-white p-8 lg:p-14 flex items-center">

          <div className="w-full">

            <div className="text-center lg:text-left mb-10">

              <h2 className="text-4xl font-bold text-slate-800">
                Welcome Back
              </h2>

              <p className="text-slate-500 mt-3">
                Login to continue managing loans
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Username */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>

                <div className="relative">

                  <FaUser className="absolute left-4 top-4 text-slate-400" />

                  <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>
              </div>

              {/* Password */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <FaLock className="absolute left-4 top-4 text-slate-400" />

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-2xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-4 text-slate-400"
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90 transition-all duration-300 text-white py-3 rounded-2xl font-semibold shadow-xl"
              >
                {loading
                  ? 'Logging in...'
                  : 'Login'}
              </button>

            </form>

          </div>
        </div>

      </motion.div>
    </div>
  )
}