import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filteredData = [...products];

    if (search.trim()) {
      filteredData = filteredData.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "priceLow") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (sort === "priceHigh") {
      filteredData.sort((a, b) => b.price - a.price);
    }

    setFiltered(filteredData);
  }, [search, sort, products]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="default">Sort</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/chatgptLogo.png"
            alt="Loading..."
            className="w-16 h-16 animate-spin"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all flex flex-col"
            >
              <Link href={`/product/${product.id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE_URL}/uploads/${product.image_url}`}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback.jpg";
                  }}
                />
              </Link>
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="text-green-600 font-bold">${product.price}</p>
              </div>
              <motion.button
                onClick={() => addToCart(product)}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                + Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
