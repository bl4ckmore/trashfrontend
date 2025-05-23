import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="border-b py-4 flex justify-between">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">x {item.quantity}</p>
              </div>
              <div className="text-right">
                <p>${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-600 text-sm">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right font-bold text-xl">
            Total: ${total.toFixed(2)}
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button onClick={clearCart} className="bg-gray-300 px-4 py-2 rounded">
              Clear Cart
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Checkout (Coming Soon)
            </button>
          </div>
        </>
      )}
    </div>
  );
}
