import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CreditCard, CheckCircle, ChevronRight, Lock } from 'lucide-react';
import { useCart } from '../Contexts/CartContext';
import { formatPrice } from '../Utils/formatters';
import 'bootstrap/dist/css/bootstrap.min.css'

const CheckoutPage = () => {
  const { cartItems, getTotalPrice } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  // Calculate order total
  const subtotal = getTotalPrice();
  const shipping = subtotal > 10000 ? 0 : 299;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
    window.scrollTo(0, 0);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your cart is empty</h2>
        <p>You need to add some items to your cart before checking out.</p>
        <Link to="/products" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Checkout</h1>

      {/* Checkout Progress */}
      <div className="mb-5">
        <div className="position-relative mb-4">
          <div className="progress" style={{ height: '1px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${(currentStep - 1) * 50}%` }}
              aria-valuenow={(currentStep - 1) * 50}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="position-absolute top-0 start-0 translate-middle" style={{ marginTop: '-0.5px' }}>
            <div className={`rounded-circle d-flex align-items-center justify-content-center ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: '30px', height: '30px' }}>
              1
            </div>
          </div>
          <div className="position-absolute top-0 start-50 translate-middle" style={{ marginTop: '-0.5px' }}>
            <div className={`rounded-circle d-flex align-items-center justify-content-center ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: '30px', height: '30px' }}>
              2
            </div>
          </div>
          <div className="position-absolute top-0 start-100 translate-middle" style={{ marginTop: '-0.5px' }}>
            <div className={`rounded-circle d-flex align-items-center justify-content-center ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: '30px', height: '30px' }}>
              3
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="text-center" style={{ maxWidth: '120px' }}>
            <div className={`fw-medium ${currentStep === 1 ? 'text-primary' : ''}`}>Shipping</div>
          </div>
          <div className="text-center" style={{ maxWidth: '120px' }}>
            <div className={`fw-medium ${currentStep === 2 ? 'text-primary' : ''}`}>Payment</div>
          </div>
          <div className="text-center" style={{ maxWidth: '120px' }}>
            <div className={`fw-medium ${currentStep === 3 ? 'text-primary' : ''}`}>Confirmation</div>
          </div>
        </div>
      </div>

      <div className="row g-5">
        {/* Checkout Forms */}
        <div className="col-lg-8">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h3 className="card-title mb-4">Shipping Information</h3>

                  <form onSubmit={handleShippingSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={shippingData.firstName}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={shippingData.lastName}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={shippingData.email}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={shippingData.phone}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          placeholder="1234 Main St"
                          value={shippingData.address}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div className="col-md-5">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={shippingData.city}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="state" className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          name="state"
                          value={shippingData.state}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="zipCode" className="form-label">Zip Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="zipCode"
                          name="zipCode"
                          value={shippingData.zipCode}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="country" className="form-label">Country</label>
                        <select
                          className="form-select"
                          id="country"
                          name="country"
                          value={shippingData.country}
                          onChange={handleShippingChange}
                          required
                        >
                          <option value="Kenya">Kenya</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Tanzania">Tanzania</option>
                          <option value="Rwanda">Rwanda</option>
                        </select>
                      </div>
                      <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-primary w-100">
                          Continue to Payment
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h3 className="card-title mb-4">Payment Information</h3>

                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-3">
                      <label htmlFor="cardName" className="form-label">Name on Card</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardName"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cardNumber" className="form-label">Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        required
                        maxLength={16}
                      />
                    </div>
                    <div className="row g-3">
                      <div className="col-6">
                        <label htmlFor="expiry" className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          className="form-control"
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={paymentData.expiry}
                          onChange={handlePaymentChange}
                          required
                          maxLength={5}
                        />
                      </div>
                      <div className="col-6">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input
                          type="password"
                          className="form-control"
                          id="cvv"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          required
                          maxLength={3}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button type="submit" className="btn btn-primary w-100">
                        Review Order
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4 text-center">
                  <CheckCircle size={48} className="text-success mb-3" />
                  <h3 className="mb-3">Order Confirmed!</h3>
                  <p className="mb-4">
                    Thank you, <strong>{shippingData.firstName}</strong>, your order has been placed.
                  </p>
                  <Link to="/products" className="btn btn-primary">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="card-title mb-4">Order Summary</h3>
              <ul className="list-group mb-3">
                {cartItems.map(({ id, name, price, quantity }) => (
                  <li
                    key={id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      {name} <small className="text-muted">x{quantity}</small>
                    </div>
                    <span>{formatPrice(price * quantity)}</span>
                  </li>
                ))}
              </ul>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Shipping</span>
                  <strong>{shipping === 0 ? 'Free' : formatPrice(shipping)}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>GST (18%)</span>
                  <strong>{formatPrice(tax)}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <strong>{formatPrice(total)}</strong>
                </li>
              </ul>
              <p className="text-muted small">
                <Lock size={16} className="me-1" />
                Secure payment with industry-standard encryption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
