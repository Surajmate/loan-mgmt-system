import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../../assets/logo.png'
import { useEffect } from 'react'

export default function LoanERPLandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem(
      'loanUser'
    )
    if (user) {
      navigate('/dashboard')
    }
  }, [navigate])

  const features = [
    {
      title: 'Loan Management',
      desc: 'Complete loan lifecycle from onboarding to foreclosure with EMI schedules and restructuring.',
      icon: '💳',
    },
    {
      title: 'Collections & Recovery',
      desc: 'Track repayments, collection agents, field recoveries, penalties, and overdue accounts.',
      icon: '📈',
    },
    {
      title: 'Employee & HRMS',
      desc: 'Manage employees, attendance, leaves, manager hierarchy, and role-based access.',
      icon: '👨‍💼',
    },
    {
      title: 'Analytics Dashboard',
      desc: 'Enterprise analytics with live KPIs, repayment trends, customer insights, and collection performance.',
      icon: '📊',
    },
    {
      title: 'Document Verification',
      desc: 'Secure customer KYC, approvals, verification workflows, and document management.',
      icon: '📁',
    },
    {
      title: 'Enterprise Security',
      desc: 'JWT authentication, RBAC access control, audit-friendly operations, and secure workflows.',
      icon: '🔐',
    },
  ]

  const stats = [
    {
      label: 'Loans Managed',
      value: 'Rs.250Cr+',
    },
    {
      label: 'Collection Efficiency',
      value: '98%',
    },
    {
      label: 'Enterprise Users',
      value: '5K+',
    },
    {
      label: 'Daily Transactions',
      value: '50K+',
    },
  ]

  const testimonials = [
    {
      name: 'Pratyush Sharma',
      role: 'NBFC Operations Head',
      text: 'LoanERP transformed our collection and workforce operations with complete visibility and analytics.',
    },
    {
      name: 'Amit Verma',
      role: 'Regional Recovery Manager',
      text: 'The restructuring, foreclosure, and recovery tracking modules are enterprise-grade.',
    },
    {
      name: 'Balaji Kumar',
      role: 'Fintech Director',
      text: 'This platform reduced manual collection tracking by more than 70% across branches.',
    },
  ]

  const modules = [
    'Customer Management',
    'Loan Servicing',
    'Repayment Tracking',
    'Collections & Recovery',
    'Foreclosure & NOC',
    'Employee HRMS',
    'Attendance & Leaves',
    'Document Verification',
    'WhatsApp Reminders',
    'Role-Based Access',
    'Analytics Dashboard',
    'Restructuring Engine',
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* HERO */}
      <section className="relative px-6 lg:px-12 pt-8 pb-24">
        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        {/* NAVBAR */}
        <div className="relative z-10 flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-2xl font-bold shadow-xl">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="grad"
                    x1="0"
                    y1="0"
                    x2="120"
                    y2="120"
                  >
                    <stop
                      offset="0%"
                      stopColor="#2563EB"
                    />
                    <stop
                      offset="100%"
                      stopColor="#06B6D4"
                    />
                  </linearGradient>
                </defs>

                <rect
                  width="120"
                  height="120"
                  rx="32"
                  fill="url(#grad)"
                />

                <path
                  d="M35 70L55 45L70 60L88 35"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle
                  cx="88"
                  cy="35"
                  r="8"
                  fill="white"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                LoanERP
              </h1>

              <p className="text-slate-400 text-sm mt-1">
                Enterprise NBFC Platform
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-slate-300">
            <a href="#features" className="hover:text-white transition-all">
              Features
            </a>

            <a href="#analytics" className="hover:text-white transition-all">
              Analytics
            </a>

            <a href="#modules" className="hover:text-white transition-all">
              Modules
            </a>

            <a href="#contact" className="hover:text-white transition-all">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-3 rounded-2xl border border-slate-700 hover:bg-slate-900 transition-all font-medium">
              Demo
            </button>

            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition-all font-semibold shadow-lg shadow-blue-500/30"
            >
              Login
            </button>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-16 items-center pt-20">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 backdrop-blur-xl px-5 py-3 rounded-full mb-8">
              <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>

              <span className="text-sm font-medium text-slate-200">
                Enterprise Loan & Workforce Management Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
              Modern
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {' '}NBFC ERP
              </span>
              <br />
              Platform
            </h1>

            <p className="text-xl text-slate-400 mt-8 leading-relaxed max-w-2xl">
              Complete enterprise-grade loan management solution with collections,
              restructuring, HRMS, recovery operations, analytics dashboards,
              document verification, and role-based workforce management.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-semibold shadow-2xl shadow-blue-500/30 hover:scale-105 transition-all"
              >
                Get Started
              </button>

              <button
                onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })}
                className="px-8 py-5 rounded-2xl border border-slate-700 bg-white/5 backdrop-blur-xl text-lg font-semibold hover:bg-white/10 transition-all"
              >
                Explore Features
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">
              {stats.map((item, index) => (
                <div key={index}
                  key={item.label}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5"
                >
                  <h3 className="text-3xl font-bold text-white">
                    {item.value}
                  </h3>

                  <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT DASHBOARD */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl shadow-blue-500/10">
              {/* TOP */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold">
                    Enterprise Dashboard
                  </h2>

                  <p className="text-slate-400 mt-2">
                    Real-time NBFC Operations Overview
                  </p>
                </div>

                <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-3xl shadow-xl">
                  📊
                </div>
              </div>

              {/* KPI GRID */}
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-slate-900/60 rounded-3xl p-6 border border-white/5">
                  <p className="text-slate-400 text-sm">
                    Active Loans
                  </p>

                  <h3 className="text-4xl font-black mt-3">
                    12,580
                  </h3>

                  <span className="inline-flex mt-4 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold">
                    +12.5%
                  </span>
                </div>

                <div className="bg-slate-900/60 rounded-3xl p-6 border border-white/5">
                  <p className="text-slate-400 text-sm">
                    Collections
                  </p>

                  <h3 className="text-4xl font-black mt-3">
                    Rs.4.8Cr
                  </h3>

                  <span className="inline-flex mt-4 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
                    Daily Recovery
                  </span>
                </div>

                <div className="bg-slate-900/60 rounded-3xl p-6 border border-white/5">
                  <p className="text-slate-400 text-sm">
                    Employees
                  </p>

                  <h3 className="text-4xl font-black mt-3">
                    520
                  </h3>

                  <span className="inline-flex mt-4 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
                    Workforce
                  </span>
                </div>

                <div className="bg-slate-900/60 rounded-3xl p-6 border border-white/5">
                  <p className="text-slate-400 text-sm">
                    Recovery Rate
                  </p>

                  <h3 className="text-4xl font-black mt-3">
                    98%
                  </h3>

                  <span className="inline-flex mt-4 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold">
                    Excellent
                  </span>
                </div>
              </div>

              {/* COLLECTION CARD */}
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-7 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">
                      Monthly Collections
                    </p>

                    <h3 className="text-5xl font-black mt-4">
                      Rs.28Cr
                    </h3>
                  </div>

                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-5xl">
                    💰
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING */}
            <div className="absolute -bottom-10 -left-10 bg-white text-slate-900 rounded-3xl px-6 py-5 shadow-2xl hidden lg:block">
              <p className="text-sm text-slate-500">
                AI Collection Intelligence
              </p>

              <h3 className="text-2xl font-black mt-2">
                Smart Recovery
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 lg:px-12 py-24 bg-slate-900/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex bg-blue-500/10 text-blue-400 px-5 py-3 rounded-full font-semibold mb-6 border border-blue-500/20">
              Enterprise Features
            </div>

            <h2 className="text-5xl font-black leading-tight">
              Everything Your
              <span className="text-cyan-400">
                {' '}NBFC
              </span>
              {' '}Needs
            </h2>

            <p className="text-slate-400 text-xl mt-6 leading-relaxed">
              Built for loan servicing, collections, workforce management,
              analytics, and enterprise recovery operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-4xl shadow-xl mb-8 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-3xl font-bold mb-5">
                  {feature.title}
                </h3>

                <p className="text-slate-400 text-lg leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTERPRISE ANALYTICS */}
      <section
        id="analytics"
        className="px-6 lg:px-12 py-24 bg-slate-900/40 border-y border-white/5"
      >

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-20">

            <div className="inline-flex bg-blue-500/10 text-blue-400 px-5 py-3 rounded-full font-semibold mb-6 border border-blue-500/20">

              Live Enterprise Analytics

            </div>

            <h2 className="text-5xl font-black leading-tight">

              Real-Time Financial Intelligence

            </h2>

            <p className="text-slate-400 text-xl mt-6 max-w-3xl mx-auto leading-relaxed">

              Monitor collections, repayments, loan performance, workforce productivity,
              and recovery operations across all branches.

            </p>

          </div>

          {/* ANALYTICS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* COLLECTION */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[32px] p-8 shadow-2xl shadow-blue-500/20">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-blue-100">

                    Monthly Collections

                  </p>

                  <h3 className="text-5xl font-black mt-5">

                    Rs.28Cr

                  </h3>

                </div>

                <div className="text-6xl">

                  💰

                </div>

              </div>

              <div className="mt-10 bg-white/10 rounded-2xl p-5 backdrop-blur-xl">

                <div className="flex items-center justify-between">

                  <span className="text-blue-100">

                    Growth

                  </span>

                  <span className="font-bold">

                    +18.5%

                  </span>

                </div>

              </div>

            </div>

            {/* RECOVERY */}
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-slate-400">

                    Recovery Performance

                  </p>

                  <h3 className="text-5xl font-black mt-5">

                    98%

                  </h3>

                </div>

                <div className="text-6xl">

                  📈

                </div>

              </div>

              <div className="space-y-5 mt-10">

                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-slate-400">

                      Recovery Rate

                    </span>

                    <span>

                      98%

                    </span>

                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-3">

                    <div className="bg-emerald-400 h-3 rounded-full w-[98%]"></div>

                  </div>

                </div>

                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-slate-400">

                      Collection Efficiency

                    </span>

                    <span>

                      92%

                    </span>

                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-3">

                    <div className="bg-blue-400 h-3 rounded-full w-[92%]"></div>

                  </div>

                </div>

              </div>

            </div>

            {/* WORKFORCE */}
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-slate-400">

                    Workforce Analytics

                  </p>

                  <h3 className="text-5xl font-black mt-5">

                    520

                  </h3>

                </div>

                <div className="text-6xl">

                  👨‍💼

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-10">

                <div className="bg-white/5 rounded-2xl p-5">

                  <p className="text-slate-400 text-sm">

                    Managers

                  </p>

                  <h4 className="text-3xl font-bold mt-3">

                    45

                  </h4>

                </div>

                <div className="bg-white/5 rounded-2xl p-5">

                  <p className="text-slate-400 text-sm">

                    Agents

                  </p>

                  <h4 className="text-3xl font-bold mt-3">

                    475

                  </h4>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ENTERPRISE MODULES */}
      <section
        id="modules"
        className="px-6 lg:px-12 py-24"
      >

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-20">

            <div className="inline-flex bg-cyan-500/10 text-cyan-400 px-5 py-3 rounded-full font-semibold mb-6 border border-cyan-500/20">

              Core Platform Modules

            </div>

            <h2 className="text-5xl font-black leading-tight">

              Complete Financial Ecosystem

            </h2>

            <p className="text-slate-400 text-xl mt-6 max-w-3xl mx-auto leading-relaxed">

              End-to-end loan lifecycle management with enterprise-grade operations,
              workforce tracking, collections, and analytics.

            </p>

          </div>

          {/* MODULE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">

            {[
              {
                icon: '💳',
                title: 'Loan Servicing',
                desc: 'Loan onboarding, EMI schedules, restructuring, foreclosure, and NOC generation.',
              },
              {
                icon: '📈',
                title: 'Collections',
                desc: 'Recovery tracking, penalties, field collections, and repayment monitoring.',
              },
              {
                icon: '👨‍💼',
                title: 'Employee HRMS',
                desc: 'Attendance, leave management, workforce hierarchy, and RBAC access.',
              },
              {
                icon: '📁',
                title: 'Document Center',
                desc: 'KYC uploads, verification workflows, approvals, and compliance tracking.',
              },
              {
                icon: '📊',
                title: 'Analytics Engine',
                desc: 'Real-time branch performance, loan analytics, and collection insights.',
              },
              {
                icon: '📲',
                title: 'WhatsApp Reminders',
                desc: 'Automated repayment reminders and customer communication workflows.',
              },
              {
                icon: '🔐',
                title: 'Enterprise Security',
                desc: 'JWT authentication, secure APIs, role permissions, and audit logs.',
              },
              {
                icon: '🏦',
                title: 'Branch Operations',
                desc: 'Multi-branch workforce and loan operations with centralized visibility.',
              },
            ].map((module, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                }}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl transition-all duration-300"
              >

                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-4xl shadow-xl mb-8 group-hover:scale-110 transition-all">

                  {module.icon}

                </div>

                <h3 className="text-2xl font-bold mb-5">

                  {module.title}

                </h3>

                <p className="text-slate-400 leading-relaxed text-lg">

                  {module.desc}

                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 lg:px-12 py-24 bg-slate-900/40 border-y border-white/5">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <div className="inline-flex bg-emerald-500/10 text-emerald-400 px-5 py-3 rounded-full font-semibold mb-6 border border-emerald-500/20">
              Trusted by Financial Teams
            </div>

            <h2 className="text-5xl font-black">
              Built for Enterprise Operations
            </h2>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {testimonials.map((item) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                key={item.name}
                className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl"
              >

                <div className="text-5xl mb-6">
                  ⭐
                </div>

                <p className="text-slate-300 text-lg leading-relaxed">
                  {item.text}
                </p>

                <div className="mt-8">

                  <h3 className="text-xl font-bold">
                    {item.name}
                  </h3>

                  <p className="text-slate-500 mt-2">
                    {item.role}
                  </p>

                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section id="contact" className="px-6 lg:px-12 py-24">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[40px] p-12 lg:p-16 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-black rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-5xl lg:text-6xl font-black leading-tight">
              Ready to Modernize
              <br />
              Your NBFC Operations?
            </h2>

            <p className="text-blue-100 text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
              Transform collections, workforce management, loan servicing,
              analytics, and recovery operations with enterprise-grade ERP.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 mt-12">
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-slate-900 px-8 py-5 rounded-2xl text-lg font-bold hover:scale-105 transition-all shadow-xl"
              >
                Start Free Trial
              </button>

              <button className="bg-black/20 backdrop-blur-xl border border-white/20 px-8 py-5 rounded-2xl text-lg font-semibold hover:bg-black/30 transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-6 lg:px-12 py-10 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">
              LoanERP
            </h3>

            <p className="text-slate-500 mt-2">
              Enterprise Loan & Workforce Management Platform
            </p>
          </div>

          <div className="flex items-center gap-8 text-slate-400">
            <a href="#features" className="hover:text-white transition-all">
              Features
            </a>

            <a href="#analytics" className="hover:text-white transition-all">
              Analytics
            </a>

            <a href="#modules" className="hover:text-white transition-all">
              Modules
            </a>

            <a href="#contact" className="hover:text-white transition-all">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
