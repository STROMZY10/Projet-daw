import React from 'react';
import { Link } from 'react-router-dom'; // Add this import

const ProductCard = ({ product, quantity, onIncrement, onDecrement }) => {
  return (
    <div style={{
      border: "1px solid #2b9b8e",
      padding: "16px",
      borderRadius: "8px",
      backgroundColor: "#3a0a3d",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Make product name and image clickable */}
      <Link 
        to={`/product/${product.id}`} 
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <h3 style={{ cursor: 'pointer', '&:hover': { color: '#5a67d8' } }}>{product.name}</h3>
        <img 
          src={product.image} 
          alt={product.name}
          style={{
            maxWidth: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "4px",
            margin: "10px 0",
            cursor: 'pointer'
          }}
        />
      </Link>
      
      <p style={{ color: "#ff6b6b", fontWeight: "bold" }}>{product.price} DZD</p>
      
      {/* Add rating display (if available in product data) */}
      {product.rating && (
        <div style={{ margin: '8px 0', color: '#FFD700' }}>
          {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
        </div>
      )}
      
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginTop: "auto"
      }}>
        <button 
          onClick={onDecrement}
          style={{
            background: "#5a67d8",
            color: "white",
            border: "none",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            cursor: "pointer"
          }}
        >-</button>
        
        <span>{quantity}</span>
        
        <button 
          onClick={onIncrement}
          style={{
            background: "#5a67d8",
            color: "white",
            border: "none",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            cursor: "pointer"
          }}
        >+</button>
        
        <button 
          style={{
            marginLeft: "auto",
            background: "#ff6b6b",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 