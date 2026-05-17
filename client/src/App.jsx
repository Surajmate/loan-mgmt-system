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

      </Routes>

    </BrowserRouter>
  )
}

export default App