import React, { useState } from 'react';
import api from '../api/api';

export default function SecurityCheckOut() {
  const [visitorNumber, setVN] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkout = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Fetch visitor list to locate visitor by visitorNumber
      const listRes = await api.get('/visitors', { params: { page: 1, limit: 200 } });
      const visitor = listRes.data.visitors.find(v => v.visitorNumber === visitorNumber);

      if (!visitor) {
        alert("Visitor not found!");
        setLoading(false);
        return;
      }

      // Process checkout
      const res = await api.post(`/visitors/${visitor._id}/checkout`);
      setResult(res.data);

    } catch (err) {
      console.error(err);
      alert("Checkout failed!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-xl mx-auto bg-white p-10 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Visitor Check-Out
        </h1>

        {/* Visitor Number Input */}
        <div className="space-y-4">
          <label className="block text-gray-700 font-medium">
            Visitor Number (VN…)
          </label>

          <input
            type="text"
            value={visitorNumber}
            onChange={(e) => setVN(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 
                       focus:ring-blue-500 outline-none"
            placeholder="Enter Visitor Number"
          />

          <button
            onClick={checkout}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium text-lg transition 
              ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Processing..." : "Check-Out Visitor"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-6">

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Check-Out Successful ✔️
            </h2>

            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {result.name}
            </p>

            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Visit In:</span> {result.visitInTime ? new Date(result.visitInTime).toLocaleString() : "-"}
            </p>

            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Visit Out:</span> {result.visitOutTime ? new Date(result.visitOutTime).toLocaleString() : "-"}
            </p>

            <p className="mt-4 text-green-700 font-semibold text-lg">
              Total Time Spent: {result.totalTimeSpentMinutes || 0} minutes
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
