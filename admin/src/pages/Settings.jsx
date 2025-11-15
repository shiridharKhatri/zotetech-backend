import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { User, Mail, Lock, Save } from "lucide-react"
import "../styles/settings.css"

function Settings() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [message, setMessage] = useState({ type: "", text: "" })

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    setMessage({ type: "success", text: "Profile updated successfully!" })
    setTimeout(() => setMessage({ type: "", text: "" }), 3000)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match!" })
      return
    }
    setMessage({ type: "success", text: "Password changed successfully!" })
    setFormData({ ...formData, currentPassword: "", newPassword: "", confirmPassword: "" })
    setTimeout(() => setMessage({ type: "", text: "" }), 3000)
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

      <div className="settings-container">
        {/* <div className="settings-card">
          <div className="card-header">
            <User size={24} />
            <h2>Profile Information</h2>
          </div>

          <form onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <button type="submit" className="save-button">
              <Save size={18} />
              Save Changes
            </button>
          </form>
        </div> */}

        <div className="settings-card">
          <div className="card-header">
            <Lock size={24} />
            <h2>Change Password</h2>
          </div>

          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                placeholder="Enter current password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
              />
            </div>

            <button type="submit" className="save-button">
              <Save size={18} />
              Update Password
            </button>
          </form>
        </div>

        <div className="settings-card info-card">
          <h3>Account Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Account Type</span>
              <span className="info-value">Administrator</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since</span>
              <span className="info-value">January 2024</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Login</span>
              <span className="info-value">Today at 10:30 AM</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className="info-value status-active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
