import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../utils/api';

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await API.get(`/items/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error('Failed to fetch item details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return <div className="p-6">Loading item details...</div>;
  if (!item) return <div className="p-6 text-red-600">Item not found.</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Product Detail - {item.title}</h2>

        <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg">
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-2">
            {item.images && item.images.length > 0 ? (
              item.images.map((url, index) => (
                <img key={index} src={url} alt={`Item image ${index}`} className="w-full rounded-xl border" />
              ))
            ) : (
              <div className="text-gray-500">No images available</div>
            )}
          </div>

          {/* Right: Details */}
          <div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-700 mb-3">{item.description}</p>

            <p className="text-gray-600 mb-1">
              Uploader: <span className="font-medium text-gray-800">{item.uploader?.name || 'Unknown'}</span>
            </p>
            <p className="text-gray-600 mb-3">
              Status:{' '}
              <span className={`font-semibold ${item.status === 'available' ? 'text-green-600' : 'text-red-500'}`}>
                {item.status}
              </span>
            </p>

            <div className="flex gap-4 mt-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                onClick={() => alert('Swap request feature coming soon')}
              >
                Swap Request
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                onClick={() => alert('Redeem via points feature coming soon')}
              >
                Redeem via Points
              </button>
            </div>
          </div>
        </div>

        {/* Optional: Previous Listings or Related Items */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-green-800 mb-4">You might also like</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white rounded-xl shadow p-3" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
