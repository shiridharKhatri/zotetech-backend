import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Login from "./pages/Login"
import DashboardLayout from "./components/DashboardLayout"
import Contacts from "./pages/Contacts"
import FAQ from "./pages/FAQ"
import Settings from "./pages/Settings"

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/contacts" replace />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
