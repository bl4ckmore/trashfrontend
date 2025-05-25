import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '@/context/CartContext';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL}/...`

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/api/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  const imagePath = product.image_url?.startsWith('/uploads')
    ? `${BASE_URL}${product.image_url}`
    : `${BASE_URL}/uploads/${product.image_url}`;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={imagePath}
        alt={product.name}
        className="w-full h-80 object-cover rounded shadow"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/fallback.jpg'; // must exist in /public/
        }}
      />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-green-600 text-xl font-semibold mt-4">${product.price}</p>
      <p className="text-sm text-gray-400 mt-1">Category: {product.category}</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
