import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import ProductCard from '../Components/ProductCard'; // Assuming this component exists
import PriceRangeFilter from '../Components/PriceRangeFilter'; // Assuming this component exists
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const ProductsPage = () => {
  // Extract parameters from the URL
  const { categoryId } = useParams(); // Gets category ID from /products/category/:categoryId
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search'); // Gets search term from /products?search=query

  // State for products and their loading/error status
  const [allProducts, setAllProducts] = useState([]); // Stores products fetched from the backend
  const [filteredProducts, setFilteredProducts] = useState([]); // Products displayed after frontend filters
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState(null);

  // State for categories in the sidebar
  const [allCategories, setAllCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState(null);

  // UI state for sorting and view mode
  const [sortOption, setSortOption] = useState('default');
  const [viewMode, setViewMode] = useState('grid');

  // State for price range filtering (client-side)
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  // Base URL for your backend API, typically from environment variables
  const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;

  // --- EFFECT 1: Fetch ALL Categories for Sidebar (and to find category name) ---
  // This effect runs once on component mount to populate the categories list in the sidebar.
  // It also provides the `allCategories` array from which we can find the `currentCategory` name.
  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoadingCategories(true);
      setCategoryError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/getCats`); // Fetch all categories
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorData.message || 'Unknown error'}`);
        }
        const data = await res.json();
        const categoriesArray = Array.isArray(data) ? data : data.categories || [];
        setAllCategories(categoriesArray);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategoryError(`Failed to load categories: ${err.message}.`);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchAllCategories();
  }, [API_BASE_URL]); // Depend only on API_BASE_URL as it's a one-time fetch

  // --- DERIVED STATE: Determine current category name from allCategories ---
  // We'll find the current category name from the `allCategories` array
  // instead of making a separate API call for `currentCategory`.
  const currentCategoryName = categoryId && allCategories.length > 0
    ? allCategories.find(cat => cat._id === categoryId)?.name || null
    : null;


  // --- EFFECT 2: Fetch Products from Backend (All, by Category, or by Search) ---
  // This effect now depends on `currentCategoryName` (derived state) for category filtering.
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setProductError(null); // Clear previous errors
      try {
        let apiUrl = `${API_BASE_URL}/api/products/getProducts`; // Default: fetches all products

        // If a category ID is present AND its name is resolved
        if (categoryId && currentCategoryName) {
          // Add categoryName as a query parameter for backend filtering
          apiUrl = `${API_BASE_URL}/api/products/getProducts?categoryName=${encodeURIComponent(currentCategoryName)}`;
        }
        // If a search query is present
        else if (searchQuery) {
          // Add search term as a query parameter for backend searching
          apiUrl = `${API_BASE_URL}/api/products/getProducts?search=${encodeURIComponent(searchQuery)}`;
        }
        // If neither, apiUrl remains `${API_BASE_URL}/api/products` to get all products.

        const res = await fetch(apiUrl);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorData.message || 'Unknown error'}`);
        }
        const data = await res.json();
        // Ensure the response data is an array (or extract from a 'products' field)
        const productsArray = Array.isArray(data) ? data : data.products || [];
        setAllProducts(productsArray); // Update the raw list of products
      } catch (err) {
        console.error('Error fetching products:', err);
        setProductError(`Failed to load products: ${err.message}. Please check your connection and try again.`);
        setAllProducts([]); // Clear products on error
      } finally {
        setLoadingProducts(false);
      }
    };

    // Trigger `fetchProducts` when relevant dependencies change:
    // 1. When a category ID is active and its name is resolved from `allCategories`.
    // 2. When a search query is active.
    // 3. When no specific category or search is active (to load all products initially).
    if ((categoryId && currentCategoryName) || searchQuery || (!categoryId && !searchQuery)) {
      fetchProducts();
    }
  }, [API_BASE_URL, categoryId, currentCategoryName, searchQuery]);


  // --- EFFECT 3: Apply Frontend Filters (Price Range) and Sorting ---
  // This effect runs whenever the `allProducts` list, `sortOption`, `minPrice`, or `maxPrice` changes.
  // It performs client-side filtering and sorting on the already fetched products.
  useEffect(() => {
    let result = [...allProducts]; // Start with the products from the backend

    // 1. Apply Price Range Filter
    result = result.filter(product =>
      product.price >= minPrice && product.price <= maxPrice
    );

    // 2. Apply Sorting
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'default') {
      // Custom default sort: Featured first, then New, then by Name
      result.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return a.name.localeCompare(b.name);
      });
    }

    setFilteredProducts(result); // Update the list of products displayed to the user
  }, [allProducts, sortOption, minPrice, maxPrice]); // Dependencies for client-side filtering/sorting

  // Handler function for the PriceRangeFilter component
  const handlePriceRangeChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  // Dynamically determine the page title based on current filters
  const pageTitle = categoryId
    ? (currentCategoryName ? currentCategoryName : 'Loading Category...') // Use currentCategoryName
    : searchQuery
      ? `Search Results for "${searchQuery}"`
      : 'All Products';

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
            {/* Price Range Filter Component */}
            <PriceRangeFilter onFilterChange={handlePriceRangeChange} />

            {/* Dynamic Categories List in Sidebar */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white">
                <h5 className="mb-0">Categories</h5>
              </div>
              <div className="card-body">
                {loadingCategories ? (
                  <p className="text-muted">Loading categories...</p>
                ) : categoryError ? (
                  <p className="text-danger">{categoryError}</p>
                ) : (
                  <div className="list-group list-group-flush">
                    {allCategories.length > 0 ? (
                      allCategories.map(cat => (
                        <Link
                          key={cat._id}
                          to={`/products/category/${cat._id}`} // Links to a category-specific product page
                          className={`list-group-item list-group-item-action border-0 px-0 py-2 ${categoryId === cat._id ? 'active' : ''}`}
                        >
                          {cat.name}
                        </Link>
                      ))
                    ) : (
                      <p className="text-muted">No categories available.</p>
                    )}
                    {/* Link to view all categories page, if you have one */}
                    <Link to="/categories" className="list-group-item list-group-item-action border-0 px-0 py-2 text-primary fw-bold">
                        View All Categories
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Availability Filter (placeholder for future implementation) */}
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

        {/* Main content area for products */}
        <div className="col-lg-9">
          <div className="mb-4">
            <h1 className="fw-bold mb-2">
              {pageTitle}
            </h1>
            <p className="text-muted">
              {loadingProducts ? 'Loading...' : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'} found`}
              {categoryId && !loadingProducts && currentCategoryName && ` in ${currentCategoryName}`}
              {searchQuery && !loadingProducts && ` for "${searchQuery}"`}
            </p>
          </div>

          {/* Sort and View Mode controls */}
          <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded mb-4">
            <div className="d-flex align-items-center">
              <SlidersHorizontal size={16} className="me-2" />
              <span className="me-2">Sort by:</span>
              <select
                className="form-select form-select-sm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Featured / New</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
                <option value="rating">Rating (High to Low)</option>
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

          {/* Conditional rendering for loading, errors, no products, or product display */}
          {loadingProducts ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading products...</span>
              </div>
              <p className="mt-3">Loading products...</p>
            </div>
          ) : productError ? (
            <div className="alert alert-danger text-center py-5">
              <h3>{productError}</h3>
              <p>It seems there was an issue fetching products. Please try again later.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <h3>No products found</h3>
              <p className="text-muted">Try adjusting your search or filter criteria. There might be no products matching your current selection.</p>
            </div>
          ) : (
            // Render products based on the selected view mode
            viewMode === 'grid' ? (
              // Grid View Layout
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="col">
                    <ProductCard product={product} API_BASE_URL={API_BASE_URL} />
                  </div>
                ))}
              </div>
            ) : (
              // List View Layout
              <div className="d-flex flex-column gap-4">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    className="card border-0 shadow-sm"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={product.image ? `${API_BASE_URL}${product.image}` : '/placeholder.png'}
                          className="img-fluid rounded-start"
                          alt={product.name}
                          style={{ height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <div className="mb-2">
                            {/* Star Rating Display */}
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < product.rating ? "text-warning" : "text-muted"}>★</span>
                            ))}
                            <span className="text-muted ms-1">({product.reviews})</span>
                          </div>
                          <p className="card-text">{product.description ? product.description.substring(0, 150) + '...' : 'No description available.'}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <span className="fs-5 fw-bold text-primary">Ksh {product.price.toLocaleString()}</span>
                              {product.oldPrice && (
                                <span className="text-decoration-line-through text-muted ms-2">
                                  Ksh {product.oldPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <Link to={`/product/${product._id}`} className="btn btn-primary">View Details</Link>
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