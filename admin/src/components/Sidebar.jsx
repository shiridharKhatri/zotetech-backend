import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Mail, HelpCircle, Settings, LogOut } from "lucide-react"
import "../styles/sidebar.css"

function Sidebar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
        <p className="user-email">{user?.email}</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/contacts" className="nav-item">
          <Mail size={20} />
          <span>Contacts</span>
        </NavLink>

        <NavLink to="/faq" className="nav-item">
          <HelpCircle size={20} />
          <span>FAQ</span>
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
