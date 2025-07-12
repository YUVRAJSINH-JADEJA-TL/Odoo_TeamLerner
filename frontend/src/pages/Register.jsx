import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.msg || 'Registration failed');
        return;
      }
  
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again later.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center px-4 sm:px-6 md:px-10 lg:px-20" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md bg-white p-6 sm:p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full border-4 border-white shadow flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-green-600">📝</span>
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-green-700">Join ReWear</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
            Sign up to share and receive clothes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['name', 'email', 'password', 'confirmPassword'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {field === 'confirmPassword'
                  ? 'Confirm Password'
                  : field === 'name'
                  ? ' Name'
                  : field}
              </label>
              <input
                type={
                  field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'
                }
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={
                  field === 'email'
                    ? 'you@example.com'
                    : field.includes('password')
                    ? '••••••••'
                    : field === 'name'
                    ? 'Enter name'
                    : `Enter ${field}`
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200 shadow-md">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already a ReWear member?{' '}
          <Link to="/login" className="text-green-700 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
