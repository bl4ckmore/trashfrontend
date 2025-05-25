import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductForm() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image_url: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`${BASE_URL}/api/products/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error('Fetch error:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (const key in form) {
      data.append(key, form[key]);
    }
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (id) {
        await axios.put(`${BASE_URL}/api/products/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('✅ Product updated!');
      } else {
        await axios.post(`${BASE_URL}/api/products`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('✅ Product created!');
      }
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Save error:', err);
      alert('❌ Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {id ? 'Edit Product' : 'Add Product'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          step="0.01"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="w-40 h-40 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          disabled={loading}
        >
          {loading
            ? id
              ? 'Updating...'
              : 'Creating...'
            : id
            ? 'Update Product'
            : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
