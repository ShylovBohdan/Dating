import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";
import LandingPage from "./components/landing/LandingPage";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import AdminPage from "./components/AdminPage";
import { useUserStore } from "./store/UserStore";
import DialogList from "./components/DialogList";
import Search from "./components/Search";
import Settings from "./components/Settings";
import Chat from "./components/ChatPage";
import Profile from "./components/Profile";
import Serf from "./components/search/Serf";

const App: React.FC = () => {
  const userRole = useUserStore.getState().role;
  return (
    <Router>
      <Routes>
        {/* Публічні сторінки */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Домашня сторінка (захищена) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowAllRegistered={true} userRole={""}>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dialogs"
          element={
            <ProtectedRoute allowAllRegistered={true} userRole={""}>
              <MainLayout>
                <DialogList />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:partnerId"
          element={
            <ProtectedRoute allowAllRegistered={true} userRole={""}>
              <MainLayout>
                <Chat />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute allowAllRegistered={true} userRole={""}>
              <MainLayout>
                <Search />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowAllRegistered={true} userRole={""}>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowAllRegistered={true} userRole={""}>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/serf"
          element={
            <ProtectedRoute allowAllRegistered={true} userRole={""}>
              <MainLayout>
                <Serf />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Адміністративна сторінка (захищена, тільки для admin) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute userRole={userRole} requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
