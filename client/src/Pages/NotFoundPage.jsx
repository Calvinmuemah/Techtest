import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ShoppingBag, HelpCircle } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css'

const NotFoundPage = () => {
  return (
    <div className="container text-center py-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <span className="display-1 fw-bold text-primary">404</span>
        </div>
        <h1 className="display-5 fw-bold mb-4">Page Not Found</h1>
        <p
          className="fs-5 text-muted mb-5"
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          Oops! The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
          <Link to="/" className="btn btn-primary px-4 py-2">
            <Home size={18} className="me-2" /> Go to Homepage
          </Link>
          <Link to="/products" className="btn btn-outline-primary px-4 py-2">
            <ShoppingBag size={18} className="me-2" /> Browse Products
          </Link>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Looking for something specific?</h5>
                <div className="d-flex mb-4">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search products..."
                  />
                  <button className="btn btn-primary ms-2" type="button">
                    <Search size={20} />
                  </button>
                </div>
                <div>
                  <span className="text-muted">Or try one of these popular pages:</span>
                  <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                    <Link to="/products/category/1" className="text-decoration-none">
                      Laptops
                    </Link>
                    <Link to="/products/category/2" className="text-decoration-none">
                      Smartphones
                    </Link>
                    <Link to="/products/category/3" className="text-decoration-none">
                      Accessories
                    </Link>
                    <Link to="/contact" className="text-decoration-none">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-light border-0 py-3">
                <div className="d-flex justify-content-center align-items-center">
                  <HelpCircle size={18} className="text-primary me-2" />
                  <span>
                    Need assistance?{' '}
                    <Link to="/contact" className="text-decoration-none">
                      Contact our support team
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
