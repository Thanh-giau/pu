import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Admin Dashboard</h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600 mb-4">Chào mừng đến trang quản lý admin!</p>
        <ul className="list-disc list-inside text-gray-800">
          <li>Quản lý người dùng</li>
          <li>Xem báo cáo</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;