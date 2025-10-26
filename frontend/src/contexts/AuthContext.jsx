import React, { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Register
  const register = async (username, email, password) => {
    try {
      const res = await api.post("/auth/register", { username, email, password });
      setUser(res.data);
      return { success: true, message: "✅ Registered successfully!" };
    } catch (err) {
      console.error(err);
      return { success: false, message: "❌ Registration failed!" };
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      setUser({ email });
      return { success: true, message: "✅ Login successful!" };
    } catch (err) {
      console.error(err);
      return { success: false, message: "❌ Invalid email or password!" };
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
