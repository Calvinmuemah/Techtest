import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Sales</h5>
              <p className="card-text">KES 1,200,000</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">425</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <p className="card-text">88</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text">120</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mb-4">
        <h4>Quick Actions</h4>
        <div className="d-flex flex-wrap gap-3">
          <Link to="/admin/products" className="btn btn-outline-primary">Manage Products</Link>
          <Link to="/admin/orders" className="btn btn-outline-success">View Orders</Link>
          <Link to="/admin/users" className="btn btn-outline-warning">User Management</Link>
          <Link to="/admin/settings" className="btn btn-outline-secondary">Settings</Link>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div>
        <h4>Recent Orders</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-hover mt-2">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#ORD1234</td>
                <td>John Mwangi</td>
                <td>KES 7,800</td>
                <td><span className="badge bg-success">Delivered</span></td>
                <td>2025-05-21</td>
              </tr>
              <tr>
                <td>#ORD1233</td>
                <td>Faith Wambui</td>
                <td>KES 5,200</td>
                <td><span className="badge bg-warning text-dark">Pending</span></td>
                <td>2025-05-20</td>
              </tr>
              <tr>
                <td>#ORD1232</td>
                <td>Kevin Otieno</td>
                <td>KES 3,600</td>
                <td><span className="badge bg-danger">Cancelled</span></td>
                <td>2025-05-19</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
