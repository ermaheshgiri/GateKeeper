import React, { useState } from 'react';
import api from '../api/api';

export default function VisitorForm() {

  const [form, setForm] = useState({
    name: '',
    mobileNumber: '',
    purpose: '',
    numberOfPersons: 1,
    vehicleNumber: '',
  });

  const [loading, setLoading] = useState(false);

  const update = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/visitors', form);
      alert("Visitor Created Successfully!");
      setForm({
        name: '',
        mobileNumber: '',
        purpose: '',
        numberOfPersons: 1,
        vehicleNumber: '',
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error creating visitor");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Visitor
        </h1>

        <form className="space-y-6" onSubmit={submit}>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Visitor Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter visitor name"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              value={form.mobileNumber}
              onChange={(e) => update("mobileNumber", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter mobile number"
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Purpose of Visit
            </label>
            <input
              type="text"
              value={form.ppurpose}
              onChange={(e) => update("purpose", e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Meeting, Delivery, Personal, etc."
            />
          </div>

          {/* Number of persons */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Number of Persons
            </label>
            <input
              type="number"
              min="1"
              value={form.numberOfPersons}
              onChange={(e) => update("numberOfPersons", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Vehicle No */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Vehicle Number (optional)
            </label>
            <input
              type="text"
              value={form.vehicleNumber}
              onChange={(e) => update("vehicleNumber", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="KL-07-AB-1234"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-medium text-lg transition 
                ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loading ? "Creating..." : "Create Visitor"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
