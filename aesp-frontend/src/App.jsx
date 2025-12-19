// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// COMMON
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import Home from "./pages/common/Home";
import About from "./pages/common/About";

// LEARNER
import LearnerLayout from "./pages/learner/LearnerLayout";
import LearnerDashboard from "./pages/learner/LearnerDashboard";
import SpeakingPractice from "./pages/learner/SpeakingPractice";
import ProgressTracking from "./pages/learner/ProgressTracking";
import Settings from "./pages/learner/Settings";
import Payment from "./pages/learner/Payment";
import CourseList from "./pages/learner/CourseList";
import Assessment from "./pages/learner/Assessment"; // <- THEM

// MENTOR
import MentorLayout from "./pages/mentor/MentorLayout";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import LearnerFeedback from "./pages/mentor/LearnerFeedback";
import ResourceManagement from "./pages/mentor/ResourceManagement";
import MentorSettings from "./pages/mentor/MentorSettings";


// ADMIN
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import PackageManagement from "./pages/admin/PackageManagement";
import Reports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/SettingsAdmin";

import ProtectedRoute from "./routes/ProtectedRoute";

const FullscreenLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-indigo-900/20">
    {children}
  </div>
);

const DefaultLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* FULLSCREEN */}
        <Route
          path="/"
          element={
            <FullscreenLayout>
              <Home />
            </FullscreenLayout>
          }
        />
        <Route
          path="/login"
          element={
            <FullscreenLayout>
              <Login />
            </FullscreenLayout>
          }
        />
        <Route
          path="/register"
          element={
            <FullscreenLayout>
              <Register />
            </FullscreenLayout>
          }
        />

        <Route
          path="/about"
          element={
            <FullscreenLayout>
              <About />
            </FullscreenLayout>
          }
        />

        {/* LEARNER */}
        <Route
          path="/learner/*"
          element={
            <ProtectedRoute roles={["learner", "mentor", "admin"]}>
              <LearnerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<LearnerDashboard />} />
          <Route path="assessment" element={<Assessment />} /> 
          <Route path="speaking" element={<SpeakingPractice />} />
          <Route path="progress" element={<ProgressTracking />} />
          <Route path="payment" element={<Payment />} />
          <Route path="settings" element={<Settings />} />
          <Route path="courses" element={<CourseList />} />
        </Route>

        {/* MENTOR */}
        <Route
          path="/mentor/*"
          element={
            <ProtectedRoute roles={["mentor", "admin"]}>
              <MentorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MentorDashboard />} />
          <Route path="feedback" element={<LearnerFeedback />} />
          <Route path="resources" element={<ResourceManagement />} />
          <Route path="settings" element={<MentorSettings />} />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="packages" element={<PackageManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
