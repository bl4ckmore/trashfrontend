import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

export default function AccountPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const endpoint = isRegister
        ? 'http://localhost:5000/api/auth/register'
        : 'http://localhost:5000/api/auth/login';

      const res = await axios.post(endpoint, {
        email,
        password
      });

      login(res.data.user); // stores { email, role }
      router.push('/');
    } catch (err) {
      console.error(err);
      setError('❌ ' + (err.response?.data?.error || 'Request failed'));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isRegister ? 'Create Account' : 'Account Login'}
      </h1>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isRegister ? 'Register' : 'Login'}
      </button>

      <p className="text-sm text-center mt-4">
        {isRegister ? 'Already have an account?' : 'New user?'}{' '}
        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setError('');
          }}
          className="text-blue-600 underline"
        >
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
}
