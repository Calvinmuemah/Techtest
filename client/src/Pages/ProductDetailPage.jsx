// ProductDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  Share2, // Import Share2 icon
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';
import { useCart } from '../Contexts/CartContext';
import { formatPrice } from '../Utils/formatters';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);

      const currentProductId = id;
      console.log('Product ID from useParams (Frontend):', currentProductId);
      console.log('Type of Product ID (Frontend):', typeof currentProductId);

      if (!currentProductId) {
        setLoading(false);
        setError('Product ID is missing in the URL. Please navigate from a product list (e.g., /product/YOUR_PRODUCT_ID).');
        return;
      }

      try {
        const url = `${API_BASE_URL}/api/product/getProductDetailsById/${currentProductId}`;
        console.log('Attempting to fetch from URL (Frontend):', url);

        const productRes = await fetch(url);

        if (!productRes.ok) {
          const errorData = await productRes.json();
          console.error('API response not OK:', productRes.status, errorData);
          throw new Error(`HTTP error fetching product details! Status: ${productRes.status}, Message: ${errorData.message || 'Failed to retrieve product details.'}`);
        }

        const productData = await productRes.json();
        console.log('Successfully fetched specific product:', productData);
        // ADDED LOG: Check the stock value
        console.log('Product stock:', productData.stock);

        setProduct(productData);
        // Set the initial selected image
        if (productData.images && productData.images.length > 0) {
          setSelectedImage(`${API_BASE_URL}${productData.images[0]}`);
        } else if (productData.image) {
          setSelectedImage(`${API_BASE_URL}${productData.image}`);
        }

        // Reset quantity to 1 when a new product is loaded
        setQuantity(1);

      } catch (err) {
        console.error(`Caught error in product detail page (ID: ${currentProductId}):`, err);
        setError(`Failed to load product: ${err.message}. Please check your connection and ensure the product ID is valid.`);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, API_BASE_URL]);

  const handleAddToCart = () => {
    if (product) {
      // Ensure the quantity doesn't exceed available stock when adding to cart
      const qtyToAdd = Math.min(quantity, product.stock || Infinity); // Handle cases where stock might be undefined
      addToCart(product, qtyToAdd);
      // Optional: Add a visual feedback (e.g., a toast notification) that item was added
      console.log(`${qtyToAdd} of ${product.name} added to cart!`);
    } else {
      console.warn('Cannot add to cart: product data is not loaded.');
    }
  };

  const increaseQuantity = () => {
    // Ensure product and product.stock are defined before trying to access them
    if (product && product.stock !== undefined) {
      if (quantity < product.stock) {
        setQuantity(prevQuantity => prevQuantity + 1);
      } else {
        console.warn('Cannot increase quantity: Exceeds available stock.');
      }
    } else {
      console.warn('Cannot increase quantity: Product or stock information is missing.');
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description ? product.description.substring(0, 150) + '...' : 'Check out this amazing product!', // Use a portion of description
          url: window.location.href, // Current product page URL
        });
        console.log('Product shared successfully!');
      } catch (error) {
        console.error('Error sharing product:', error);
        // User cancelled share or other error
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      // You could use a library like 'react-share' or implement a custom modal
      const productUrl = window.location.href;
      prompt("To share this product, copy the link:", productUrl);
    }
  };

  // --- Loading, Error, and Not Found States ---
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading product details...</span>
        </div>
        <p className="mt-3">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">
          <h3>Error!</h3>
          <p>{error}</p>
        </div>
        <Link to="/products" className="btn btn-primary mt-3">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // --- Product Detail Display ---
  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products" className="text-decoration-none">Products</Link>
          </li>
          {product.category && (
            <li className="breadcrumb-item">
              <Link to={`/products/category/${product.category._id || product.category}`} className="text-decoration-none">
                {product.category.name || 'Category'}
              </Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-6 mb-4 mb-md-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-3 text-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
            </div>

            <div className="d-flex gap-2 justify-content-center">
              {product.images && Array.isArray(product.images) && product.images.length > 0 ? (
                product.images.map((img, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`cursor-pointer border rounded p-1 ${selectedImage === `${API_BASE_URL}${img}` ? 'border-primary' : 'border-light'}`}
                    onClick={() => setSelectedImage(`${API_BASE_URL}${img}`)}
                  >
                    <img
                      src={`${API_BASE_URL}${img}`}
                      alt={`${product.name} - view ${index + 1}`}
                      className="img-fluid"
                      style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                    />
                  </motion.div>
                ))
              ) : (
                !product.image && <div className="text-muted text-center py-3">No additional images</div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="col-md-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
              {product.stock === 0 && (
                <span className="badge bg-danger">Out of Stock</span>
              )}
            </div>

            <h1 className="fw-bold mb-2">{product.name}</h1>

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

            <p className="mb-4">
              {product.description}
            </p>

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
                    // Disable if product is out of stock OR quantity reaches available stock
                    disabled={product.stock === 0 || quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="ms-3 text-muted">
                  {product.stock !== undefined ? `${product.stock} available` : 'Stock info loading...'}
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
                  // Add to wishlist functionality can be added here
                >
                  <Heart size={20} />
                </motion.button>
                <motion.button
                  className="btn btn-outline-secondary py-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare} // ADDED: Share functionality
                >
                  <Share2 size={20} />
                </motion.button>
              </div>
            </div>

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

            <div className="mb-4">
              <h5 className="fw-bold mb-3">Key Features</h5>
              {product.features && product.features.length > 0 ? (
                <ul className="list-unstyled">
                  {product.features.map((feature, index) => (
                    <li key={index} className="d-flex align-items-center mb-2">
                      <ChevronRight size={18} className="text-primary me-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No key features listed.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

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
            {product.specifications && Object.keys(product.specifications).length > 0 ? (
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
            ) : (
              <p className="text-muted">No specifications available for this product.</p>
            )}
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
              <li>Free shipping on all orders over Ksh 5000.</li>
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