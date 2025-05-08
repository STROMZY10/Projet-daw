import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, clearCart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [reviews, setReviews] = useState({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleReviewChange = (productId, reviewText) => {
    setReviews(prev => ({ ...prev, [productId]: reviewText }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      customer,
      items: cartItems,
      reviews,
      total: cartTotal,
      date: new Date().toISOString()
    };

    console.log("Order submitted:", orderData);
    
    clearCart();
    setOrderConfirmed(true);
  };

  if (orderConfirmed) {
    return (
      <div className="order-confirmation">
        <h2>Order Confirmed!</h2>
        <p>Thank you, {customer.name}!</p>
        <p>A confirmation has been sent to {customer.email}</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <h3>Customer Information</h3>
        <input
          name="name"
          placeholder="Full Name"
          value={customer.name}
          onChange={handleInputChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={customer.address}
          onChange={handleInputChange}
          required
          rows={4}
        />

        <h3>Order Summary (${cartTotal.toFixed(2)})</h3>
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div>
              <h4>{item.name}</h4>
              <p>{item.quantity} × ${item.price.toFixed(2)}</p>
            </div>
            <textarea
              placeholder={`Review for ${item.name}`}
              value={reviews[item.id] || ''}
              onChange={(e) => handleReviewChange(item.id, e.target.value)}
              rows={2}
            />
          </div>
        ))}

        <button type="submit" disabled={cartItems.length === 0}>
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
