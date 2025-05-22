import React from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'

const testimonials = [
  {
    id: 1,
    name: "Robert Chen",
    role: "Software Engineer",
    content: "The MacBook Pro I purchased from ElectroShop exceeded my expectations. The ordering process was smooth, and the product arrived in perfect condition. The customer service team was also very helpful when I had questions about my purchase.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Digital Marketing Specialist",
    content: "I've been shopping at ElectroShop for years and have always had a positive experience. Their prices are competitive, and they stock the latest tech. I recently bought a smartphone, and the detailed product description helped me make an informed decision.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    name: "Michael Patel",
    role: "Graphic Designer",
    content: "As someone who relies heavily on technology for work, having a trusted store like ElectroShop is invaluable. The quality of products and the knowledgeable staff make every purchase a good experience. Highly recommended!",
    image: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="fw-bold">What Our Customers Say</h2>
          <p className="text-muted">Trusted by thousands of tech enthusiasts across the country</p>
        </motion.div>
        
        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="col-md-4">
              <motion.div 
                className="card h-100 border-0 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="card-body p-4">
                  <div className="mb-4 text-warning">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="card-text mb-4">{testimonial.content}</p>
                  <div className="d-flex align-items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="rounded-circle me-3"
                      width="50" 
                      height="50"
                      style={{ objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.role}</small>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
