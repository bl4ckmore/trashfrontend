import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
        Welcome to Giorgi’s Marketplace 🛍️
      </h1>
      <p className="text-gray-600 max-w-xl text-lg mb-8">
        Discover amazing products at great prices. Shop now and enjoy a smooth, fast shopping experience!
      </p>
      <Link href="/products">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
          Browse Products
        </button>
      </Link>
    </div>
  );
}
