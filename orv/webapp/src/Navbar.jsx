import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ isScrolled: propIsScrolled }) {
  const [internalScrolled, setInternalScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isScrolled = propIsScrolled !== undefined ? propIsScrolled : internalScrolled;
  const isHomePage = location.pathname === '/';

  // Handle scroll detection if not passed from parent
  useEffect(() => {
    if (propIsScrolled !== undefined) return;

    let lastScroll = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          if (currentScroll <= 40) {
            setInternalScrolled(false);
          } else if (currentScroll - lastScroll > 30) {
            setInternalScrolled(true);
          } else if (currentScroll - lastScroll < -30) {
            setInternalScrolled(false);
          }
          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [propIsScrolled]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavLink = (sectionId) => {
    setMobileMenuOpen(false);

    if (isHomePage) {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-active' : ''}`}>
        <div className="nav-side nav-left">
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            <img src="/logo.png" alt="OneRoofVentures Logo" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-center">
          <div className="links">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavLink('home');
              }}
            >
              HOME
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                handleNavLink('services');
              }}
            >
              SERVICES
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavLink('about');
              }}
            >
              ABOUT
            </a>
          </div>
        </div>

        {/* Desktop CTA / Mobile Hamburger */}
        <div className="nav-side nav-right">
          <div className="actions desktop-actions">
            {location.pathname === '/contact' ? (
              <a href="mailto:oneroofventures1@gmail.com" className="btn-contact">
                Email Us <span>→</span>
              </a>
            ) : (
              <Link to="/contact" className="btn-contact">
                Contact Us <span>→</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
            <span className="hamburger-line line-3"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop & Drawer Menu */}
      <div 
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <a
            href="#home"
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavLink('home');
            }}
          >
            <span>01</span> HOME
          </a>
          <a
            href="#services"
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavLink('services');
            }}
          >
            <span>02</span> SERVICES
          </a>
          <a
            href="#about"
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavLink('about');
            }}
          >
            <span>03</span> ABOUT
          </a>
          <Link
            to="/projects"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>04</span> WEB PROJECTS
          </Link>
          <Link
            to="/social-projects"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>05</span> SOCIAL PROJECTS
          </Link>
          <Link
            to="/app-projects"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>06</span> APP PROJECTS
          </Link>
        </div>

        <div className="mobile-nav-footer">
          <Link
            to="/contact"
            className="mobile-cta-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start a Project <span>→</span>
          </Link>
          <p className="mobile-contact-email">
            oneroofventures1@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}
