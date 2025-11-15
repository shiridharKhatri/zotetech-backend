import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";
import Cookies from "js-cookie";

function Login() {
  const [userId, setuserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const success = await login(userId, password);
    if (success && success.success) {
      Cookies.set("admin_auth_token", success.token, {
        expires: rememberMe ? 7 : null,
      });
      navigate("/contacts");
    } else {
      setError(success.response.data.message || "Login failed");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/contacts");
    }
  }, [isAuthenticated]);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Admin Dashboard</h1>
          <p>Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="userId">User Id</label>
            <div className="input-wrapper">
              {/* <Mail size={20} className="input-icon" /> */}
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setuserId(e.target.value)}
                placeholder="eg. scSa2SePs"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              {/* <Lock size={20} className="input-icon" /> */}
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Sign In
          </button>

          {/* <div className="demo-credentials">
            <p>Demo credentials:</p>
            <p>userId: admin@example.com</p>
            <p>Password: admin123</p>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default Login;
