import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLearner = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Learner Menu</h2>
      <ul className="space-y-2">
        <li><Link to="/learner" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link></li>
        <li><Link to="/learner/progressTracking" className="block p-2 hover:bg-gray-700 rounded">Progress Tracking</Link></li>
        <li><Link to="/learner/settings" className="block p-2 hover:bg-gray-700 rounded">Settings</Link></li>
        <li><Link to="/learner/speakingPractice" className="block p-2 hover:bg-gray-700 rounded">Speaking Practice</Link></li>
      </ul>
    </div>
  );
};

export default SidebarLearner;