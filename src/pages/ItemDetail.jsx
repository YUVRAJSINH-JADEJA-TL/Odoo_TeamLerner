import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ItemDetail() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Product Detail - {id}</h2>
        <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg">
          {/* Left: Image Upload/Gallery */}
          <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 p-4 rounded-xl bg-gray-50">
            <span className="text-gray-500">Image gallery here</span>
          </div>

          {/* Right: Product Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Add Product Description</h3>
            <p className="text-gray-700 mb-2">This is the full item description. Details about material, size, condition, etc.</p>
            <p className="text-gray-600 mb-1">Uploader: <span className="font-medium text-gray-800">John Doe</span></p>
            <p className="text-gray-600 mb-3">Status: <span className="text-green-600 font-semibold">Available</span></p>
            <div className="flex gap-4 mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">Swap Request</button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">Redeem via Points</button>
            </div>
          </div>
        </div>

        {/* Previous Listings */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-green-800 mb-4">Previous Listings</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white rounded-xl shadow p-3"></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}