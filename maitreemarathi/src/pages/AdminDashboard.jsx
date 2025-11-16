// src/pages/AdminDashboard.jsx
import React, { useState } from "react";

export default function AdminDashboard() {
  const [stats] = useState({
    users: 150,
    lessons: 45,
    earnings: 5200,
  });

  const [users, setUsers] = useState([
    { id: 1, name: "Rohan", status: "Active" },
    { id: 2, name: "Sneha", status: "Pending" },
    { id: 3, name: "Amit", status: "Active" },
  ]);

  const approveUser = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Approved" } : u))
    );
  };

  const rejectUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        Admin Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold text-orange-600">{stats.users}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="text-lg font-semibold">Lessons</h3>
          <p className="text-2xl font-bold text-orange-600">{stats.lessons}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h3 className="text-lg font-semibold">Total Earnings</h3>
          <p className="text-2xl font-bold text-green-600">₹{stats.earnings}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">User Management</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-orange-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.status}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => approveUser(user.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
