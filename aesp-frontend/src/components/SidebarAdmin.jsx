import React from 'react';
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
      <ul className="space-y-2">
        <li><Link to="/admin" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link></li>
        <li><Link to="/admin/packageManagement" className="block p-2 hover:bg-gray-700 rounded">Package Management</Link></li>
        <li><Link to="/admin/reports" className="block p-2 hover:bg-gray-700 rounded">Reports</Link></li>
        <li><Link to="/admin/settings" className="block p-2 hover:bg-gray-700 rounded">Settings</Link></li>
        <li><Link to="/admin/userManagement" className="block p-2 hover:bg-gray-700 rounded">User Management</Link></li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;