import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex gap-6 text-lg font-semibold">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        {user?.role === 'admin' && (
          <Link href="/admin/dashboard">Admin</Link>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <Link href="/cart">
          <div className="relative">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
        </Link>
        <div>
          {user ? (
            <button onClick={logout} className="text-sm underline text-red-500">Logout</button>
          ) : (
            <Link href="/account">
              <button className="text-sm underline">Account</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
