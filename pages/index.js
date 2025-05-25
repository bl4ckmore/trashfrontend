import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://trashapi-1.onrender.com";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const displayedProducts = products.slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center min-h-[320px] flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-xl">
          Giorgi&apos;s Ecommerce
        </h1>
        <Link href="/products">
          <button className="mt-4 bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition">
            Shop Now
          </button>
        </Link>
      </motion.div>

      {/* Featured Products */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Latest Products
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/chatgptLogo.png"
              alt="Loading..."
              className="w-16 h-16 animate-spin"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {displayedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all duration-300 flex flex-col items-center"
              >
                <div className="w-full h-40 mb-4 rounded overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    src={`${BASE_URL}/uploads/${product.image_url}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500 mb-2">${product.price}</p>
                <motion.button
                  onClick={() => addToCart(product)}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition w-full"
                  transition={{ duration: 0.2 }}
                >
                  + Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Final Banner (Merged with About Us) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-black text-white py-16 px-6 text-center"
      >
        <h3 className="text-2xl font-semibold mb-4">Join Our Community</h3>
        <p className="text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
          Welcome to <strong>GiorgiShop</strong>, your trusted place for premium
          products. We focus on high quality, fast delivery, and top-tier
          support. Whether you&apos;re shopping for yourself or gifting someone
          special, you&apos;ll find what you love.
        </p>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto text-sm">
          Sign up now and stay updated on the latest products, limited-time
          offers, and exclusive perks.
        </p>
        {user ? (
          <Link href="/account">
            <button className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-100 transition">
              Go to Account
            </button>
          </Link>
        ) : (
          <Link href="/account">
            <button className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-100 transition">
              Get Started
            </button>
          </Link>
        )}
      </motion.div>
    </div>
  );
}
