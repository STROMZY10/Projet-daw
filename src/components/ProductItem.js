import React from 'react';
import { useCart } from '../context/CartContext';

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button 
        onClick={() => addToCart(product)}
        className="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem; 