import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../Contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container-fluid px-4">
        {/* Left side: Logo + Nav Links */}
        <div className="d-flex align-items-center">
          <Link to="/" className="navbar-brand me-4">
            <motion.span 
              className="fs-4 fw-bold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              TechNest
            </motion.span>
          </Link>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav d-flex flex-row gap-3">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/products/category/1" className="dropdown-item">Laptops</Link></li>
                  <li><Link to="/products/category/2" className="dropdown-item">Phones</Link></li>
                  <li><Link to="/products/category/3" className="dropdown-item">Accessories</Link></li>
                  <li><Link to="/products/category/4" className="dropdown-item">Home Appliances</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">All Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right side: Search, Cart, User icons */}
        <div className="d-none d-lg-flex align-items-center gap-3 ms-auto">
          <button 
            className="btn btn-sm btn-outline-secondary rounded-circle p-2"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={20} />
          </button>
          <Link to="/cart" className="btn btn-sm btn-outline-secondary rounded-circle p-2 position-relative">
            <ShoppingCart size={20} />
            {getTotalItems() > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalItems()}
              </span>
            )}
          </Link>
          <button className="btn btn-sm btn-outline-secondary rounded-circle p-2">
            <User size={20} />
          </button>
        </div>

        {/* Mobile menu icons */}
        <div className="d-lg-none d-flex align-items-center gap-2">
          <button 
            className="btn btn-sm btn-outline-secondary rounded-circle p-2"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={20} />
          </button>
          <Link to="/cart" className="btn btn-sm btn-outline-secondary rounded-circle p-2 position-relative">
            <ShoppingCart size={20} />
            {getTotalItems() > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalItems()}
              </span>
            )}
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            className="position-absolute top-100 start-0 w-100 bg-white shadow-sm p-3 z-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={handleSearch} className="d-flex">
              <input
                type="search"
                className="form-control"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn btn-primary ms-2">
                <Search size={20} />
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary ms-2"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
