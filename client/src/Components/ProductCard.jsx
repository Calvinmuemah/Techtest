import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../Contexts/CartContext';
import { formatPrice } from '../Utils/formatters';
import 'bootstrap/dist/css/bootstrap.min.css'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      className="card h-100 border-0 shadow-sm"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="position-relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            className="card-img-top" 
            alt={product.name}
            style={{ height: '200px', objectFit: 'cover' }}
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
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={16} />
          </motion.button>
        </div>
      </div>
      
      <div className="card-body">
        <Link to={`/product/${product.id}`} className="text-decoration-none">
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
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < product.rating ? "text-warning" : "text-muted"}>★</span>
                ))}
              </div>
              <span className="text-muted ms-1">({product.reviews})</span>
            </div>
          </div>
        </div>
        
        <p className="card-text text-muted small text-truncate">
          {product.description}
        </p>
      </div>
      
      <div className="card-footer bg-white border-0 pt-0">
        <Link 
          to={`/product/${product.id}`} 
          className="btn btn-outline-primary w-100"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
