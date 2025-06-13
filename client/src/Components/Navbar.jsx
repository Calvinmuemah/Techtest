import React, { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef
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
  const [categories, setCategories] = useState([]); 
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false); 
  const navigate = useNavigate();

  // Ref for the category dropdown to detect clicks outside
  const dropdownRef = useRef(null); 

  const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT; 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/getCats`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const categoryData = Array.isArray(data) ? data : data.categories || [];
        setCategories(categoryData);
      } catch (err) {
        console.error('Failed to fetch categories for navbar dropdown:', err);
      }
    };

    fetchCategories();
  }, [API_BASE_URL]); 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setIsCategoryDropdownOpen(false); 
    setIsMobileMenuOpen(false); 
    navigate(`/products/category/${categoryId}`);
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

          {/* This is the collapsible part for larger screens, controlled by isMobileMenuOpen for smaller screens */}
          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav d-flex flex-row gap-3">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              </li>
              
              {/* --- Categories Dropdown (Dynamic) --- */}
              <li className="nav-item dropdown" ref={dropdownRef}> {/* Attach ref here */}
                <a
                  className="nav-link dropdown-toggle"
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault(); 
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  }}
                  role="button"
                  aria-expanded={isCategoryDropdownOpen ? "true" : "false"}
                >
                  Categories
                </a>
                <ul className={`dropdown-menu ${isCategoryDropdownOpen ? 'show' : ''}`}> {/* Control 'show' class */}
                  {categories.length > 0 ? (
                    categories.map(category => (
                      <li key={category._id}>
                        <Link 
                          to={`/products/category/${category._id}`} 
                          className="dropdown-item"
                          onClick={() => handleCategoryClick(category._id)} 
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li><span className="dropdown-item text-muted">Loading categories...</span></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link 
                      to="/categories"
                      className="dropdown-item"
                      onClick={() => {
                        setIsCategoryDropdownOpen(false); 
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      View All
                    </Link>
                  </li>
                </ul>
              </li>
              
              <li className="nav-item">
                <Link to="/products" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
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
          <Link
            to="/profile"
            className="btn btn-sm p-2"
            title="User Profile"
            aria-label="User Profile"
          >
            <button className="btn btn-sm btn-outline-secondary rounded-circle p-2">
            <User size={20} />
          </button>
          </Link>
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

      {/* Mobile Menu Overlay (if you have one, ensure it's closed by nav clicks) */}
      {/* Assuming isMobileMenuOpen state controls this overlay */}
      {isMobileMenuOpen && (
        <motion.div
          className="d-lg-none position-absolute top-0 start-0 w-100 h-100 bg-white shadow-lg p-4 z-4"
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          exit={{ x: '100vw' }}
          transition={{ type: 'tween', duration: 0.3 }}
          style={{ overflowY: 'auto' }} // Enable scrolling for long menus
        >
          <div className="d-flex justify-content-end mb-4">
            <button
              className="btn btn-outline-secondary rounded-circle p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          <ul className="nav flex-column gap-3 fs-5">
            <li className="nav-item">
              <Link to="/" className="nav-link text-dark" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen); // Toggle dropdown
                }}
              >
                Categories
              </a>
              <ul className={`list-unstyled ms-3 mt-2 ${isCategoryDropdownOpen ? 'd-block' : 'd-none'}`}> {/* Show/hide dropdown content */}
                {categories.length > 0 ? (
                  categories.map(category => (
                    <li key={category._id} className="mb-2">
                      <Link 
                        to={`/products/category/${category._id}`} 
                        className="text-decoration-none text-muted"
                        onClick={() => handleCategoryClick(category._id)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li><span className="text-muted">Loading...</span></li>
                )}
                <li className="mt-2">
                  <Link 
                    to="/categories" 
                    className="text-decoration-none text-primary"
                    onClick={() => {
                      setIsCategoryDropdownOpen(false); 
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    View All Categories
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link text-dark" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-dark" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-dark" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </li>
            <li className="nav-item mt-3">
              <Link to="/profile" className="btn btn-primary w-100" onClick={() => setIsMobileMenuOpen(false)}>My Account</Link>
            </li>
          </ul>
        </motion.div>
      )}

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