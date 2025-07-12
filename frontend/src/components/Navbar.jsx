import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-3 px-6 sm:px-10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="text-green-700 text-2xl font-bold">ReWear</div>
      </div>
      <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
        <Link to="/" className="hover:text-green-700 transition">Home</Link>
        <Link to="/dashboard" className="hover:text-green-700 transition">Dashboard</Link>
        <Link to="/add-item" className="hover:text-green-700 transition">List Item</Link>
        <Link to="/login" className="hover:text-green-700 transition">Login</Link>
        <Link to="/register" className="hover:text-green-700 transition">Register</Link>
      </div>
    </nav>
  );
}