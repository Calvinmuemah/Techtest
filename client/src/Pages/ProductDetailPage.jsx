
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';
import { getProductById } from '../Data/products';
import { useCart } from '../Contexts/CartContext';
import { formatPrice } from '../Utils/formatters';
import 'bootstrap/dist/css/bootstrap.min.css'

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(productId ? getProductById(productId) : null);
  
  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      setProduct(foundProduct);
      if (foundProduct) {
        setSelectedImage(foundProduct.images[0]);
      }
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <p>The product you are looking for does not exist.</p>
        <Link to="/products" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container py-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products" className="text-decoration-none">Products</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/products/category/${product.category}`} className="text-decoration-none">
              {product.category}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Product Images */}
        <div className="col-md-6 mb-4 mb-md-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-3 text-center">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
            </div>
            
            <div className="d-flex gap-2 justify-content-center">
              {product.images.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`cursor-pointer border rounded p-1 ${selectedImage === img ? 'border-primary' : 'border-light'}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`${product.name} - view ${index + 1}`}
                    className="img-fluid"
                    style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badges */}
            <div className="mb-3">
              {product.isNew && (
                <span className="badge bg-success me-2">New Arrival</span>
              )}
              {product.isFeatured && (
                <span className="badge bg-primary me-2">Featured</span>
              )}
              {product.isBestseller && (
                <span className="badge bg-danger me-2">Bestseller</span>
              )}
              {product.stock <= 5 && product.stock > 0 && (
                <span className="badge bg-warning text-dark">Only {product.stock} left</span>
              )}
            </div>

            <h1 className="fw-bold mb-2">{product.name}</h1>
            
            {/* Ratings */}
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex text-warning">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < product.rating ? "text-warning" : "text-muted"}>★</span>
                ))}
              </div>
              <span className="ms-2 text-muted">
                ({product.reviews} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-4">
              <span className="fs-3 fw-bold text-primary me-3">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="fs-5 text-decoration-line-through text-muted">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              {product.oldPrice && (
                <span className="ms-2 text-success">
                  {Math.round((1 - product.price / product.oldPrice) * 100)}% off
                </span>
              )}
            </div>
            
            {/* Short description */}
            <p className="mb-4">
              {product.description}
            </p>
            
            {/* Quantity and Add to cart */}
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <span className="me-3">Quantity:</span>
                <div className="input-group" style={{ width: '150px' }}>
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="number" 
                    className="form-control text-center" 
                    value={quantity}
                    readOnly
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="ms-3 text-muted">
                  {product.stock} available
                </span>
              </div>
              
              <div className="d-grid gap-2 d-md-flex">
                <motion.button
                  className="btn btn-primary py-2 px-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart size={20} className="me-2" />
                  Add to Cart
                </motion.button>
                <motion.button
                  className="btn btn-outline-secondary py-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart size={20} />
                </motion.button>
                <motion.button
                  className="btn btn-outline-secondary py-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 size={20} />
                </motion.button>
              </div>
            </div>
            
            {/* Shipping & Returns */}
            <div className="card border-0 bg-light mb-4">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <Truck size={20} className="me-2 text-primary" />
                  <span className="fw-medium">Free shipping</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Shield size={20} className="me-2 text-primary" />
                  <span className="fw-medium">2-year warranty</span>
                </div>
                <div className="d-flex align-items-center">
                  <RotateCcw size={20} className="me-2 text-primary" />
                  <span className="fw-medium">30-day return policy</span>
                </div>
              </div>
            </div>
            
            {/* Feature highlights */}
            <div className="mb-4">
              <h5 className="fw-bold mb-3">Key Features</h5>
              <ul className="list-unstyled">
                {product.features.map((feature, index) => (
                  <li key={index} className="d-flex align-items-center mb-2">
                    <ChevronRight size={18} className="text-primary me-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Product details tabs */}
      <div className="my-5">
        <ul className="nav nav-tabs" id="productTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button 
              className="nav-link active" 
              id="specifications-tab" 
              data-bs-toggle="tab" 
              data-bs-target="#specifications" 
              type="button" 
              role="tab" 
              aria-controls="specifications" 
              aria-selected="true"
            >
              Specifications
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className="nav-link" 
              id="reviews-tab" 
              data-bs-toggle="tab" 
              data-bs-target="#reviews" 
              type="button" 
              role="tab" 
              aria-controls="reviews" 
              aria-selected="false"
            >
              Reviews ({product.reviews})
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className="nav-link" 
              id="shipping-tab" 
              data-bs-toggle="tab" 
              data-bs-target="#shipping" 
              type="button" 
              role="tab" 
              aria-controls="shipping" 
              aria-selected="false"
            >
              Shipping & Returns
            </button>
          </li>
        </ul>
        <div className="tab-content p-4 border border-top-0" id="productTabsContent">
          <div 
            className="tab-pane fade show active" 
            id="specifications" 
            role="tabpanel" 
            aria-labelledby="specifications-tab"
          >
            <table className="table table-bordered">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div 
            className="tab-pane fade" 
            id="reviews" 
            role="tabpanel" 
            aria-labelledby="reviews-tab"
          >
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
          <div 
            className="tab-pane fade" 
            id="shipping" 
            role="tabpanel" 
            aria-labelledby="shipping-tab"
          >
            <ul>
              <li>Free shipping on all orders over $50.</li>
              <li>2-year warranty included.</li>
              <li>30-day return policy with no questions asked.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;







