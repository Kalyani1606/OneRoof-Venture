import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const textContainerRef = useRef(null);
  const houseRef = useRef(null);
  const cloudsRef = useRef(null);
  const aboutRef = useRef(null);

  useLayoutEffect(() => {
    // No GSAP needed! Pure CSS sticky will keep the text in place while the house slides up!
  }, []);

  return (
    <div ref={containerRef} className="app-container">
      <nav className="navbar">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Homy
        </div>
        <div className="links">
          <a href="#">PROPERTIES</a>
          <a href="#">SERVICES</a>
          <a href="#">ABOUT</a>
        </div>
        <div className="actions">
          <button className="btn-contact">Contact Us <span>→</span></button>
        </div>
      </nav>

      <section ref={heroRef} className="hero-section">
        <div className="hero-content" ref={textContainerRef}>
          <div className="users-badge">
            <div className="avatars">
              <div className="avatar-circle" style={{ background: '#ff7b72' }}></div>
              <div className="avatar-circle" style={{ background: '#79c0ff', marginLeft: '-10px' }}></div>
              <div className="avatar-circle" style={{ background: '#d2a8ff', marginLeft: '-10px' }}></div>
            </div>
            <span>3,500+ Pro Users</span>
          </div>

          <h1 className="hero-title">Find Your Dream</h1>

          <p className="hero-subtitle">
            Explore thoughtfully designed homes in premium locations, crafted to<br />
            match modern lifestyles with comfort, elegance, and long-term value.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Explore Homes <span>→</span></button>
            <button className="btn-secondary">Book a Visit</button>
          </div>
        </div>

        <img ref={houseRef} src="/house_nobg.png" alt="House" className="house-img" />
        <img ref={cloudsRef} src="/clouds.png" alt="Clouds" className="clouds-img" />
      </section>

      <section className="about-section" ref={aboutRef}>
        <div className="about-header-top">
          <span className="tag">OUR IMPACT</span>
          <div className="about-header-content">
            <h2>Real insights behind<br />every property decision</h2>
            <p className="desc-text">
              Built to make modern home discovery simple,<br />transparent, and more confident for every user.
            </p>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3>$4.6M+</h3>
            <p>TOTAL VALUE</p>
          </div>
          <div className="stat-card">
            <h3>320+</h3>
            <p>ACTIVE HOMES</p>
          </div>
          <div className="stat-card">
            <h3>98%</h3>
            <p>HAPPY CLIENTS</p>
          </div>
        </div>

        <div className="images-container">
          <img src="/house_nobg.png" alt="House 1" className="img-left" />
          <img src="/house_nobg.png" alt="House 2" className="img-right" />
        </div>

        <div className="focused-section">
          <h2>
            Focused on <span>discovery</span>, built for <span>real choices</span>.
          </h2>
        </div>
      </section>
    </div>
  );
}
