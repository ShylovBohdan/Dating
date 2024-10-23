import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";
import LandingPage from "./components/landing/LandingPage";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") // Перевірка токена у localStorage для збереження стану
  );

  const updateAuthenticationState = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  return (
    <Router>
      <Routes>
        {/* Публічні сторінки */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <LoginPage updateAuthenticationState={updateAuthenticationState} />
          }
        />
        <Route path="/signup" element={<SignupPage />} />

        {/* Захищені сторінки */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout updateAuthenticationState={updateAuthenticationState}>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        {/* Інші захищені сторінки */}
        {/* ... */}
      </Routes>
    </Router>
  );
};

export default App;
