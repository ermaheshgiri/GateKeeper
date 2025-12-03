import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function VisitorList() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/visitors', { params: { page: 1, limit: 100 } });
        setVisitors(res.data.visitors || []);
      } catch (err) {
        console.error(err);
        alert("Error loading visitors");
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Visitor List</h1>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-10 text-gray-500">
            <div className="animate-spin h-8 w-8 border-4 border-blue-400 border-t-transparent mx-auto rounded-full"></div>
            <p className="mt-3">Loading visitors...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && visitors.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-lg">
            No visitors found.
          </div>
        )}

        {/* Table */}
        {!loading && visitors.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50 border-b border-blue-100 text-left">
                  <th className="p-3 font-semibold text-gray-700">VN</th>
                  <th className="p-3 font-semibold text-gray-700">Name</th>
                  <th className="p-3 font-semibold text-gray-700">Purpose</th>
                  <th className="p-3 font-semibold text-gray-700">In Time</th>
                  <th className="p-3 font-semibold text-gray-700">Out Time</th>
                  <th className="p-3 font-semibold text-gray-700">Duration</th>
                </tr>
              </thead>

              <tbody>
                {visitors.map((v) => (
                  <tr
                    key={v._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium text-gray-800">{v.visitorNumber}</td>
                    <td className="p-3 text-gray-700">{v.name}</td>
                    <td class="p-3 text-gray-700">{v.purpose || "-"}</td>
                    <td className="p-3 text-gray-600">
                      {v.visitInTime ? new Date(v.visitInTime).toLocaleString() : "-"}
                    </td>
                    <td className="p-3 text-gray-600">
                      {v.visitOutTime ? new Date(v.visitOutTime).toLocaleString() : "-"}
                    </td>

                    <td className="p-3">
                      {v.totalTimeSpentMinutes
                        ? <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {v.totalTimeSpentMinutes} min
                          </span>
                        : <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                            Ongoing
                          </span>
                      }
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
