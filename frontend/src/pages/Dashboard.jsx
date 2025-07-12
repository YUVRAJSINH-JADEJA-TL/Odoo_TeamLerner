import React from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-green-50 px-4 py-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
          <div className="w-32 h-32 rounded-full bg-green-200 border-4 border-white shadow-md"></div>

          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="text-sm font-semibold text-gray-700">Points</div>
            <div className="text-sm font-semibold text-gray-700">Swaps Completed</div>
            <div className="text-sm font-semibold text-gray-700">Active Swaps</div>
            <div className="text-sm font-semibold text-gray-700">Items Uploaded</div>
            <div className="col-span-2">
              <div className="mt-2 p-3 bg-green-100 text-green-700 rounded-xl shadow-inner">
                Welcome back, <strong>YUVRAJSINH JADEJA</strong>!
              </div>
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-green-800 mb-4">My Listings</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white rounded-xl shadow p-3"></div>
            ))}
          </div>
        </div>

        {/* Purchases Section */}
        <div>
          <h3 className="text-xl font-bold text-green-800 mb-4">My Purchases</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white rounded-xl shadow p-3"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}