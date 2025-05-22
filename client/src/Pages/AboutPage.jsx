import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Map, Clock } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css'

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="bg-dark text-white py-5"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container py-5">
          <motion.div
            className="text-center py-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="display-3 fw-bold mb-4">About TechNest</h1>
            <p className="lead mb-0 mx-auto" style={{ maxWidth: '700px' }}>
              Your trusted partner in technology since 2010. We're dedicated to providing the best electronics and exceptional customer service.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-6 mb-4 mb-lg-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="fw-bold mb-4">Our Story</h2>
              <p className="mb-3">
                Founded in 2010, TechNest began as a small storefront in Mumbai with a simple mission: to provide high-quality electronics at competitive prices with exceptional customer service.
              </p>
              <p className="mb-3">
                As technology evolved, so did we. From our humble beginnings, we've grown into one of India's premier electronics retailers, with a robust online presence and physical stores across major cities.
              </p>
              <p className="mb-4">
                Today, we proudly serve over 500,000 customers annually, offering the latest in consumer electronics, home appliances, and cutting-edge tech gadgets. Our commitment to quality, value, and customer satisfaction remains at the heart of everything we do.
              </p>
              <div className="row g-3">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary text-white rounded-circle p-3 me-3">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h5 className="mb-0 fw-bold">15+ Years</h5>
                      <p className="mb-0 text-muted">of Excellence</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary text-white rounded-circle p-3 me-3">
                      <Map size={24} />
                    </div>
                    <div>
                      <h5 className="mb-0 fw-bold">25+ Stores</h5>
                      <p className="mb-0 text-muted">Nationwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Team at TechNest" 
                className="img-fluid rounded shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="fw-bold mb-3">Our Values</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              The principles that guide us in our mission to provide the best electronics shopping experience
            </p>
          </motion.div>
          
          <div className="row g-4">
            {[
              {
                icon: <Award size={30} />,
                title: "Quality Assurance",
                description: "We rigorously test all products to ensure they meet our high standards for performance, durability, and reliability."
              },
              {
                icon: <Users size={30} />,
                title: "Customer Centric",
                description: "Our customers are at the heart of everything we do. We're committed to exceeding expectations with every interaction."
              },
              {
                icon: <Map size={30} />,
                title: "Integrity",
                description: "We believe in honest business practices, transparent pricing, and building trust with our customers and partners."
              },
              {
                icon: <Clock size={30} />,
                title: "Innovation",
                description: "We constantly embrace new technologies and approaches to provide a better shopping experience and stay ahead of industry trends."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="col-md-6 col-lg-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="rounded-circle bg-primary bg-opacity-10 text-primary p-3 mb-4 mx-auto" style={{ width: '70px', height: '70px' }}>
                      {value.icon}
                    </div>
                    <h4 className="fw-bold mb-3">{value.title}</h4>
                    <p className="text-muted mb-0">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="fw-bold mb-3">Our Leadership Team</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Meet the dedicated professionals who lead our company with vision and expertise
            </p>
          </motion.div>
          
          <div className="row g-4">
            {[
              {
                name: "Rajesh Sharma",
                position: "Founder & CEO",
                bio: "With 20+ years in the electronics industry, Rajesh leads our company's vision and strategy.",
                image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              },
              {
                name: "Priya Patel",
                position: "Chief Operations Officer",
                bio: "Priya ensures our operations run smoothly to deliver the best customer experience.",
                image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              },
              {
                name: "Vikram Mehta",
                position: "Head of Technology",
                bio: "Vikram drives our technology initiatives to create seamless shopping experiences.",
                image: "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              },
              {
                name: "Ananya Singh",
                position: "Customer Experience Director",
                bio: "Ananya ensures every customer interaction exceeds expectations.",
                image: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="col-md-6 col-lg-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="card h-100 border-0 shadow-sm text-center">
                  <div className="position-relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="card-img-top"
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-white p-3">
                      <h5 className="fw-bold mb-1">{member.name}</h5>
                      <p className="mb-0">{member.position}</p>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
