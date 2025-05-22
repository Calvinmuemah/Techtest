import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import ProductCard from '../Components/ProductCard';
import PriceRangeFilter from '../Components/PriceRangeFilter';
import { products, getProductsByCategory, searchProducts, filterProductsByPriceRange } from '../Data/products';
import { getCategoryById } from '../Data/categories';
import 'bootstrap/dist/css/bootstrap.min.css'

const ProductsPage = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  
  const category = categoryId ? getCategoryById(categoryId) : null;
  
  useEffect(() => {
    let result = [];
    
    if (categoryId) {
      result = getProductsByCategory(categoryId);
    } else if (searchQuery) {
      result = searchProducts(searchQuery);
    } else {
      result = [...products];
    }
    
    result = filterProductsByPriceRange(result, minPrice, maxPrice);
    
    if (sortOption === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(result);
  }, [categoryId, searchQuery, sortOption, minPrice, maxPrice]);
  
  const handlePriceRangeChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };
  
  return (
    <div className="container py-5">
      <div className="row">
        {/* Sidebar with filters */}
        <div className="col-lg-3 mb-4 mb-lg-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PriceRangeFilter onFilterChange={handlePriceRangeChange} />
            
            {!categoryId && (
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Categories</h5>
                </div>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    <a href="/products/category/1" className="list-group-item list-group-item-action border-0 px-0 py-2">
                      Laptops
                    </a>
                    <a href="/products/category/2" className="list-group-item list-group-item-action border-0 px-0 py-2">
                      Phones
                    </a>
                    <a href="/products/category/3" className="list-group-item list-group-item-action border-0 px-0 py-2">
                      Accessories
                    </a>
                    <a href="/products/category/4" className="list-group-item list-group-item-action border-0 px-0 py-2">
                      Home Appliances
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white">
                <h5 className="mb-0">Availability</h5>
              </div>
              <div className="card-body">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="inStock" />
                  <label className="form-check-label" htmlFor="inStock">
                    In Stock
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Main content */}
        <div className="col-lg-9">
          <div className="mb-4">
            <h1 className="fw-bold mb-2">
              {category 
                ? category.name 
                : searchQuery 
                ? `Search Results: "${searchQuery}"` 
                : 'All Products'}
            </h1>
            <p className="text-muted">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              {category && ` in ${category.name}`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
          
          <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded mb-4">
            <div className="d-flex align-items-center">
              <SlidersHorizontal size={16} className="me-2" />
              <span className="me-2">Sort by:</span>
              <select 
                className="form-select form-select-sm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <div className="d-flex align-items-center">
              <button 
                className={`btn btn-sm ${viewMode === 'grid' ? 'btn-dark' : 'btn-outline-dark'} me-2`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </button>
              <button 
                className={`btn btn-sm ${viewMode === 'list' ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <h3>No products found</h3>
              <p className="text-muted">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            viewMode === 'grid' ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="col">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="d-flex flex-column gap-4">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    className="card border-0 shadow-sm"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img 
                          src={product.image} 
                          className="img-fluid rounded-start" 
                          alt={product.name}
                          style={{ height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <div className="mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < product.rating ? "text-warning" : "text-muted"}>★</span>
                            ))}
                            <span className="text-muted ms-1">({product.reviews})</span>
                          </div>
                          <p className="card-text">{product.description.substring(0, 150)}...</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <span className="fs-5 fw-bold text-primary">₹{product.price.toLocaleString()}</span>
                              {product.oldPrice && (
                                <span className="text-decoration-line-through text-muted ms-2">
                                  ₹{product.oldPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <a href={`/product/${product.id}`} className="btn btn-primary">View Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
