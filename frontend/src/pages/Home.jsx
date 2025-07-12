import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-green-700">Welcome to ReWear</h1>
        <p className="mt-4">Exchange unused clothing & reduce waste 🌱</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/add-item" className="bg-green-600 text-white px-4 py-2 rounded">List an Item</Link>
          <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded">Start Swapping</Link>
        </div>
      </div>
    </>
  );
}
