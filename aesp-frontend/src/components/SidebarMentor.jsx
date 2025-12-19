import React from 'react';
import { Link } from 'react-router-dom';

const SidebarMentor = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Mentor Menu</h2>
      <ul className="space-y-2">
        <li><Link to="/mentor" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link></li>
        <li><Link to="/mentor/learnerFeedback" className="block p-2 hover:bg-gray-700 rounded">Learner Feedback</Link></li>
        <li><Link to="/mentor/resourceManagement" className="block p-2 hover:bg-gray-700 rounded">Resource Management</Link></li>
      </ul>
    </div>
  );
};

export default SidebarMentor;