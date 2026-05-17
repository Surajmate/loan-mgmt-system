import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Customers from './pages/customers/Customers'
import Groups from './pages/groups/Groups'
import Loans from './pages/loans/Loans'
import Repayments from './pages/repayments/Repayments'
import Foreclosure from './pages/foreclosure/Foreclosure'
import Restructure from './pages/restructure/Restructure'
import Documents from './pages/documents/Documents'
import Employees from './pages/employees/Employees'
import Assignments from './pages/assignments/Assignments'

function App() {
  const user = JSON.parse(
    localStorage.getItem('loanUser')
  )

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/customers"
          element={
            user ? (
              <Customers />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/groups"
          element={
            user ? (
              <Groups />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/loans"
          element={
            user ? (
              <Loans />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/repayments"
          element={
            user ? (
              <Repayments />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/foreclosure"
          element={
            user ? (
              <Foreclosure />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/restructure"
          element={
            user ? (
              <Restructure />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/documents"
          element={
            user ? (
              <Documents />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/employees"
          element={
            user ? (
              <Employees />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/assignments"
          element={
            user ? (
              <Assignments />
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App