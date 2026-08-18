import React, { useState, useLayoutEffect, useRef } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useLayoutEffect(() => {
    let ticking = false;
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          
          if (currentScroll <= 40) {
            setIsScrolled(false);
            lastScroll = currentScroll;
          } else {
            const diff = currentScroll - lastScroll;
            if (diff > 30) {
              // Scrolled down significantly
              setIsScrolled(true);
              lastScroll = currentScroll;
            } else if (diff < -30) {
              // Scrolled up significantly
              setIsScrolled(false);
              lastScroll = currentScroll;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    let ctx = gsap.context(() => {
      // Pin the hero text and animate scale/fade
      gsap.to(textContainerRef.current, {
        scale: 0.6,
        opacity: 0,
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 140px",
          endTrigger: heroRef.current,
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
        }
      });
    }, containerRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="app-container">
      {/* Dynamic Animated Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-side nav-left">
          <div className="logo">
            OneRoofVentures
          </div>
        </div>
        <div className="nav-center">
          <div className="links">
            <a href="#home" onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>HOME</a>
            <a href="#">SERVICES</a>
            <a href="#about" onClick={(e) => {
              e.preventDefault();
              aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}>ABOUT</a>
          </div>
        </div>
        <div className="nav-side nav-right">
          <div className="actions">
            <button className="btn-contact">Contact Us <span>→</span></button>
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="hero-section">
        <div className="hero-text-wrapper" style={{ minHeight: '350px', width: '100%', display: 'flex', justifyContent: 'center' }}>
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
        </div>

        <img ref={houseRef} src="/image.png" alt="House" className="house-img" />
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
          <img src="/image.png" alt="House 1" className="img-left" />
          <img src="/image.png" alt="House 2" className="img-right" />
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
