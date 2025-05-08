import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/data";
import ProductCard from "../components/ProductCard";


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  const handleQuantityChange = (productId, newValue) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, newValue)
    }));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const goToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>🕰️ Luxury Watch Store</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search watches..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "30px",
          border: "1px solid #ccc",
          borderRadius: "8px"
        }}
      />

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px"
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id]}
            onIncrement={() =>
              handleQuantityChange(product.id, quantities[product.id] + 1)
            }
            onDecrement={() =>
              handleQuantityChange(product.id, quantities[product.id] - 1)
            }
            onViewDetail={() => goToProductDetail(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
 
 