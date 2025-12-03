import React, { useState } from 'react';
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setU] = useState('');
  const [password, setP] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);
      nav("/");
    } catch (err) {
  console.error(err);
  alert("Invalid username or password");
}

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center px-4">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Visitors Management
        </h1>

        <form className="space-y-6" onSubmit={submit}>

          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setU(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 
                         focus:ring-blue-500 outline-none"
              placeholder="Enter username"
            />
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setP(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 
                         focus:ring-blue-500 outline-none"
              placeholder="Enter password"
            />
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition 
              ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Powered by MERN Stack
        </p>

      </div>

    </div>
  );
}
