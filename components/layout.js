// components/Layout.js
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { cart } = useCart();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const navLinkStyle = (path) =>
    `relative pb-1 transition-colors duration-200 ${
      router.pathname === path
        ? "text-black border-b-2 border-black"
        : "text-gray-700 hover:text-black hover:border-b-2 hover:border-black"
    }`;

  return (
    <>
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            GiorgiShop
          </Link>

          <div className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className={navLinkStyle("/")}>
              Home
            </Link>
            <Link href="/products" className={navLinkStyle("/products")}>
              Products
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin/dashboard"
                className={navLinkStyle("/admin/dashboard")}
              >
                Admin
              </Link>
            )}
            <Link href="/account" className={navLinkStyle("/account")}>
              Account
            </Link>
            <Link href="/cart" className="relative text-xl hover:text-black">
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </>
  );
}
