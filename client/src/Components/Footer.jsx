import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="text-uppercase mb-4">TechNest</h5>
            <p>
              Your one-stop destination for premium electronics and home appliances. We offer the latest technology with exceptional service and competitive prices.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white"><Facebook size={20} /></a>
              <a href="#" className="text-white"><Twitter size={20} /></a>
              <a href="#" className="text-white"><Instagram size={20} /></a>
              <a href="#" className="text-white"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="text-uppercase mb-4">Shop</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/products/category/1" className="text-white text-decoration-none">Laptops</Link></li>
              <li className="mb-2"><Link to="/products/category/2" className="text-white text-decoration-none">Phones</Link></li>
              <li className="mb-2"><Link to="/products/category/3" className="text-white text-decoration-none">Accessories</Link></li>
              <li className="mb-2"><Link to="/products/category/4" className="text-white text-decoration-none">Home Appliances</Link></li>
              <li className="mb-2"><Link to="/products" className="text-white text-decoration-none">All Products</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="text-uppercase mb-4">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">FAQs</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Shipping Policy</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Return Policy</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Warranty Information</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="text-uppercase mb-4">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <MapPin size={18} className="me-2" />
                123 Electronics Boulevard, Tech City, 10001
              </li>
              <li className="mb-3 d-flex align-items-center">
                <Phone size={18} className="me-2" />
                +1 (800) 123-4567
              </li>
              <li className="mb-3 d-flex align-items-center">
                <Mail size={18} className="me-2" />
                support@technest.com
              </li>
            </ul>

            <div className="mt-4">
              <h6>Subscribe to our newsletter</h6>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Your email" />
                <button className="btn btn-outline-light" type="button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row mt-4">
          <div className="col text-center border-top pt-3">
            <p className="mb-0">© 2025 TechNest. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
