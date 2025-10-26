import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UploadChat from "./pages/UploadChat.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-chat"
          element={
            <ProtectedRoute>
              <UploadChat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App; // ✅ Must have default export
