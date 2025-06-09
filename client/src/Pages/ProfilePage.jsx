import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Lock, LogIn, UserPlus, Eye, EyeOff, Phone
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (res.ok) {
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });

      if (res.ok) {
        alert('Registration successful!');
        setIsLoginView(true);
        navigate('/login');
      } else {
        alert('Registration failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  return (
    <div className="container mt-5">
      {!isAuthenticated ? (
        <div className="row justify-content-center">
          <div className="col-md-6">
            {isLoginView ? (
              <form onSubmit={handleLogin}>
                <h2 className="mb-4">Login</h2>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <div className="input-group">
                    <span className="input-group-text"><Mail size={18} /></span>
                    <input
                      type="email"
                      placeholder="Enter email"
                      required
                      className="form-control"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><Lock size={18} /></span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      required
                      className="form-control"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-outline-secondary">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  <LogIn size={18} className="me-2" />
                  Login
                </button>

                <p className="text-center">
                  Don't have an account?{' '}
                  <button type="button" className="btn btn-link" onClick={() => setIsLoginView(false)}>
                    Register
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <h2 className="mb-4">Register</h2>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><User size={18} /></span>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      required
                      className="form-control"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <div className="input-group">
                    <span className="input-group-text"><Mail size={18} /></span>
                    <input
                      type="email"
                      placeholder="Enter email"
                      required
                      className="form-control"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text"><Phone size={18} /></span>
                    <input
                      type="tel"
                      placeholder="0700123456"
                      required
                      className="form-control"
                      value={registerData.phone_number}
                      onChange={(e) => setRegisterData({ ...registerData, phone_number: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><Lock size={18} /></span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      required
                      className="form-control"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-outline-secondary">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100 mb-3">
                  <UserPlus size={18} className="me-2" />
                  Register
                </button>

                <p className="text-center">
                  Already have an account?{' '}
                  <button type="button" className="btn btn-link" onClick={() => setIsLoginView(true)}>
                    Login
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="mb-4">Your Orders</h2>
          {orders.length > 0 ? (
            <ul className="list-group">
              {orders.map((order, index) => (
                <li className="list-group-item" key={index}>
                  <p className="mb-1"><strong>Order ID:</strong> {order.id}</p>
                  <p className="mb-1"><strong>Items:</strong> {order.items.join(', ')}</p>
                  <p className="mb-0"><strong>Total:</strong> ${order.total}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
