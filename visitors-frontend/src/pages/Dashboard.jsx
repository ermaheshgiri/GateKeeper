import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const username = localStorage.getItem('username') || 'User';
  const role = localStorage.getItem('role') || 'Role';

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Top Navbar */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-blue-600">Visitors App</h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">
            {username} <span className="text-sm text-gray-500">({role})</span>
          </span>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm mt-4 mx-auto w-[92%] max-w-4xl rounded-lg p-4 flex justify-center gap-8 text-blue-600 font-medium">
        <Link className="hover:text-blue-800 transition" to="/visitors">
          Visitor List
        </Link>
        <Link className="hover:text-blue-800 transition" to="/visitors/create">
          Create Visitor
        </Link>
        <Link className="hover:text-blue-800 transition" to="/security/checkin">
          Check-In
        </Link>
        <Link className="hover:text-blue-800 transition" to="/security/checkout">
          Check-Out
        </Link>
      </nav>

      {/* Main Card */}
      <main className="flex justify-center mt-10 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Welcome, {username}! 👋
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Use the navigation above to manage visitor records and perform check-in/check-out operations.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-700 mb-1">Admin Tools</h3>
              <p className="text-gray-600 text-sm">Manage visitors and create new entries.</p>
            </div>

            <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-700 mb-1">Security Tools</h3>
              <p className="text-gray-600 text-sm">Perform visitor check-in and check-out.</p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
