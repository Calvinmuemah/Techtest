import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../Contexts/CartContext';
import { formatPrice } from '../Utils/formatters';
import 'bootstrap/dist/css/bootstrap.min.css'

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  // Calculate summary values
  const subtotal = getTotalPrice();
  const shipping = subtotal > 10000 ? 0 : 299;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <motion.div
          className="text-center py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4">
            <ShoppingBag size={80} className="text-muted" />
          </div>
          <h3>Your cart is empty</h3>
          <p className="text-muted mb-4">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn btn-primary px-4 py-2">
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <motion.div
              className="card border-0 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-body p-4">
                {/* Cart items */}
                {cartItems.map((item, index) => (
                  <React.Fragment key={item.product.id}>
                    <div className="row">
                      <div className="col-md-3 mb-3 mb-md-0">
                        <Link to={`/product/${item.product.id}`}>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="img-fluid rounded"
                            style={{ objectFit: 'cover', height: '120px', width: '100%' }}
                          />
                        </Link>
                      </div>
                      <div className="col-md-9">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <Link
                              to={`/product/${item.product.id}`}
                              className="text-decoration-none"
                            >
                              <h5 className="mb-1">{item.product.name}</h5>
                            </Link>
                            <p className="text-muted small mb-2">
                              {item.product.category} • {item.product.subCategory || 'General'}
                            </p>
                            <div className="d-flex mt-3">
                              <div className="d-flex align-items-center me-4">
                                <button
                                  className="btn btn-sm btn-outline-secondary rounded-circle p-1"
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="mx-3">{item.quantity}</span>
                                <button
                                  className="btn btn-sm btn-outline-secondary rounded-circle p-1"
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.product.stock}
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Trash2 size={16} className="me-1" /> Remove
                              </button>
                            </div>
                          </div>
                          <div className="text-end">
                            <span className="fw-bold">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            {item.quantity > 1 && (
                              <div className="text-muted small">
                                {formatPrice(item.product.price)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <hr className="my-4" />}
                  </React.Fragment>
                ))}
              </div>
              <div className="card-footer bg-white py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <Link
                    to="/products"
                    className="text-decoration-none d-flex align-items-center"
                  >
                    <ArrowLeft size={16} className="me-2" /> Continue Shopping
                  </Link>
                  <span>{getTotalItems()} items in cart</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-lg-4">
            <motion.div
              className="card border-0 shadow-sm sticky-md-top"
              style={{ top: '1rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax (18% GST)</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                {/* Coupon code */}
                <div className="mb-3">
                  {isApplyingCoupon ? (
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button className="btn btn-outline-primary" type="button">
                        Apply
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-outline-primary btn-sm w-100"
                      onClick={() => setIsApplyingCoupon(true)}
                    >
                      Have a coupon code?
                    </button>
                  )}
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold fs-5 text-primary">{formatPrice(total)}</span>
                </div>

                <Link
                  to="/checkout"
                  className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                >
                  <CreditCard size={20} />
                  Proceed to Checkout
                </Link>

                <div className="mt-3 small text-center text-muted">
                  Secure checkout powered by Stripe
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
