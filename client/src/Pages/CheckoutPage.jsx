import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '../Contexts/CartContext';
import { formatPrice } from '../Utils/formatters';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    zipCode: '',
    country: 'Kenya',
  });
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'mpesa'
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    mpesaPhone: '',
  });

  // Calculate order total
  const subtotal = getTotalPrice();
  const shipping = subtotal > 10000 ? 0 : 299;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare a flat payload matching your backend schema
      const payload = {
        customerName: `${shippingData.firstName} ${shippingData.lastName}`,
        email: shippingData.email,
        phone: shippingData.phone,
        address: shippingData.address,
        city: shippingData.city,
        zipCode: shippingData.zipCode,
        country: shippingData.country,
        paymentMethod,
        paymentDetails:
          paymentMethod === 'card'
            ? {
                cardName: paymentData.cardName,
                cardNumber: paymentData.cardNumber, // Make sure you handle this securely in production!
                expiry: paymentData.expiry,
                cvv: paymentData.cvv,
              }
            : {
                mpesaPhone: paymentData.mpesaPhone,
              },
        cartItems,
        subtotal,
        tax,
        shipping,
        total,
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setCurrentStep(2);
        window.scrollTo(0, 0);
      } else {
        console.error(data.error);
        alert('Order submission failed.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Something went wrong.');
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'mpesa') {
      // Call backend Mpesa endpoint here to initiate payment
      try {
        const mpesaResponse = await fetch('http://localhost:5000/api/mpesa/pay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: paymentData.mpesaPhone,
            amount: total,
            // You can add order details or reference here
          }),
        });

        const mpesaData = await mpesaResponse.json();

        if (mpesaResponse.ok) {
          alert('Mpesa payment initiated. Please complete the payment on your phone.');
          setCurrentStep(3);
          window.scrollTo(0, 0);
        } else {
          alert(mpesaData.error || 'Mpesa payment failed.');
        }
      } catch (err) {
        console.error(err);
        alert('Error connecting to Mpesa payment gateway.');
      }
    } else {
      // For card payment, just continue to confirmation step
      setCurrentStep(3);
      window.scrollTo(0, 0);
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
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
    <div className="container py-5" style={{ maxWidth: '900px' }}>
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
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="position-absolute top-0"
              style={{
                marginTop: '-0.5px',
                left: step === 1 ? '0%' : step === 2 ? '50%' : '100%',
                transform: 'translate(-50%, 0)',
              }}
            >
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center ${
                  currentStep >= step ? 'bg-primary text-white' : 'bg-light text-muted'
                }`}
                style={{ width: '30px', height: '30px' }}
              >
                {step}
              </div>
            </div>
          ))}
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h3 className="card-title mb-4">Shipping Information</h3>

                  <form onSubmit={handleShippingSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
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
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
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
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
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
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={shippingData.phone}
                          onChange={handleShippingChange}
                          placeholder="+2547XXXXXXXX"
                          pattern="\+2547\d{8}"
                          required
                        />
                        <small className="form-text text-muted">Format: +2547XXXXXXXX</small>
                      </div>
                      <div className="col-12">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={shippingData.address}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
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
                      <div className="col-md-3">
                        <label htmlFor="zipCode" className="form-label">
                          Zip Code
                        </label>
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
                      <div className="col-md-3">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="country"
                          name="country"
                          value={shippingData.country}
                          onChange={handleShippingChange}
                          readOnly
                          disabled
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-4">
                      Continue to Payment
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h3 className="card-title mb-4">Payment Method</h3>

                  {/* Payment Method Selection */}
                  <div className="mb-4">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="cardPayment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <label className="form-check-label" htmlFor="cardPayment">
                        Card Payment
                        <CreditCard className="ms-1" size={18} />
                      </label>
                    </div>

                    <div className="form-check form-check-inline ms-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="mpesaPayment"
                        value="mpesa"
                        checked={paymentMethod === 'mpesa'}
                        onChange={() => setPaymentMethod('mpesa')}
                      />
                      <label className="form-check-label d-flex align-items-center" htmlFor="mpesaPayment">
                        M-Pesa
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/M-Pesa_logo.svg/256px-M-Pesa_logo.svg.png"
                          alt="M-Pesa"
                          style={{ height: '24px', marginLeft: '8px' }}
                        />
                      </label>
                    </div>
                  </div>

                  <form onSubmit={handlePaymentSubmit}>
                    {paymentMethod === 'card' && (
                      <>
                        <div className="mb-3">
                          <label htmlFor="cardName" className="form-label">
                            Name on Card
                          </label>
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
                          <label htmlFor="cardNumber" className="form-label">
                            Card Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="cardNumber"
                            name="cardNumber"
                            value={paymentData.cardNumber}
                            onChange={handlePaymentChange}
                            maxLength={19}
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        <div className="row g-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="expiry" className="form-label">
                              Expiry Date (MM/YY)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="expiry"
                              name="expiry"
                              value={paymentData.expiry}
                              onChange={handlePaymentChange}
                              placeholder="MM/YY"
                              maxLength={5}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="cvv" className="form-label">
                              CVV
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="cvv"
                              name="cvv"
                              value={paymentData.cvv}
                              onChange={handlePaymentChange}
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === 'mpesa' && (
                      <div className="mb-3">
                        <label htmlFor="mpesaPhone" className="form-label">
                          M-Pesa Phone Number
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="mpesaPhone"
                          name="mpesaPhone"
                          value={paymentData.mpesaPhone}
                          onChange={handlePaymentChange}
                          placeholder="+2547XXXXXXXX"
                          pattern="\+2547\d{8}"
                          required
                        />
                        <small className="form-text text-muted">Format: +2547XXXXXXXX</small>
                      </div>
                    )}

                    <button type="submit" className="btn btn-success mt-3">
                      {paymentMethod === 'mpesa' ? 'Pay with M-Pesa' : 'Pay with Card'}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="card border-0 shadow-sm p-5 text-center">
                <CheckCircle size={64} color="green" />
                <h3 className="mt-4">Thank you for your order!</h3>
                <p>Your order has been successfully placed and is being processed.</p>
                <Link to="/" className="btn btn-primary mt-3">
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h3 className="mb-4">Order Summary</h3>
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <div>{item.name}</div>
                    <small className="text-muted">Qty: {item.quantity}</small>
                  </div>
                  <span>{formatPrice(item.price * item.quantity)}</span>
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
                <span>{formatPrice(total)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
