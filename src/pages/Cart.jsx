import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const decreaseQty = (product) => {
    if (product.quantity === 1) {
      removeFromCart(product.id);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.location.reload(); // Simple refresh for state update
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p>{item.price} DZD</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button onClick={() => decreaseQty(item)} className="px-2 py-1 bg-gray-200">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)} className="px-2 py-1 bg-gray-200">+</button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 text-lg font-bold">
            Total: {totalPrice.toLocaleString()} DZD
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;  
 