// ProductCard.jsx
import React from 'react'; // Make sure React is imported
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react'; // Import Star
import { useCart } from '../Contexts/CartContext';
import { formatPrice } from '../Utils/formatters';
import 'bootstrap/dist/css/bootstrap.min.css';

// ProductCard now expects API_BASE_URL as a prop
const ProductCard = ({ product, API_BASE_URL }) => {
  const { addToCart } = useCart();
  const imageUrl =
    product.images && product.images.length > 0
      ? `${API_BASE_URL}${product.images[0]}` 
      : product.image 
        ? `${API_BASE_URL}${product.image}`
        : '/placeholder.png'; 

  return (
    <motion.div
      className="card h-100 border-0 shadow-sm"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="position-relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={imageUrl}
            className="card-img-top"
            alt={product.name}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
          />
        </Link>

        {/* Product badges */}
        <div className="position-absolute top-0 start-0 p-2">
          {product.isNew && (
            <span className="badge bg-success me-2">New</span>
          )}
          {product.isFeatured && (
            <span className="badge bg-primary me-2">Featured</span>
          )}
          {product.isBestseller && (
            <span className="badge bg-danger">Best Seller</span>
          )}
        </div>

        {/* Quick actions */}
        <div className="position-absolute bottom-0 end-0 p-2 d-flex gap-2">
          <motion.button
            className="btn btn-sm btn-light rounded-circle p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={16} />
          </motion.button>
          <motion.button
            className="btn btn-sm btn-primary rounded-circle p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart({ product, quantity: 1 })} // Pass product object and quantity
            disabled={product.stock === 0} // Disable if out of stock
          >
            <ShoppingCart size={16} />
          </motion.button>
        </div>
      </div>

      <div className="card-body d-flex flex-column">
        <Link to={`/product/${product._id}`} className="text-decoration-none text-dark"> {/* Added text-dark */}
          <h5 className="card-title text-truncate">{product.name}</h5>
        </Link>

        <div className="d-flex justify-content-between align-items-center mt-1 mb-2">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center">
              <span className="fs-5 fw-bold text-primary">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-decoration-line-through text-muted ms-2">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center mt-1">
              <div className="d-flex">
                {/* Use Star icon for ratings for consistency */}
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating || 0) ? '#FFC107' : 'none'} // Fill if rating applies
                    stroke={i < Math.floor(product.rating || 0) ? '#FFC107' : '#ced4da'} // Stroke color
                    className="me-1"
                  />
                ))}
              </div>
              <span className="text-muted ms-1">({product.reviews || 0})</span> {/* Default to 0 reviews */}
            </div>
          </div>
        </div>

        <p className="card-text text-muted small text-truncate flex-grow-1"> {/* Added flex-grow-1 */}
          {product.description}
        </p>
      </div>

      <div className="card-footer bg-white border-0 pt-0">
        <Link
          to={`/product/${product._id}`}
          className="btn btn-outline-primary w-100"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;