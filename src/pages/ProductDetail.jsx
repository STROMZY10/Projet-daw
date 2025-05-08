// src/pages/ProductDetail.jsx
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import products from '../data/data.js'; // make sure this path is correct

function ProductDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productId = Number(id);

    if (state?.product) {
      setProduct(state.product);
      return;
    }

    const foundProduct = products.find(p => p.id === productId);
    setProduct(foundProduct || null);
  }, [id, state]);

  if (!product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <p>No product exists with ID: {id}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>{product.name}</h1>
      <div style={{ margin: '2rem 0' }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{ maxWidth: '100%', height: 'auto' }}
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg';
            e.target.alt = 'Placeholder image';
          }}
        />
      </div>
      
      <div style={{ margin: '1rem 0', fontSize: '1.5rem' }}>
        Price: ${product.price.toLocaleString()}
      </div>

      <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
        <span>Views: {product.views}</span>
        <span>Sold: {product.sold}</span>
      </div>

      {product.reviews?.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Customer Reviews:</h3>
          {product.reviews.map((review, index) => (
            <div 
              key={index} 
              style={{
                padding: '1rem',
                margin: '1rem 0',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
              }}
            >
              <div style={{ color: 'gold', fontSize: '1.2rem' }}>
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p style={{ fontStyle: 'italic' }}>"{review.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
 