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
import Profile from './pages/profile/Profile'
import LoanERPLandingPage from './pages/landing/LoanERPLandingPage'
import RoleProtectedRoute from './components/RoleProtectedRoute'
import CustomerDetails from './pages/customers/CustomerDetails'

const ProtectedRoute = ({
  children,
}) => {
  const user = JSON.parse(
    localStorage.getItem('loanUser')
  )

  return user
    ? children
    : <Navigate to="/" />
}

function App() {
  const user = JSON.parse(
    localStorage.getItem('loanUser')
  )

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={
            <Login />
          }
        />

        <Route
          path="/"
          element={<LoanERPLandingPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers/:id"
          element={
            <ProtectedRoute>
              <CustomerDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loans"
          element={
            <ProtectedRoute>
              <Loans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/repayments"
          element={
            <ProtectedRoute>
              <Repayments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/foreclosure"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                allowedRoles={[
                  'ADMIN',
                  'MANAGER',
                ]}
              >

                <Foreclosure />

              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/restructure"
          element={
            <ProtectedRoute>
              <Restructure />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                allowedRoles={[
                  'ADMIN',
                ]}
              >

                <Employees />

              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App