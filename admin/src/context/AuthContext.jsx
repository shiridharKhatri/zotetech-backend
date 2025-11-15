import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const TOKEN = Cookies.get("admin_auth_token");
  useEffect(() => {
    if (TOKEN) {
      setIsAuthenticated(true);
    }
  }, []);
  const login = async (userId, password) => {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          uniqueId: userId,
          password: password,
        }
      );

      if (response.data.success) {
        setIsAuthenticated(true);
        return response.data;
      }
    } catch (error) {
      return error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove("admin_auth_token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
