import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import AdminLogin from "./components/admin/AdminLogin.tsx";
import AdminDashboard from "./components/admin/AdminDashboard.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext.tsx"; // ✅ import this
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <Toaster position="top-right" richColors />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
