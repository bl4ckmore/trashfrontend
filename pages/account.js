import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AccountPage() {
  const { user, login, logout } = useAuth();
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const endpoint = isRegister
        ? `${BASE_URL}/api/auth/register`
        : `${BASE_URL}/api/auth/login`;

      const res = await axios.post(endpoint, { email, password });
      login(res.data.user);
      router.push('/account');
    } catch (err) {
      console.error(err);
      setError('❌ ' + (err.response?.data?.message || 'Request failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">
            {isRegister ? 'Create Account' : 'Account Login'}
          </h1>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
          </button>

          <p className="text-sm text-center mt-4">
            {isRegister ? 'Already have an account?' : 'New user?'}{' '}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="text-black underline hover:text-gray-800"
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>

        <div className="text-left mb-6">
          <p className="text-gray-700 text-sm">
            Email: <span className="font-medium">{user.email}</span>
          </p>
          <p className="text-gray-700 text-sm">
            Role: <span className="font-medium capitalize">{user.role}</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
