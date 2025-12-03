import React, { useState } from 'react';
import api from '../api/api';

export default function SecurityCheckIn() {
  const [visitorNumber, setVN] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Find visitor by visitorNumber
      const listRes = await api.get('/visitors', { params: { page: 1, limit: 100 } });
      const visitor = listRes.data.visitors.find(v => v.visitorNumber === visitorNumber);

      if (!visitor) {
        alert("Visitor not found!");
        setLoading(false);
        return;
      }

      const fd = new FormData();
      if (photo) fd.append('photo', photo);

      const res = await api.post(`/visitors/${visitor._id}/checkin`, fd);

      alert(`Checked In ✔️ \nTime: ${new Date(res.data.visitInTime).toLocaleString()}`);

      // Reset form
      setVN('');
      setPhoto(null);
      setPreview(null);

    } catch (err) {
      console.error(err);
      alert("Check-in failed!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-xl mx-auto bg-white p-10 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Visitor Check-In
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Visitor Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Visitor Number (VN…)
            </label>
            <input
              type="text"
              value={visitorNumber}
              onChange={(e) => setVN(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 
                         focus:ring-blue-500 outline-none"
              placeholder="Enter Visitor Number"
            />
          </div>

          {/* Upload Photo */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Capture / Upload Visitor Photo
            </label>

            <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 flex flex-col items-center">

              {/* Preview */}
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-xl shadow-md mb-3"
                />
              ) : (
                <div className="w-40 h-40 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-3"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium text-lg transition 
              ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loading ? "Checking In..." : "Check-In Visitor"}
          </button>

        </form>

      </div>

    </div>
  );
}
