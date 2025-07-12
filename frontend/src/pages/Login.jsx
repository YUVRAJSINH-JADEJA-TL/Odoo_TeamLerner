import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.msg || 'Login failed');
        return;
      }
  
      // Store JWT in localStorage (or cookie if needed)
      localStorage.setItem('token', data.token);
      
      // Save user context (if using AuthContext properly)
      login(data.user);
  
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4 sm:px-6 md:px-10 lg:px-20" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md bg-white p-6 sm:p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full border-4 border-white shadow flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-green-600">🔐</span>
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-green-700">
            Welcome Back to ReWear
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
            Login to exchange and explore fashion.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
          >
            Sign In to ReWear
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-700 font-semibold hover:underline">
            Join ReWear
          </Link>
        </p>
      </div>
    </div>
  );
}
