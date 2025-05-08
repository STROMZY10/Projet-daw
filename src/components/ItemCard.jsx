import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaCheck, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";

const ItemCard = ({ product }) => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  
  
  const itemInCart = cartItems.find(item => item.id === product.id);
  const initialQuantity = itemInCart ? itemInCart.quantity : 1;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setShowSuccess(true);
    
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 0 ? prev - 1 : 1));

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "16px",
        textAlign: "center",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
      }}
    >
      {/* New Arrival Badge */}
      {product.views < 10 && (
        <span style={{
          position: "absolute",
          top: "8px",
          left: "8px",
          backgroundColor: "#5a67d8",
          color: "white",
          padding: "4px 8px",
          fontSize: "12px",
          borderRadius: "4px",
          zIndex: 1
        }}>
          New Arrival
        </span>
      )}

      {/* Product Image & Link to Detail */}
      <Link 
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "12px"
          }}
        />

        <h3 style={{ 
          margin: "12px 0 4px", 
          color: "#333",
          fontSize: "1rem",
          fontWeight: "600"
        }}>
          {product.name}
        </h3>
        <p style={{ 
          fontWeight: "bold", 
          color: "#5a67d8",
          fontSize: "1.1rem",
          margin: "8px 0"
        }}>
          {product.price.toLocaleString()} DZD
        </p>
      </Link>

      {/* Quantity Controls */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        margin: "12px 0",
        gap: "8px"
      }}>
        <button 
          onClick={decrementQuantity}
          style={{
            background: "#f0f0f0",
            border: "none",
            borderRadius: "4px",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <FaMinus size={12} />
        </button>
        
        <span style={{ 
          minWidth: "30px", 
          textAlign: "center",
          fontWeight: "500"
        }}>
          {quantity}
        </span>
        
        <button 
          onClick={incrementQuantity}
          style={{
            background: "#f0f0f0",
            border: "none",
            borderRadius: "4px",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <FaPlus size={12} />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "auto",
          padding: "10px 16px",
          backgroundColor: showSuccess ? "#38a169" : "#5a67d8",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "all 0.3s ease",
          fontWeight: "500"
        }}
        disabled={showSuccess}
      >
        {showSuccess ? (
          <>
            <FaCheck /> Added to Cart
          </>
        ) : (
          <>
            <FaShoppingCart /> Add to Cart
          </>
        )}
      </button>

      {/* Stock indicator */}
      {product.stock && (
        <p style={{ 
          fontSize: "0.8rem", 
          color: "#666",
          marginTop: "8px"
        }}>
          {product.stock > 5 
            ? `${product.stock} available` 
            : `Only ${product.stock} left!`}
        </p>
      )}
    </div>
  );
};

export default ItemCard;