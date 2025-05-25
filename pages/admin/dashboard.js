import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${BASE_URL}/api/products/${id}`);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert('Error deleting product.');
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/product-form">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Add Product
          </button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const imagePath = product.image_url?.startsWith('/uploads')
              ? `${BASE_URL}${product.image_url}`
              : `${BASE_URL}/uploads/${product.image_url}`;

            return (
              <div
                key={product.id}
                className="border p-4 rounded shadow hover:shadow-md transition relative"
              >
                <img
                  src={imagePath}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/fallback.jpg';
                  }}
                />
                <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
                <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>
                <p className="text-sm text-gray-500">Category: {product.category}</p>
                <p className="text-green-600 font-bold">${product.price}</p>

                <div className="flex gap-2 mt-4">
                  <Link href={`/admin/product-form/${product.id}`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
