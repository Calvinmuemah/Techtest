import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful submission
    setIsSubmitted(true);
  };
  
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container py-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
            <p className="lead mb-0 mx-auto" style={{ maxWidth: '700px' }}>
              We're here to help! Reach out with any questions, concerns, or feedback.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Contact Information and Form */}
      <div className="container py-5">
        <div className="row g-5">
          <motion.div 
            className="col-lg-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="fw-bold mb-4">Get In Touch</h2>
            <p className="text-muted mb-4">
              We're always eager to hear from you. Reach out through any of the channels below or visit us at one of our locations.
            </p>
            
            {/* Contact Info Cards */}
            <div className="d-flex flex-column gap-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                      <Mail className="text-primary" />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Email Us</h5>
                      <p className="text-muted mb-0">support@electroshop.com</p>
                      <p className="text-muted mb-0">sales@electroshop.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                      <Phone className="text-primary" />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Call Us</h5>
                      <p className="text-muted mb-0">+1 (800) 123-4567 (Toll-free)</p>
                      <p className="text-muted mb-0">+1 (123) 456-7890 (Direct)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                      <MapPin className="text-primary" />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Visit Us</h5>
                      <p className="text-muted mb-0">123 Electronics Boulevard</p>
                      <p className="text-muted mb-0">Tech City, 10001</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                      <Clock className="text-primary" />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Business Hours</h5>
                      <p className="text-muted mb-0">Monday - Friday: 9am - 8pm</p>
                      <p className="text-muted mb-0">Saturday - Sunday: 10am - 6pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="col-lg-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-lg-5">
                <h2 className="fw-bold mb-4">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-4"
                  >
                    <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '70px', height: '70px' }}>
                      <Send size={30} />
                    </div>
                    <h3 className="fw-bold mb-3">Message Sent Successfully!</h3>
                    <p className="text-muted mb-4">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          subject: '',
                          message: ''
                        });
                      }}
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="name" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Your Email</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          id="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <select 
                          className="form-select" 
                          id="subject" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a topic</option>
                          <option value="Product Inquiry">Product Inquiry</option>
                          <option value="Order Status">Order Status</option>
                          <option value="Return/Refund">Return or Refund</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Feedback">Feedback</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea 
                          className="form-control" 
                          id="message" 
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <div className="col-12 mt-4">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit" 
                          className="btn btn-primary py-2 px-4"
                        >
                          <Send size={18} className="me-2" /> Send Message
                        </motion.button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="container-fluid px-0 mt-5">
        <div className="ratio ratio-21x9" style={{ maxHeight: '400px' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.03605924743!2d-74.30932979036456!3d40.69753996746253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1632986523659!5m2!1sen!2sin" 
            width="600" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy"
            title="ElectroShop Location"
          ></iframe>
        </div>
      </div>
      
      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="fw-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Find quick answers to common questions. If you don't see what you're looking for, contact us directly.
            </p>
          </motion.div>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion shadow-sm" id="faqAccordion">
                {[
                  {
                    id: "faq1",
                    question: "What are your shipping timeframes?",
                    answer: "We process most orders within 24 hours. Standard shipping typically takes 3-5 business days, while express shipping is 1-2 business days. Remote areas may take longer. You'll receive a tracking number once your order ships."
                  },
                  {
                    id: "faq2",
                    question: "How do I return a product?",
                    answer: "To return a product, please log into your account, navigate to your orders, and select 'Return Item' next to the relevant product. You'll receive a return shipping label via email. We accept returns within 30 days of purchase for most items."
                  },
                  {
                    id: "faq3",
                    question: "Do you offer international shipping?",
                    answer: "Yes, we ship to select international destinations. Shipping rates and timeframes vary by country. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient."
                  },
                  {
                    id: "faq4",
                    question: "How can I track my order?",
                    answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also log into your account and view your order history for real-time tracking information."
                  }
                ].map((faq, index) => (
                  <div key={faq.id} className="accordion-item border-0 mb-3">
                    <h3 className="accordion-header">
                      <button 
                        className={`accordion-button ${index !== 0 ? 'collapsed' : ''} bg-white`}
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target={`#${faq.id}`} 
                        aria-expanded={index === 0 ? 'true' : 'false'} 
                        aria-controls={faq.id}
                      >
                        {faq.question}
                      </button>
                    </h3>
                    <div 
                      id={faq.id} 
                      className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body bg-white text-muted">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
