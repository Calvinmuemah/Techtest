import { Link, NavLink } from 'react-router-dom';
import { Home, Users, Package, ShoppingCart, List } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm px-4">
      <Link className="navbar-brand fw-bold text-white" to="/">
        Admin Panel
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="adminNavbar">
        <ul className="navbar-nav ms-auto gap-2">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              <Home size={16} className="me-1" /> Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/products">
              <Package size={16} className="me-1" /> Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/orders">
              <ShoppingCart size={16} className="me-1" /> Orders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              <Users size={16} className="me-1" /> Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/categories">
              <List size={16} className="me-1" /> Categories
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
