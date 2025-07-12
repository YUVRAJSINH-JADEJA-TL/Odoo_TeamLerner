import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const [points, setPoints] = useState(0);
  const [uploads, setUploads] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [pending, setPending] = useState([]);
  const { user } = useContext(AuthContext);

  // const username = 'YUVRAJSINH JADEJA'; // TODO: Replace with real user context

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [pointsRes, uploadsRes, historyRes, requestsRes] = await Promise.all([
          API.get('/dashboard/points'),
          API.get('/dashboard/uploads'),
          API.get('/dashboard/history'),
          API.get('/dashboard/requests')
        ]);
        setPoints(pointsRes.data.points);
        setUploads(uploadsRes.data);
        setSwaps(historyRes.data);
        setPending(requestsRes.data);
      } catch (err) {
        console.error('Failed to load dashboard:', err.response?.data?.msg || err.message);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-green-50 px-4 py-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
            <div className="w-32 h-32 rounded-full bg-green-200 border-4 border-white shadow-md"></div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="text-sm font-semibold text-gray-700">Points: {points}</div>
              <div className="text-sm font-semibold text-gray-700">Swaps Completed: {swaps.length}</div>
              <div className="text-sm font-semibold text-gray-700">Active Swaps: {pending.length}</div>
              <div className="text-sm font-semibold text-gray-700">Items Uploaded: {uploads.length}</div>
              <div className="col-span-2">
                <div className="mt-2 p-3 bg-green-100 text-green-700 rounded-xl shadow-inner">
                  Welcome back, <strong>{user?.name}!</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Listings Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-green-800 mb-4">My Listings</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {uploads.map((item) => (
                <div key={item._id} className="aspect-[3/4] bg-white rounded-xl shadow p-3">
                  <img src={item.images[0]} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Purchases Section */}
          <div>
            <h3 className="text-xl font-bold text-green-800 mb-4">My Purchases</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {swaps.map((item) => (
                <div key={item._id} className="aspect-[3/4] bg-white rounded-xl shadow p-3">
                  <img src={item.images[0]} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-green-600">Swapped</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
