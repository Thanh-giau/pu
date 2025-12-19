import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/common/Login';
import Register from '../pages/common/Register';
import LearnerDashboard from '../pages/learner/LearnerDashboard';
import ProgressTracking from '../pages/learner/ProgressTracking';
import Settings from '../pages/learner/Settings';
import SpeakingPractice from '../pages/learner/SpeakingPractice';
import MentorDashboard from '../pages/mentor/MentorDashboard';
import LearnerFeedback from '../pages/mentor/LearnerFeedback';
import ResourceManagement from '../pages/mentor/ResourceManagement';
import AdminDashboard from '../pages/admin/AdminDashboard';
import PackageManagement from '../pages/admin/PackageManagement';
import Reports from '../pages/admin/Reports';
import SettingsAdmin from '../pages/admin/Settings';
import UserManagement from '../pages/admin/UserManagement';
import About from '../pages/common/About';
import Home from '../pages/common/Home';
import ProtectedRoute from './ProtectedRoute';
import SidebarLearner from '../components/SidebarLearner';
import SidebarMentor from '../components/SidebarMentor';
import SidebarAdmin from '../components/SidebarAdmin';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Navigate to="/login" />} /> {/* Chuyển hướng mặc định về login */}
      <Route 
        path="/learner" 
        element={
          <ProtectedRoute roles={['learner', 'mentor', 'admin']}>
            <div className="flex">
              <SidebarLearner />
              <div className="flex-1 p-6"><LearnerDashboard /></div>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/learner/progressTracking" 
        element={
          <ProtectedRoute roles={['learner', 'mentor', 'admin']}>
            <div className="flex">
              <SidebarLearner />
              <div className="flex-1 p-6"><ProgressTracking /></div>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/learner/settings" 
        element={
          <ProtectedRoute roles={['learner', 'mentor', 'admin']}>
            <div className="flex">
              <SidebarLearner />
              <div className="flex-1 p-6"><Settings /></div>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/learner/speakingPractice" 
        element={
          <ProtectedRoute roles={['learner', 'mentor', 'admin']}>
            <div className="flex">
              <SidebarLearner />
              <div className="flex-1 p-6"><SpeakingPractice /></div>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mentor" 
        element={
          <ProtectedRoute roles={['mentor', 'admin']}>
            <div className="flex">
              <SidebarMentor />
              <div className="flex-1 p-6"><MentorDashboard /></div>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mentor/learnerFeedback" 
        element={
          <ProtectedRoute roles={['mentor', 'admin']}>
            <div className="flex">
              <SidebarMentor />
              <div className="flex-1 p-6"><LearnerFeedback /></div>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mentor/resourceManagement" 
        element={
          <ProtectedRoute roles={['mentor', 'admin']}>
            <div className="flex">
              <SidebarMentor />
              <div className="flex-1 p-6"><ResourceManagement /></div>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute roles={['admin']}>
            <div className="flex">
              <SidebarAdmin />
              <div className="flex-1 p-6"><AdminDashboard /></div>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/packageManagement" 
        element={
          <ProtectedRoute roles={['admin']}>
            <div className="flex">
              <SidebarAdmin />
              <div className="flex-1 p-6"><PackageManagement /></div>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/reports" 
        element={
          <ProtectedRoute roles={['admin']}>
            <div className="flex">
              <SidebarAdmin />
              <div className="flex-1 p-6"><Reports /></div>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/settings" 
        element={
          <ProtectedRoute roles={['admin']}>
            <div className="flex">
              <SidebarAdmin />
              <div className="flex-1 p-6"><SettingsAdmin /></div>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/userManagement" 
        element={
          <ProtectedRoute roles={['admin']}>
            <div className="flex">
              <SidebarAdmin />
              <div className="flex-1 p-6"><UserManagement /></div>
            </div>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRouter;