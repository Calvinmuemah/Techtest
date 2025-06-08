import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './Components/AdminLayout';
import AdminCustomers from './Pages/AdminCustomers';
import AdminCategories from './Pages/AdminCategories';
import AdminDashboard from './Pages/AdminDashboard';
import AdminOrders from './Pages/AdminOrders';
import AdminProducts from './Pages/AdminProducts';
import AddProduct from './Updates/AddProduct';
import AddCategory from './Updates/AddCategory';
import AdminSettings from './Pages/Settings'; // Include if using Settings
// adds
function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Pages with Layout */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="addProducts" element={<AddProduct />} />
          <Route path="addCategories" element={<AddCategory />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
