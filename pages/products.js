import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="cursor-pointer border p-4 rounded shadow hover:shadow-lg transition">
              <img
                src={`http://localhost:5000/uploads/${product.image_url}`}
                alt={product.name}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-green-600 font-bold">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
