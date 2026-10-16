import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo-container">
            <img src="/logo.png" alt="OneRoofVentures Logo" className="footer-logo" />
            <span className="footer-logo-text">OneRoofVentures</span>
          </div>
          <p className="footer-tagline">
            Elevating your brand with expert social media management, high-performance web development, and custom app solutions.
          </p>
        </div>
        
        <div className="footer-links-group">
          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
              <li><Link to="/projects" onClick={() => window.scrollTo(0, 0)}>Web Development</Link></li>
              <li><Link to="/app-projects" onClick={() => window.scrollTo(0, 0)}>App Development</Link></li>
              <li><Link to="/social-projects" onClick={() => window.scrollTo(0, 0)}>Social Media Marketing</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:oneroofventures1@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#fff', fontWeight: 600 }}>✉ oneroofventures1@gmail.com</a></li>
              <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)}>Contact Us</Link></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} OneRoofVentures. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
